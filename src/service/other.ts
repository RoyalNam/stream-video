import { BASE_URL } from '@/constants';
import { axiosInstance } from './instance';

export const getGenres = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/genre/movie/list`);
        return response.data.genres;
    } catch (err) {
        throw err;
    }
};

export const getCertification = async () => {
    try {
        const resp = await axiosInstance.get(`${BASE_URL}/certification/movie/list`);
        return resp.data.certifications;
    } catch (err) {
        throw err;
    }
};
