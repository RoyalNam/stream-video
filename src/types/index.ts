interface MediaBaseProps {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    media_type: 'movie' | 'tv';
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface MovieBaseProps extends MediaBaseProps {
    original_title: string;
    release_date: Date;
    title: string;
    video: boolean;
}
interface MovieDetailProps extends MovieBaseProps {
    genres: GenresProps[];
    imdb_id: string;
    original_language: string;
    original_title: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
}
interface TvShowProps extends MediaBaseProps {
    name: string;
    origin_country: string[];
    original_name: string;
}

interface GenresProps {
    id: number;
    name: string;
}

interface VideoProps {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: Date;
    id: string;
}
