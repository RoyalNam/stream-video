'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaPlay, FaPlus, FaRegHeart, FaShareAlt, FaStar } from 'react-icons/fa';

import { IMAGE_URL_ORIGIN } from '@/constants';

const VideoCart = ({ item }: { item: MovieBaseProps }) => {
    const router = useRouter();

    return (
        item.poster_path && (
            <div className="w-full">
                <div className="relative pb-[140%] w-full hover-trigger">
                    <img
                        src={IMAGE_URL_ORIGIN + item.poster_path}
                        alt="img"
                        className="h-full w-full opacity-65 absolute top-0 bottom-0 object-cover"
                    />
                    <div className="absolute top-4 right-0 z-20">
                        <div className="pb-3 pr-5 flex gap-6">
                            <button title="Like">
                                <FaRegHeart />
                            </button>
                            <button title="Share">
                                <FaShareAlt />
                            </button>
                            <button title="Add to list">
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                    <div className="p-4 absolute inset-x-0 text-white bottom-0 left-0 bg-gradient-to-t from-secondary to-secondary/10">
                        <h4 className="text-lg text-white font-semibold line-clamp-1">{item.title}</h4>
                        <div className="text-sm mt-2 flex font-semibold">
                            <div className="relative flex items-center text-yellow-500 gap-1">
                                <FaStar />
                                <span className="mr-4 dot">{item.vote_average.toFixed(1)}</span>
                            </div>
                            <span className="text-primary ml-3 line-clamp-1">
                                {new Date(item.release_date).getFullYear().toString()}
                            </span>
                        </div>
                    </div>
                    <div className="absolute top-0 hover:bg-black/55 bottom-0 right-0 left-0  hidden hover-target">
                        <div className="flex items-center justify-center w-full h-full">
                            <button
                                onClick={() => router.push(`/movies/${item.id}`)}
                                title="Play"
                                className="bg-primary p-4 text-xl rounded-full"
                            >
                                <FaPlay />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default VideoCart;
