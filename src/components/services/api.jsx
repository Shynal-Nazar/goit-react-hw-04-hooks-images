function fatchImage(searchName, pages) {
  const KEY = '25196211-b80e38914b4905c09ace9b244';
  return fetch(
    `https://pixabay.com/api/?q=${searchName}&page=${pages}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`no images on request`));
  });
}

const Api = { fatchImage };

export default Api;
