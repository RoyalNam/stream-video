import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Tippy from '@tippyjs/react/headless';
import { FaSearch, FaTimes } from 'react-icons/fa';

import { IMAGE_URL_ORIGIN } from '@/constants';
import { searchMovies } from '@/service/movie';

const Search = () => {
    const router = useRouter();
    const searchResultsRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef() as RefObject<HTMLInputElement>;

    const [videosSearch, setVideoSearch] = useState<MovieBaseProps[]>([]);
    const [isSearch, setSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [currentPage]);

    // Action
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1);
        setVideoSearch([]);
        const inputValue = event.target.value;
        if (inputRef.current?.value) {
            inputRef.current.value = inputValue;
            handleDelayedSearch(inputValue);
        }
    };

    const handleDelayedSearch = useRef(
        debounce(async (value: string) => {
            try {
                const resp = await searchMovies({ query: value });
                if (resp) setVideoSearch(resp);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }, 500),
    ).current;

    const loadMoreMovies = async () => {
        setLoading(true);
        const newPage = currentPage + 1;
        try {
            if (inputRef.current?.value) {
                const newMovies = await searchMovies({ query: inputRef.current?.value });
                setVideoSearch((prev) => [...prev, ...newMovies]);
            }
            setCurrentPage(newPage);
        } catch (error) {
            console.error('Error loading more movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const searchResultsContainer = searchResultsRef.current;
        if (searchResultsContainer) {
            const scrollHeight = searchResultsContainer.scrollHeight;
            const scrollTop = searchResultsContainer.scrollTop;
            const clientHeight = searchResultsContainer.clientHeight;

            if (scrollHeight - scrollTop <= clientHeight + 150 && !loading) {
                loadMoreMovies();
            }
        }
    };

    // Render
    const SearchItem = ({ item }: { item: MovieBaseProps }) =>
        item.backdrop_path && (
            <div
                onClick={() => {
                    router.push(`/movies/${item.id}`);
                    setSearch(false);
                }}
                className="flex gap-4 items-center cursor-pointer px-2 py-2"
            >
                <img className="w-28 h-14 rounded block" src={IMAGE_URL_ORIGIN + item.backdrop_path} alt="" />
                <div>
                    <h4 className="line-clamp-1 font-semibold">{item.title}</h4>
                    <p className="line-clamp-2 text-sm">{item.overview} </p>
                </div>
            </div>
        );

    const renderSearch = (
        <search ref={searchResultsRef} className="border border-white/30 rounded-xl bg-black w-[500px] overflow-hidden">
            <form
                method="get"
                className="flex"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search ..."
                    title="Search"
                    onChange={handleChange}
                    className="bg-transparent flex-1 py-3 pl-3 outline-none border-r"
                />
                <button title="Search" className="px-3">
                    <FaSearch />
                </button>
            </form>
            <div className="bg-secondary/40 max-h-[500px] h-auto overflow-y-auto w-full">
                {inputRef.current?.value != '' &&
                    (videosSearch.length !== 0 ? (
                        <div className="flex flex-col border-t">
                            {videosSearch.map((item) => (
                                <SearchItem key={item.id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="border-t border-white/20 p-2">
                            <p>No results found for "{inputRef.current?.value}". Please try a different search term.</p>
                        </div>
                    ))}
            </div>
        </search>
    );
    return (
        <Tippy
            placement="bottom-end"
            onClickOutside={() => setSearch(false)}
            visible={isSearch}
            interactive
            offset={[0, 25]}
            render={() => renderSearch}
        >
            {isSearch ? (
                <button onClick={() => setSearch(!isSearch)} title="Search" className="px-3 text-xl">
                    <FaTimes />
                </button>
            ) : (
                <button
                    onClick={() => {
                        setSearch(!isSearch);
                        inputRef.current && (inputRef.current.value = '');
                    }}
                    title="Close Search"
                    className="px-3 text-xl"
                >
                    <FaSearch />
                </button>
            )}
        </Tippy>
    );
};

export default Search;

const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null;

    return (...args: any[]) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, delay);
    };
};
