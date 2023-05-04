export default (langSet) => {
  const header = document.querySelector('h1.main-header');
  header.textContent = langSet.t('body.header');

  const label = document.querySelector('label[for="url-input"]');
  label.textContent = langSet.t('body.inputLabel');

  const addBtn = document.querySelector('button[aria-label="add"]');
  addBtn.textContent = langSet.t('body.addBtn');

  const example = document.querySelector('p.example');
  example.textContent = langSet.t('body.example');
};
