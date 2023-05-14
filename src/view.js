/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';
import _ from 'lodash';
import * as render from './renders.js';
import parse from './parser.js';

const makeProxyUrl = (url) => {
  const proxyUrl = new URL('/get', 'https://allorigins.hexlet.app');
  proxyUrl.searchParams.set('disableCache', 'true');
  proxyUrl.searchParams.set('url', url);
  return proxyUrl.toString();
};

const updatePosts = (watchedState, urls) => {
  const proxyUrls = urls.map((url) => makeProxyUrl(url));
  const promises = proxyUrls.map((url) => axios(url)
    .then((response) => {
      const { feed, posts } = parse(response.data.contents);
      const watchedPostsTitles = watchedState.posts.map((post) => post.title);
      const newPosts = posts.filter((post) => !watchedPostsTitles.includes(post.title));
      if (newPosts.length) {
        newPosts.forEach((post) => {
          post.feedId = feed.id;
          post.id = _.uniqueId(feed.id);
        });
        watchedState.posts.push(...newPosts.reverse());
      }
    }));
  Promise.all(promises).then(() => setTimeout(() => {
    updatePosts(watchedState, urls);
  }, 5000));
};

export default (state, elements, langSet) => {
  const { form, postsContainer } = elements;
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'formInput.isValid':
        render.renderForm(state, elements, langSet);
        break;
      case 'feeds':
        render.renderFeeds(state, elements, langSet);
        break;
      case 'posts':
        render.renderPosts(state, elements, langSet);
        break;
      case 'uiState.viewedPosts':
        render.renderPosts(state, elements, langSet);
        break;
      default:
        throw new Error('Oops! Check watched state');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlInput = new FormData(e.target).get('url');
    const proxyUrl = makeProxyUrl(urlInput);
    const schema = yup.string().required().url().notOneOf(state.urls);
    schema.validate(urlInput)
      .then(() => axios(proxyUrl))
      .then((response) => {
        const { feed, posts } = parse(response.data.contents);
        feed.id = _.uniqueId();
        posts.forEach((post) => {
          post.feedId = feed.id;
          post.id = _.uniqueId(feed.id);
        });
        watchedState.feeds.push(feed);
        watchedState.posts.push(...posts.reverse());
      })
      .then(() => {
        state.formInput.isValid = false;
        watchedState.formInput.isValid = true;
        state.formInput.error = null;
        state.urls.push(urlInput);
      })
      .catch((err) => {
        if (err.name === 'AxiosError') {
          state.formInput.error = 'form.errors.network';
        }
        if (err.name === 'ValidationError') {
          state.formInput.error = `form.errors.${err.type}`;
        }
        if (err.name === 'parsingError') {
          state.formInput.error = `form.errors.${err.name}`;
        }
        state.formInput.isValid = true;
        watchedState.formInput.isValid = false;
      });
  });

  postsContainer.addEventListener('click', (e) => {
    const post = state.posts.find(({ id }) => id === e.target.dataset.id);
    watchedState.uiState.viewedPosts.push(post);
    if (e.target.nodeName === 'BUTTON') {
      render.renderModal(elements, post);
    }
  });

  updatePosts(watchedState, state.urls);
};
