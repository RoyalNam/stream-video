'use client';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import VideoCart from '@/components/VideoCart';
import SliderVideo from '@/components/SliderVideo';
import { getMovieTrending } from '@/service/trending';
import { getMovieWithEndpoint, getMoviesByCategory } from '@/service/movie';
import Button from '@/components/Button';

export default function Home() {
    const router = useRouter();

    const [trendingData, setTrendingData] = useState<MovieBaseProps[]>([]);
    const [nowPlayingData, setNowPlaying] = useState<MovieBaseProps[]>([]);
    const [popularData, setPopular] = useState<MovieBaseProps[]>([]);
    const [topRatedData, setTopRated] = useState<MovieBaseProps[]>([]);
    const [upComingData, setUpcoming] = useState<MovieBaseProps[]>([]);
    const [movie, setMovie] = useState<VideoProps>();
    const [isShow, setShow] = useState(false);

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
        slidesToScroll: 3,
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
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        slidesToShow: 5,
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setTrendingData(await getMovieTrending());
        setNowPlaying(await getMoviesByCategory({ type: 'now_playing' }));
        setPopular(await getMoviesByCategory({ type: 'popular' }));
        setTopRated(await getMoviesByCategory({ type: 'top_rated' }));
        setUpcoming(await getMoviesByCategory({ type: 'upcoming' }));
    };

    const handleGetTrailer = async (id: number = 558915) => {
        setShow(true);
        const videos = await getMovieWithEndpoint({ endpoint: 'videos', movie_id: Number(id) });
        setMovie(videos.results[0]);
    };

    const renderVideoBlock = (title: string, data: MovieBaseProps[]) => {
        const newTit = title.toLowerCase().split(' ').join('_');
        return (
            <div className="max-w-full">
                <div className="flex justify-between items-center my-3">
                    <h4 className="text-2xl font-semibold text-white capitalize">{title}</h4>
                    <Button title="Load more" onClick={() => router.push(`/movies/movies-list/${newTit}`)} />
                </div>
                <div className="-mx-2">
                    {
                        <Slider {...blockSettings}>
                            {data.map((item) => (
                                <div key={item.id} className="px-2">
                                    <VideoCart item={item} />
                                </div>
                            ))}
                        </Slider>
                    }
                </div>
            </div>
        );
    };
    const renderTrailer = () => {
        return (
            <div
                onClick={() => {
                    setShow(false);
                    setMovie(undefined);
                }}
                className="fixed inset-0 bg-black/70 z-50"
            >
                <div className="flex items-center justify-center w-full h-full">
                    <div className="w-full max-w-[900px] z-10 aspect-video">
                        <iframe
                            title="Video"
                            src={movie && `https://www.youtube.com/embed/${movie.key}`}
                            frameBorder="0"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <div className="w-full">
                <Slider {...sliderSettings}>
                    {trendingData.map((item) => (
                        <SliderVideo key={item.id} item={item} handleWatchTrailer={() => handleGetTrailer(item.id)} />
                    ))}
                </Slider>
            </div>

            <div className="flex flex-col gap-6 mt-8 pb-12">
                {renderVideoBlock('Trending', trendingData)}
                {renderVideoBlock('Now Playing', nowPlayingData)}
                {renderVideoBlock('Popular', popularData)}
                {renderVideoBlock('Top rated', topRatedData)}
                {renderVideoBlock('Upcoming', upComingData)}
            </div>
            {isShow && movie && renderTrailer()}
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
