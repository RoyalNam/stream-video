'use client';
import { getCertification, getGenres } from '@/service/other';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface LocalStorageData {
    genresData: GenresProps[];
    certificationData: CertificationProps[];
}

const LocalStorageDataContext = createContext<LocalStorageData | undefined>(undefined);

export const LocalStorageDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [localStorageData, setLocalStorageData] = useState<LocalStorageData>({
        genresData: [],
        certificationData: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLocalStorageData({
                    genresData: await getGenres(),
                    certificationData: await getCertification(),
                });
            } catch (error) {
                console.error('Error fetching data from localStorage:', error);
            }
        };

        fetchData();
    }, []);

    return <LocalStorageDataContext.Provider value={localStorageData}>{children}</LocalStorageDataContext.Provider>;
};

export const useLocalStorageData = (): LocalStorageData | undefined => {
    const localStorageData = useContext(LocalStorageDataContext);

    useEffect(() => {
        // console.log('localStorageData', localStorageData);
    }, [localStorageData]);

    return localStorageData;
};

export const useGenresOrCertificationData = <T extends GenresProps | CertificationProps>(
    getGenresData: boolean = true,
): T[] | undefined => {
    const localStorageData = useLocalStorageData();

    useEffect(() => {
        // console.log('localStorageData', localStorageData);
    }, [localStorageData]);

    return localStorageData
        ? getGenresData
            ? (localStorageData.genresData as T[])
            : (localStorageData.certificationData as T[])
        : undefined;
};
