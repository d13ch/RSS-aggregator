/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';
import _ from 'lodash';
import { renderFeeds, renderForm, renderPosts } from './renders.js';
import parse from './parser.js';

export default (state, elements, langSet) => {
  const { form } = elements;
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'formInput.isValid':
        renderForm(state, elements, langSet);
        break;
      case 'feeds':
        renderFeeds(state, elements, langSet);
        break;
      case 'posts':
        renderPosts(state, elements, langSet);
        break;
      default:
        throw new Error('Oops! Check watched state');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlInput = new FormData(e.target).get('url');
    const schema = yup.string().url().notOneOf(state.urls);
    schema.validate(urlInput)
      .then(() => axios(`https://allorigins.hexlet.app/get?disableCache=true&url=${urlInput}`))
      .then((response) => {
        const { feed, posts } = parse(response.data.contents);
        feed.id = _.uniqueId();
        posts.forEach((post) => {
          post.postId = feed.id;
          post.id = _.uniqueId(feed.id);
        });
        watchedState.feeds.push(feed);
        watchedState.posts.push(...posts);
      })
      .then(() => {
        state.formInput.isValid = false;
        watchedState.formInput.isValid = true;
        state.formInput.error = null;
        state.urls.push(urlInput);
      })
      .catch((err) => {
        state.formInput.error = `form.errors.${err.type}`;
        state.formInput.isValid = true;
        watchedState.formInput.isValid = false;
      });
  });
};
