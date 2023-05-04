import i18next from 'i18next';
import resources from './locales/en.js';
import view from './view.js';
import setLanguage from './langSetter.js';

export default () => {
  const state = {
    formInput: {
      isValid: null,
    },
    watchedRss: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('input.form-control'),
  };

  const langSet = i18next.createInstance();
  langSet.init({
    lng: 'en',
    debug: true,
    resources,
  }).then(() => setLanguage(langSet));

  view(state, elements);
};
