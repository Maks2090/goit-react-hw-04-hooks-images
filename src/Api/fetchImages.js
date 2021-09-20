import axios from "axios";


const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '22631674-5d368c2f6a01c7affe232da9d';

function fetchImages(value, page) {

    const url = `${BASE_URL}/?key=${API_KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`

    return axios.get(url).then((images) => {
        return images
    })



}

export default fetchImages