/* eslint-disable no-param-reassign */
import * as yup from 'yup';
import onChange from 'on-change';
import { renderErrors, renderForm } from './renders.js';

export default (state, elements, langSet) => {
  const { form } = elements;
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'formInput.isValid':
        state.formInput.error = null;
        renderErrors(state, elements, langSet);
        break;
      case 'formInput.error':
        renderErrors(state, elements, langSet);
        break;
      default:
        throw new Error('Oops! Check watched state');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const urlInput = new FormData(e.target).get('url');
    const schema = yup.string().url().notOneOf(state.watchedRss);
    schema.validate(urlInput)
      .then(() => {
        watchedState.formInput.isValid = true;
        state.watchedRss.push(urlInput);
        renderForm(state, elements);
      })
      .catch((err) => {
        watchedState.formInput.isValid = false;
        watchedState.formInput.error = `form.errors.${err.type}`;
      });
  });
};
