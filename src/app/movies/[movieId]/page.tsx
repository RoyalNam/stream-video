'use client';
import Button from '@/components/Button';
import VideoCart from '@/components/VideoCart';
import { getMovieDetail, getMovieSimilar, getMovieVideos } from '@/service/movie';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const SingleMovie = () => {
    const { movieId } = useParams();
    const [movieDetail, setMovieDetail] = useState<MovieDetailProps>();
    const [movieVideo, setMovieVideo] = useState<VideoProps>();
    const [moviesSimilar, setMovieSimilar] = useState<MovieBaseProps[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const movie = await getMovieDetail({ video_id: Number(movieId) });
            const similar = await getMovieSimilar({ video_id: Number(movieId) });
            const url = await getMovieVideos({ video_id: Number(movieId) });
            setMovieVideo(url.results[0]);
            setMovieDetail(movie);
            setMovieSimilar(similar.results);
        };
        fetchData();
    }, []);

    return (
        <div className="">
            <div className="w-full flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-black" />
                <div className="w-full h-[70vh] z-10">
                    <iframe
                        title="Video"
                        src={movieVideo && `https://www.youtube.com/embed/${movieVideo.key}`}
                        frameBorder="0"
                        allowFullScreen
                        className="w-full h-full"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-6 border-b-primary border-b-4 py-6">
                <h4 className="text-4xl capitalize font-semibold">{movieDetail?.title}</h4>
                <p className="text-lg line-clamp-4">{movieDetail?.overview}</p>
                <div className="flex gap-4 flex-col">
                    <div>
                        <span>Genres: </span>
                        <span className="text-primary">
                            {movieDetail?.genres.map((genre) => genre.name).join(', ')}
                        </span>
                    </div>
                    <p>Date: {movieDetail && new Date(movieDetail?.release_date).toDateString().toString()}</p>
                    <div className="flex gap-2">
                        <span>Rate:</span>
                        <div className="flex items-center text-yellow-500 ">
                            <span>{movieDetail?.vote_average}</span>
                            <span>
                                <FaStar />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <span className="text-3xl capitalize font-medium border-primary py-1 border-b-2">More like this</span>
                <div className="grid grid-cols-2 mb-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-6 gap-6">
                    {moviesSimilar.map((item) => (
                        <VideoCart key={item.id} item={item} />
                    ))}
                </div>
                <Button title="Load More" onClick={() => {}} />
            </div>
        </div>
    );
};

export default SingleMovie;
