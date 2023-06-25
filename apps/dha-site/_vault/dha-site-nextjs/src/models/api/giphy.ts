import axios from 'axios';

const BASE_URL = 'api.giphy.com/v1/gifs/search';
const api_key = '435c8880fa41fdbe5fba133c47f72ed3d';
const searchTerm = 'animal';

const api = axios.create({ baseURL: BASE_URL });

const getAnimalPics = api.get(searchTerm, {
  params: { api_key },
});

export default getAnimalPics;
