/* eslint-disable no-param-reassign */
import resources from './locales/en.js';

const renderText = (langSet, elements, typeOfContainer = 'form') => {
  const availableTranslations = Object.keys(resources.en.translation[typeOfContainer]);
  availableTranslations.forEach((el) => {
    elements[el].textContent = langSet.t(`${typeOfContainer}.${el}`);
  });
};

const renderForm = (state, elements) => {
  const { form, input } = elements;
  if (state.formInput.isValid) {
    input.classList.remove('is-invalid');
    form.reset();
    form.focus();
  } else {
    input.classList.add('is-invalid');
  }
};

const renderErrors = (state, elements, langSet) => {
  const { feedback } = elements;
  if (state.formInput.error) {
    feedback.textContent = langSet.t(state.formInput.error);
    feedback.classList.add('text-danger');
  } else {
    feedback.textContent = 'RSS loaded';
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  }
};

export { renderText, renderForm, renderErrors };
