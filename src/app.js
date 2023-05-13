import i18next from 'i18next';
import resources from './locales/index.js';
import view from './view.js';
import { renderText } from './renders.js';

export default () => {
  const state = {
    formInput: {
      isValid: null,
      error: null,
    },
    uiState: {
      viewedPosts: [],
    },
    urls: [],
    feeds: [],
    posts: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input.form-control'),
    header: document.querySelector('h1.main-header'),
    label: document.querySelector('label[for="url-input"]'),
    addBtn: document.querySelector('button[aria-label="add"]'),
    example: document.querySelector('p.example'),
    feedback: document.querySelector('p.feedback'),
    postsContainer: document.querySelector('div.posts'),
    feedsContainer: document.querySelector('div.feeds'),
    modalTitle: document.querySelector('h5.modal-title'),
    modalBody: document.querySelector('div.modal-body'),
    readBtn: document.querySelector('div.modal-footer > a'),
    closeBtn: document.querySelector('div.modal-footer > button'),
  };

  const langSet = i18next.createInstance();
  langSet.init({
    lng: 'ru',
    debug: true,
    resources,
  }).then(() => renderText(langSet, elements));

  view(state, elements, langSet);
};
