'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import VideoCart from '@/components/VideoCart';
import SliderVideo from '@/components/SliderVideo';
import VideoBlock from '@/components/VideoBlock';
import { getMovieTrending } from '@/service/trending';
import { getMovieNowPlaying, getMoviePopular, getMovieTopRated, getMovieUpcoming } from '@/service/movie';

export default function Home() {
    const [trendingData, setTrendingData] = useState<MovieBaseProps[]>([]);
    const [nowPlayingData, setNowPlaying] = useState<MovieBaseProps[]>([]);
    const [popularData, setPopular] = useState<MovieBaseProps[]>([]);
    const [topRatedData, setTopRated] = useState<MovieBaseProps[]>([]);
    const [upComingData, setUpcoming] = useState<MovieBaseProps[]>([]);

    const sliderSettings = {
        infinite: true,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const blockSettings = {
        infinite: false,
        speed: 500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
        slidesToShow: 5,
    };
    const fetchData = async (apiFunction: () => Promise<any>) => {
        try {
            const response = await apiFunction();
            return response.results;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            setTrendingData(await fetchData(getMovieTrending));
            setNowPlaying(await fetchData(getMovieNowPlaying));
            setPopular(await fetchData(getMoviePopular));
            setTopRated(await fetchData(getMovieTopRated));
            setUpcoming(await fetchData(getMovieUpcoming));
        };
        fetchAllData();
    }, []);
    console.log(trendingData);

    const renderVideoBlock = (title: string, data: MovieBaseProps[]) => (
        <VideoBlock tit={title}>
            <Slider {...blockSettings}>
                {data.map((item) => (
                    <div key={item.id} className="px-2">
                        <VideoCart item={item} />
                    </div>
                ))}
            </Slider>
        </VideoBlock>
    );

    return (
        <div className="w-full">
            {/* Slider for Trending */}
            <div className="w-full">
                <Slider {...sliderSettings}>
                    {trendingData.map((item) => (
                        <SliderVideo key={item.id} item={item} />
                    ))}
                </Slider>
            </div>

            {/* Video Blocks */}
            <div className="flex flex-col gap-6">
                {renderVideoBlock('Now Playing', nowPlayingData)}
                {renderVideoBlock('Popular', popularData)}
                {renderVideoBlock('Top rated', topRatedData)}
                {renderVideoBlock('Upcoming', upComingData)}
            </div>
        </div>
    );
}

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, right: -4, zIndex: 10 }} onClick={onClick} />;
}
function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, left: -4, zIndex: 10 }} onClick={onClick} />;
}
