interface KnownForItem {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface Person {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    known_for: KnownForItem[];
}

interface PersonDetail {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

interface PersonCredit {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    credit_id: string;
}

interface CrewCredit extends PersonCredit {
    department: string;
    job: string;
}
interface CastCredit extends PersonCredit {
    character: string;
    order: number;
}

interface ExternalIds {
    id: number;
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
    youtube_id: string;
}
