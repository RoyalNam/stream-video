'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { useGenresOrCertificationData } from '@/context/store';
import { getMoviesDiscover } from '@/service/movie';
import ErrorDisplay from '@/components/ErrorDisplay';
import MoviesGrid from '@/components/MoviesGrid';

const MovieGenrePage = () => {
    const router = useRouter();
    const { genre } = useParams();
    const GENRES = useGenresOrCertificationData<GenresProps>();
    const [moviesData, setMoviesData] = useState<MovieBaseProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            if (!GENRES || GENRES.length === 0) {
                const genresData = await useGenresOrCertificationData<GenresProps>();
                if (genresData) {
                    setMoviesData(await fetchData());
                }
            } else {
                setMoviesData(await fetchData());
            }
        };

        fetchInitialData();
    }, [genre, GENRES]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    useEffect(() => {
        // Empty useEffect
    }, []);

    const handleGenreButtonClick = (genreName: string) => {
        router.push(`/movies/genres/${encodeURIComponent(genreName)}`);
    };

    const fetchData = async ({ page_number = 1 }: { page_number?: number } = {}) => {
        try {
            if (GENRES && genre) {
                const decodedGenre = decodeURIComponent(genre as string);
                const id = GENRES.find((item) => item.name === decodedGenre)?.id;

                if (!id) {
                    setError('An error occurred while fetching data. Please try again later.');
                    return [];
                } else {
                    setError(null);
                }

                return await getMoviesDiscover({ with_genres: id.toString(), page: page_number });
            }

            return [];
        } catch (error) {
            setError('An error occurred while fetching data. Please try again later.');
            console.log(error);

            return [];
        }
    };

    const loadMoreMovies = async () => {
        if (!GENRES) {
            return;
        }
        setLoading(true);
        const newPage = currentPage + 1;
        const newMovies = await fetchData({ page_number: newPage });
        setMoviesData((prev) => [...prev, ...newMovies]);
        setCurrentPage(newPage);
        setLoading(false);
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;

        if (scrollHeight - scrollTop <= clientHeight + 150 && !loading) {
            loadMoreMovies();
        }
    };

    // Render
    const renderGenreButtons = (
        <div className="flex flex-wrap gap-4 justify-center mt-5">
            {GENRES?.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleGenreButtonClick(item.name)}
                    className={`px-2 py-1 bg-secondary rounded hover:text-primary ${
                        decodeURIComponent(genre as string) === item.name ? 'text-primary' : 'text-current'
                    }`}
                >
                    {item.name}
                </button>
            ))}
        </div>
    );

    //
    return error ? (
        <ErrorDisplay error={error} />
    ) : (
        <section>
            {renderGenreButtons}
            <MoviesGrid movies={moviesData} />
        </section>
    );
};

export default MovieGenrePage;
