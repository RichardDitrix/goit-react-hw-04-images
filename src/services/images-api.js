const API_KEY = '41880444-bb08a0e0a6474d92b688febd8';

export const fetchImages = async (search, page) => {
  const results = await fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return await results.json();
};
