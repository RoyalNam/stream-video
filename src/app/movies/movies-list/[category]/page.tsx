'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getMoviesByCategory } from '@/service/movie';
import { getMovieTrending } from '@/service/trending';
import ErrorDisplay from '@/components/ErrorDisplay';
import MoviesGrid from '@/components/MoviesGrid';
import { MovieCategory } from '@/types/options';

const Category = () => {
    const { category } = useParams();

    const [moviesData, setMoviesData] = useState<MovieBaseProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    // Action
    const fetchData = async () => {
        try {
            if (category == 'trending') setMoviesData(await getMovieTrending());
            else setMoviesData(await getMoviesByCategory({ type: category as MovieCategory }));
        } catch (error) {
            setError('This page could not be found.');
        }
    };

    const loadMoreMovies = async () => {
        setLoading(true);
        const newPage = currentPage + 1;
        try {
            let newMovies: MovieBaseProps[] = [];
            if (category === 'trending') newMovies = await getMovieTrending();
            else newMovies = await getMoviesByCategory({ type: category as MovieCategory, page_number: newPage });
            setMoviesData((prev) => [...prev, ...newMovies]);
            setCurrentPage(newPage);
        } catch (error) {
            console.error('Error loading more movies:', error);
            setError('Error loading more movies.');
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const clientHeight = window.innerHeight;
        if (scrollHeight - scrollTop <= clientHeight + 150 && !loading) loadMoreMovies();
    };

    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    //
    return error ? (
        <ErrorDisplay error={error} />
    ) : (
        <section>
            <div className="text-center py-4 border-primary/50 border-b">
                <h4 className="text-4xl font-bold text-white">
                    {capitalizeFirstLetter(category.toString().split('_').join(' '))}
                </h4>
            </div>
            <MoviesGrid movies={moviesData} />
        </section>
    );
};

export default Category;
