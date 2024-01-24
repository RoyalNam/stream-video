import axios, { AxiosInstance } from 'axios';
import { ACCESS_TOKEN_AUTH, BASE_URL } from '@/constants';
import { DiscoverOptions, MovieCategory, MovieEndpoint } from '@/types/options';

const VIDEO_BASE_URL = `${BASE_URL}/movie`;
const axiosInstance: AxiosInstance = axios.create({
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
    },
});

export const getMovieDetail = async ({ movie_id }: { movie_id: number }) => {
    try {
        const response = await axiosInstance.get(`${VIDEO_BASE_URL}/${movie_id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getMovieWithEndpoint = async ({
    movie_id,
    endpoint,
    page_number = 1,
}: {
    movie_id: number;
    endpoint: MovieEndpoint;
    page_number?: number;
}) => {
    try {
        const response = await axiosInstance.get(`${VIDEO_BASE_URL}/${movie_id}/${endpoint}?page=${page_number}`);

        switch (endpoint) {
            case 'reviews':
            case 'similar':
                return response.data.results;
            case 'credits':
            case 'keywords':
            case 'translations':
            case 'videos':
                return response.data;
            default:
                throw new Error('invalid endpoint');
        }
    } catch (err) {
        throw err;
    }
};

export const getMoviesByCategory = async ({ type, page_number = 1 }: { type: MovieCategory; page_number?: number }) => {
    try {
        const response = await axiosInstance.get(`${VIDEO_BASE_URL}/${type}?page=${page_number}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

const defaultOptions: DiscoverOptions = {
    include_adult: false,
    language: 'en-US',
    page: 1,
};

export const getMoviesDiscover = async ({ discoverOptions }: { discoverOptions: DiscoverOptions }) => {
    try {
        const mergedOptions = { ...defaultOptions, ...discoverOptions };

        const apiUrl = `${BASE_URL}/discover/movie`;
        const response = await axiosInstance.get(apiUrl, { params: mergedOptions });
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

export const searchMovies = async ({ query, num_page = 1 }: { query: string; num_page?: number }) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/search/movie?query=${query}&page=${num_page}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

// Add, delete rating
