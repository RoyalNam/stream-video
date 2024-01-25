import { BASE_URL } from '@/constants';
import axios from 'axios';
import { axiosInstance } from './instance';

const TRENDING_BASE_URL = `${BASE_URL}/trending`;

export const getTrending = async (is_week = false) => {
    try {
        const response = await axiosInstance.get(`${TRENDING_BASE_URL}/all/${is_week ? 'week' : 'day'}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

export const getMovieTrending = async (is_week = false) => {
    try {
        const response = await axiosInstance.get(`${TRENDING_BASE_URL}/movie/${is_week ? 'week' : 'day'}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

export const getTVTrending = async (is_week = false) => {
    try {
        const response = await axiosInstance.get(`${TRENDING_BASE_URL}/tv/${is_week ? 'week' : 'day'}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

export const getPeopleTrending = async (is_week = false) => {
    try {
        const response = await axiosInstance.get(`${TRENDING_BASE_URL}/person/${is_week ? 'week' : 'day'}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};
