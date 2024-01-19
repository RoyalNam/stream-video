import { ACCESS_TOKEN_AUTH, BASE_URL } from '@/constants';
import axios from 'axios';

const VIDEO_BASE_URL = `${BASE_URL}/movie`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
    },
};

export const getMovieDetail = async ({ video_id }: { video_id: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieCredits = async ({ video_id }: { video_id: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}/credits`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieKeywords = async ({ video_id }: { video_id: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}/keywords`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getMovieReviews = async ({ video_id, page_number = 1 }: { video_id: number; page_number: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}/reviews?page=${page_number}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieSimilar = async ({ video_id, page_number = 1 }: { video_id: number; page_number?: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}/similar?page=${page_number}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getMovieTranslations = async ({ video_id }: { video_id: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}/translations`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieVideos = async ({ video_id }: { video_id: number }) => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/${video_id}/videos`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieNowPlaying = async () => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/now_playing`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMoviePopular = async () => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/popular`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieTopRated = async () => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/top_rated`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getMovieUpcoming = async () => {
    try {
        const response = await axios.get(`${VIDEO_BASE_URL}/upcoming`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};

// Add, delete rating
