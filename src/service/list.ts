import axios from 'axios';
import { ACCESS_TOKEN_AUTH, ACCOUNT_ID, BASE_URL } from '@/constants';

const AUTHENTICATION_BASE_URL = `${BASE_URL}/authentication`;
const LIST_BASE_URL = `${BASE_URL}/list`;

const commonHeaders = {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
};

const createRequestToken = async () => {
    try {
        const response = await axios.get(`${AUTHENTICATION_BASE_URL}/token/new`, {
            headers: commonHeaders,
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const createSession = async () => {
    try {
        const requestToken = await createRequestToken();

        if (requestToken.success) {
            window.open(`https://www.themoviedb.org/authenticate/${requestToken.request_token}/allow`, '_blank');
        } else {
            console.error('Failed to obtain request token.');
        }

        const sessionOptions = {
            headers: {
                ...commonHeaders,
                'content-type': 'application/json',
            },
        };

        const response = await axios.post(
            `${AUTHENTICATION_BASE_URL}/session/new`,
            { request_token: requestToken.request_token },
            sessionOptions,
        );

        console.log(response.data);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getAllList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/account/${ACCOUNT_ID}/lists`);
        return response.data.results;
    } catch (err) {
        throw err;
    }
};

export const createList = async ({ session_id, params_list }: { session_id: string; params_list: CreateListProps }) => {
    try {
        const listOptions = {
            headers: {
                ...commonHeaders,
                'content-type': 'application/json',
            },
        };
        const response = await axios.post(`${LIST_BASE_URL}?session_id=${session_id}`, params_list, listOptions);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const getListDetail = async ({ list_id }: { list_id: number }) => {
    try {
        const response = await axios.get(`${BASE_URL}/list/${list_id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const clearList = async ({ list_id, session_id }: { list_id: number; session_id: number }) => {
    try {
        const response = await axios.post(`${LIST_BASE_URL}/${list_id}/clear?session_id=${session_id}&confirm=true`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const deleteList = async ({ list_id, session_id }: { list_id: number; session_id: number }) => {
    try {
        const response = await axios.delete(`${LIST_BASE_URL}/${list_id}?session_id=${session_id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const addMovie = async ({ list_id, session_id }: { list_id: number; session_id: number }) => {
    try {
        const response = await axios.post(`${LIST_BASE_URL}/${list_id}?session=${session_id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

// export const removeItemInList = async ({ list_id }: { list_id: number }) => {
//     try {
//         const response = await axios.post(`${LIST_BASE_URL}/${list_id}/remove_item`);
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// };

interface CreateListProps {
    name: string;
    description: string;
}
