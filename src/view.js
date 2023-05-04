import * as yup from 'yup';
import onChange from 'on-change';

export default (state, elements) => {
  const { form, input } = elements;
  const watchedState = onChange(state, (path, value) => {
    if (value) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
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
        form.reset();
        form.focus();
      })
      .catch(() => {
        watchedState.formInput.isValid = false;
      });
  });
};
