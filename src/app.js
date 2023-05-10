import i18next from 'i18next';
import resources from './locales/en.js';
import view from './view.js';
import { renderText } from './renders.js';

export default () => {
  const state = {
    formInput: {
      isValid: null,
      error: null,
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
    posts: document.querySelector('div.posts'),
    feeds: document.querySelector('div.feeds'),
  };

  const langSet = i18next.createInstance();
  langSet.init({
    lng: 'en',
    debug: true,
    resources,
  }).then(() => renderText(langSet, elements));

  view(state, elements, langSet);
};
