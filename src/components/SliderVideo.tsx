'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaPlay, FaStar } from 'react-icons/fa';

import Button from './Button';
import { IMAGE_URL_ORIGIN } from '@/constants';
import { useGenresOrCertificationData } from '@/context/store';

const SliderVideo = ({ item, handleWatchTrailer }: { item: MovieBaseProps; handleWatchTrailer: () => void }) => {
    const GENRES = useGenresOrCertificationData<GenresProps>();
    const router = useRouter();

    const renderMovieInfo = (
        <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-xl text-white font-semibold uppercase border-l-2 border-primary/50 pl-2">
                {item.media_type}
            </h3>
            <h4 className="text-5xl text-white font-semibold uppercase">{item.title}</h4>
            <p className="line-clamp-4">{item.overview}</p>
            <div className="">
                <span className="text-primary">Genres</span>
                <span className="mx-1">:</span>
                <span>
                    {GENRES &&
                        item.genre_ids
                            .map((id) => {
                                const genre = GENRES.find((genre) => genre.id === id);
                                return genre ? genre.name : '';
                            })
                            .join(', ')}
                </span>
            </div>
            <div className="flex items-center">
                <div className="relative flex items-center gap-1">
                    <span>{item.vote_average.toFixed(1)}</span>
                    <span className="dot mr-4">
                        <FaStar className="text-lg text-yellow-300" />
                    </span>
                </div>
                <img src="/IMDb.png" alt="" className="ml-3" />

                <div className="relative">
                    <span className="dot mr-4" />
                </div>
                <span className="ml-3">{new Date(item.release_date).getFullYear().toString()}</span>
            </div>

            <div className="mt-5">
                <Button
                    onClick={() => router.push(`${item.media_type == 'movie' ? '/movies' : '/tv-shows'}/${item.id}`)}
                    title="Play Now"
                    icon={<FaPlay />}
                />
            </div>
        </div>
    );

    const renderMovieTrailer = (
        <div className="relative flex-1 flex items-center overflow-hidden group">
            <img
                src={IMAGE_URL_ORIGIN + item.backdrop_path}
                alt=""
                className="transform-origin-center transition-transform group-hover:scale-105"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center gap-3">
                    <button onClick={() => handleWatchTrailer()} className="border p-7 rounded-full" title="play">
                        <FaPlay className="text-3xl hover:scale-125" />
                    </button>
                    <span className="text-xl">Watch trailer</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full relative">
            <div className="h-auto min-h-[540px] flex items-center relative">
                <div className={`absolute inset-0 -z-10 opacity-35`}>
                    <img src={IMAGE_URL_ORIGIN + item.backdrop_path} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="h-full py-8 flex items-start lg:items-center">
                    <div className="flex flex-col-reverse lg:flex-row gap-4 px-5">
                        {renderMovieInfo}
                        {renderMovieTrailer}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderVideo;
