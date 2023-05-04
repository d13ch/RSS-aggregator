import view from './view.js';

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

  view(state, elements);
};
