import { BASE_URL } from '@/constants';
import { axiosInstance } from './instance';

const PERSON_BASE_URL = `${BASE_URL}/person`;

export const getPersonPopular = async ({ page_number = 1 }: { page_number?: number }) => {
    try {
        const response = await axiosInstance.get(`${PERSON_BASE_URL}/popular?page=${page_number}`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

export const getPersonDetail = async ({ person_id }: { person_id: number }) => {
    try {
        const response = await axiosInstance.get(`${PERSON_BASE_URL}/${person_id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getPersonMovieCredits = async ({ person_id }: { person_id: number }) => {
    try {
        const response = await axiosInstance.get(`${PERSON_BASE_URL}/${person_id}/movie_credits`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getExternalIDs = async ({ person_id }: { person_id: number }) => {
    try {
        const response = await axiosInstance.get(`${PERSON_BASE_URL}/${person_id}/external_ids`);
        return response.data;
    } catch (err) {
        throw err;
    }
};
