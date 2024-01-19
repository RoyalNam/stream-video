import { ACCESS_TOKEN_AUTH, BASE_URL } from '@/constants';
import axios from 'axios';

const TRENDING_BASE_URL = `${BASE_URL}/trending`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
    },
};

export const getTrending = async (is_week = false) => {
    try {
        const response = await axios.get(`${TRENDING_BASE_URL}/all/${is_week ? 'week' : 'day'}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getMovieTrending = async (is_week = false) => {
    try {
        const response = await axios.get(`${TRENDING_BASE_URL}/movie/${is_week ? 'week' : 'day'}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
export const getTVTrending = async (is_week = false) => {
    try {
        const response = await axios.get(`${TRENDING_BASE_URL}/tv/${is_week ? 'week' : 'day'}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getPeopleTrending = async (is_week = false) => {
    try {
        const response = await axios.get(`${TRENDING_BASE_URL}/person/${is_week ? 'week' : 'day'}`, options);
        return response.data;
    } catch (err) {
        throw err;
    }
};
