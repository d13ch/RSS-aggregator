export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const errorNode = doc.querySelector('parsererror');
  if (errorNode) {
    const error = new Error('Resourse doesn\'t contain valid RSS');
    error.name = 'parsingError';
    throw error;
  }
  const feed = {
    title: doc.querySelector('channel > title').textContent,
    description: doc.querySelector('channel > description').textContent,
  };
  const posts = [];
  doc.querySelectorAll('item').forEach((post) => {
    posts.push({
      title: post.querySelector('title').textContent,
      description: post.querySelector('description').textContent,
      link: post.querySelector('link').textContent,
    });
  });

  return { feed, posts };
};
