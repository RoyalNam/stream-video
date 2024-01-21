import React from 'react';
import VideoCart from './VideoCart';

const MoviesGrid = ({ movies }: { movies: MovieBaseProps[] }) => {
    return (
        <div className="grid grid-cols-2 mb-6 -mx-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-6 gap-6">
            {movies.map((movie) => (
                <div key={movie.id} className="px-2">
                    <VideoCart item={movie} />
                </div>
            ))}
        </div>
    );
};

export default MoviesGrid;
