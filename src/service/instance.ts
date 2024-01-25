import axios, { AxiosInstance } from 'axios';
import { ACCESS_TOKEN_AUTH } from '@/constants';

export const axiosInstance: AxiosInstance = axios.create({
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`,
    },
});
