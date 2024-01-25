'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { IMAGE_URL_ORIGIN } from '@/constants';
import { getPersonPopular } from '@/service/people';

const People = () => {
    const router = useRouter();
    const [popularPeople, setPopularPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const popularPeople = await getPersonPopular({});
            console.log(popularPeople);

            setPopularPeople(popularPeople);
        };
        fetchData();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading]);

    // Action
    const loadMoreMovies = async () => {
        setLoading(true);
        const newPage = currentPage + 1;
        const newMovies = await getPersonPopular({ page_number: newPage });
        setPopularPeople((prev) => [...prev, ...newMovies]);
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
    const handlePush = (person_id: number) => {
        router.push(`/people/${person_id}`);
    };

    // Render
    const RenderPerson = ({ item }: { item: Person }) => (
        <div className="shadow-white/50 shadow">
            <img
                src={IMAGE_URL_ORIGIN + item.profile_path}
                alt={item.name}
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => handlePush(item.id)}
            />
            <div className="px-3 py-2">
                <h4 className="font-semibold cursor-pointer hover:underline" onClick={() => handlePush(item.id)}>
                    {item.name}
                </h4>
                <div className="line-clamp-2 font-light text-sm">
                    {item.known_for.map(
                        (movie, index) =>
                            movie.media_type == 'movie' && (
                                <React.Fragment key={movie.id}>
                                    {index > 0 && item.known_for[index - 1]?.media_type === 'movie' && ', '}
                                    <span>{movie.title}</span>
                                </React.Fragment>
                            ),
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <h4 className="text-center text-3xl font-medium py-3 border-b border-primary/50 cursor-pointer">
                Popular People
            </h4>
            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {popularPeople && popularPeople.map((item) => <RenderPerson key={item.id} item={item} />)}
            </div>
        </div>
    );
};

export default People;
