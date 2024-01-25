'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import Button from '@/components/Button';
import ErrorDisplay from '@/components/ErrorDisplay';
import MoviesGrid from '@/components/MoviesGrid';
import { IMAGE_URL_ORIGIN } from '@/constants';
import { getMovieDetail, getMovieWithEndpoint } from '@/service/movie';

const SingleMovie = () => {
    const { movieId } = useParams();
    const router = useRouter();

    const [movieDetail, setMovieDetail] = useState<MovieDetailProps>();
    const [movieVideo, setMovieVideo] = useState<VideoProps>();
    const [moviesSimilar, setMovieSimilar] = useState<MovieBaseProps[]>([]);
    const [reviews, setReviews] = useState<MovieReviewProps[]>([]);
    const [cast, setCast] = useState<CastProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('info');
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        fetchData();
    }, [movieId]);

    const fetchData = async () => {
        try {
            const videos = await getMovieWithEndpoint({ endpoint: 'videos', movie_id: Number(movieId) });
            const credits = await getMovieWithEndpoint({ endpoint: 'credits', movie_id: Number(movieId) });
            const castMovie: CastProps[] = credits.cast;

            setMovieVideo(videos.results[0]);
            setReviews(await getMovieWithEndpoint({ endpoint: 'reviews', movie_id: Number(movieId) }));
            setMovieDetail(await getMovieDetail({ movie_id: Number(movieId) }));
            setCast(castMovie.slice(0, 9));
            setMovieSimilar(
                await getMovieWithEndpoint({ endpoint: 'similar', movie_id: Number(movieId), page_number: 1 }),
            );
        } catch {
            setError('An error occurred while fetching data. Please try again later.');
        }
    };

    // Action
    const loadMoreSimilarMovies = async () => {
        const newPage = currentPage + 1;
        const newSimilarData = await getMovieWithEndpoint({
            endpoint: 'similar',
            movie_id: Number(movieId),
            page_number: newPage,
        });

        setMovieSimilar((prevData) => [...prevData, ...newSimilarData]);
        setCurrentPage(newPage);
    };
    const handlePush = (person_id: number) => {
        router.push(`/people/${person_id}`);
    };
    // Render
    const renderVideoSection = (
        <div className="w-full flex flex-col items-center justify-center relative">
            <div className="w-full aspect-video max-h-[600px] z-10">
                <iframe
                    title="Video"
                    src={movieVideo && `https://www.youtube.com/embed/${movieVideo.key}?autoplay=1`}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                />
            </div>
        </div>
    );

    const tabs = ['info', 'cast', 'reviews'];
    const renderMovieDetails = (
        <div className="py-6">
            <div className="text-xl font-medium flex gap-2 border-b border-primary/50 py-2">
                {tabs.map((item) => (
                    <button
                        key={item}
                        className={`rounded px-5  uppercase py-1 ${activeTab === item ? 'bg-primary' : 'bg-secondary'}`}
                        onClick={() => setActiveTab(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>
            <div className="flex flex-col mt-4 pb-8 gap-6 border-b-primary border-b">
                {activeTab === 'info' && (
                    <>
                        <h4 className="text-4xl capitalize font-semibold">{movieDetail?.title}</h4>
                        <p className="text-lg line-clamp-4">{movieDetail?.overview}</p>
                        <div className="flex gap-4 flex-col">
                            <div>
                                <span>Genres: </span>
                                <span className="">
                                    {movieDetail?.genres &&
                                        movieDetail.genres.map((genre, index) => (
                                            <React.Fragment key={genre.id}>
                                                {index > 0 && ', '}
                                                <Link
                                                    href={`/movies/genres/${genre.name}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {genre.name}
                                                </Link>
                                            </React.Fragment>
                                        ))}
                                </span>
                            </div>
                            <span>
                                Date:
                                {movieDetail && new Date(movieDetail?.release_date).toDateString().toString()}
                            </span>
                            <div className="flex gap-2">
                                <span>Rate:</span>
                                <div className="flex items-center gap-1 text-yellow-500 ">
                                    <span>{movieDetail?.vote_average.toFixed(1)}</span>
                                    <span>
                                        <FaStar />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'cast' && (
                    <>
                        <h4 className="text-4xl font-semibold px-2">Top Cast</h4>
                        <div className="flex flex-nowrap gap-5 overflow-x-auto px-2">
                            {cast.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 mb-4 w-36 rounded-2xl overflow-hidden shadow shadow-white h-72"
                                >
                                    <div onClick={() => handlePush(Number(item.id))} className="cursor-pointer">
                                        <img
                                            alt={item.name}
                                            className="object-top object-cover w-full h-48"
                                            src={
                                                item.profile_path
                                                    ? IMAGE_URL_ORIGIN + item.profile_path
                                                    : '/userDefault.png'
                                            }
                                        />
                                    </div>
                                    <div className="px-2 pt-2 text-sm">
                                        <div
                                            onClick={() => handlePush(Number(item.credit_id))}
                                            className="font-semibold cursor-pointer hover:underline line-clamp-2 mb-1"
                                        >
                                            {item.name}
                                        </div>
                                        <h5 className="font-light text-xs line-clamp-2">{item.character}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {activeTab === 'reviews' &&
                    (reviews.length !== 0 ? (
                        <div className="flex flex-col gap-4">
                            {reviews.slice(0, visibleCount).map((item) => (
                                <ReviewItem key={item.id} item={item} />
                            ))}
                            <div className="flex gap-8 justify-center">
                                {visibleCount < reviews.length && (
                                    <button
                                        className="hover:text-primary"
                                        onClick={() => setVisibleCount((prevCount) => prevCount + 5)}
                                    >
                                        Show More
                                    </button>
                                )}
                                {visibleCount > 5 && (
                                    <button className="hover:text-red-400" onClick={() => setVisibleCount(5)}>
                                        Show Less
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="my-2">
                            <h5>We don&apos;t have any reviews for {movieDetail?.title}.</h5>
                        </div>
                    ))}
            </div>
        </div>
    );

    const renderSimilarMovies = (
        <div className="my-4">
            <span className="text-3xl capitalize font-semibold border-primary/50 border-b-2">More like this</span>
            {moviesSimilar.length !== 0 ? (
                <>
                    <MoviesGrid movies={moviesSimilar} />
                    <Button title="Load More" onClick={loadMoreSimilarMovies} />
                </>
            ) : (
                <h4 className="mt-4">No similar movies available.</h4>
            )}
        </div>
    );

    //
    return error ? (
        <ErrorDisplay error={error} />
    ) : (
        <div className="">
            {renderVideoSection}
            {renderMovieDetails}
            {renderSimilarMovies}
        </div>
    );
};

export default SingleMovie;

const ReviewItem = ({ item }: { item: MovieReviewProps }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="flex items-center justify-between gap-4 shadow-sm px-4 py-2 pb-6 shadow-white/50">
            <Link href={'#'} className="bg-white p-1 rounded-full mr-5">
                <img
                    src={
                        item.author_details.avatar_path
                            ? IMAGE_URL_ORIGIN + item.author_details.avatar_path
                            : '/userDefault.png'
                    }
                    alt={item.author}
                    className="w-8 h-8"
                />
            </Link>
            <p className={`flex-1 text-justify ${showMore ? 'whitespace-normal' : 'line-clamp-2'}`}>{item.content}</p>
            <div className="flex items-center gap-1 text-yellow-300">
                <span>{item.author_details.rating ? item.author_details.rating : '_'}</span>
                <FaStar />
            </div>
            <div className="min-w-48">
                <span>{new Date(item.updated_at).toLocaleString().toString()}</span>
                <Link href={'#'}>
                    <h4 className="hover:underline">by {item.author}</h4>
                </Link>
            </div>
            <div className="w-20 ml-2 text-sm hover:text-primary">
                {item.content.length > 100 && (
                    <button onClick={() => setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Show More'}</button>
                )}
            </div>
        </div>
    );
};
