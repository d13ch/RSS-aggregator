/* eslint-disable no-param-reassign */
import resources from './locales/en.js';

const renderText = (langSet, elements) => {
  const containers = ['form', 'modal'];
  containers.forEach((container) => {
    const availableTranslations = Object.keys(resources.en.translation[container])
      .filter((key) => key !== 'errors');
    availableTranslations.forEach((el) => {
      elements[el].textContent = langSet.t(`${container}.${el}`);
    });
  });
};

const renderForm = (state, elements, langSet) => {
  const { form, input, feedback } = elements;
  if (state.formInput.isValid) {
    input.classList.remove('is-invalid');
    feedback.textContent = 'RSS loaded';
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
    form.reset();
    form.focus();
  } else {
    input.classList.add('is-invalid');
    feedback.textContent = langSet.t(state.formInput.error);
    feedback.classList.add('text-danger');
  }
};

const prepareContainer = (container, typeOfContainer, langSet) => {
  const cardBorder = document.createElement('div');
  cardBorder.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = langSet.t(typeOfContainer);
  cardBody.append(cardTitle);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');
  container.replaceChildren(cardBody, list);

  return list;
};

const renderFeeds = (state, elements, langSet) => {
  const { feedsContainer } = elements;
  const list = prepareContainer(feedsContainer, 'feeds', langSet);
  state.feeds.forEach((feed) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'border-0', 'border-end-0');

    const itemTitle = document.createElement('h3');
    itemTitle.classList.add('h6', 'm-0');
    itemTitle.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    listItem.append(itemTitle, description);
    list.prepend(listItem);
  });
};

const renderPosts = (state, elements, langSet) => {
  const { postsContainer } = elements;
  const list = prepareContainer(postsContainer, 'posts', langSet);
  state.posts.forEach((post) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const link = document.createElement('a');
    const button = document.createElement('button');
    listItem.append(link, button);
    const linkClasses = state.uiState.viewedPosts.includes(post)
      ? 'fw-normal link-secondary'
      : 'fw-bold';
    link.outerHTML = `<a href="${post.link}" class="${linkClasses}" data-id="${post.id}" target="_blank" rel="noopener noreferrer">${post.title}</a>`;
    button.outerHTML = `<button type="button" class="btn btn-outline-primary btn-sm" data-id="${post.id}" data-bs-toggle="modal" data-bs-target="#modal">${langSet.t('postBtn')}</button>`;

    list.prepend(listItem);
  });
};

const renderModal = (elements, post) => {
  const { modalTitle, modalBody, readBtn } = elements;
  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  readBtn.href = post.link;
};

export {
  renderText,
  renderForm,
  renderFeeds,
  renderPosts,
  renderModal,
};
