import { ACCESS_TOKEN_AUTH, BASE_URL } from '@/constants';
import axios from 'axios';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
    },
};

export const getGenres = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, options);
        return response.data.genres;
    } catch (err) {
        throw err;
    }
};

export const getCertification = async () => {
    try {
        const resp = await axios.get(`${BASE_URL}/certification/movie/list`, options);
        return resp.data.certifications;
    } catch (err) {
        throw err;
    }
};
