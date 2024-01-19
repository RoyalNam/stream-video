'use client';
import { getGenres } from '@/service/genres';
import React, { createContext, useContext, useEffect, useState } from 'react';

const GenresLocalStorageDataContext = createContext<GenresProps[]>([]);

export const LocalStorageDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [genresData, setGenresData] = useState<GenresProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieGenresResponse = await getGenres();

                const movieGenres = movieGenresResponse.genres ? movieGenresResponse.genres : [];
                setGenresData(movieGenres);
            } catch (error) {
                console.error('Error fetching data from localStorage:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <GenresLocalStorageDataContext.Provider value={genresData}>{children}</GenresLocalStorageDataContext.Provider>
    );
};

export const useGenresLocalStorageData = (): GenresProps[] | [] => {
    const genresData = useContext(GenresLocalStorageDataContext);

    useEffect(() => {
        // console.log('storeGenres', genresData);
    }, [genresData]);

    return genresData;
};
