export type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
export type MovieEndpoint = 'credits' | 'keywords' | 'reviews' | 'similar' | 'translations' | 'videos';

export interface DiscoverOptions {
    certification_gte?: string;
    certification_lte?: string;
    certification_country?: string;
    include_adult?: boolean;
    language?: string;
    page?: number;
    primary_release_year?: number;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    region?: string;
    release_date_gte?: string;
    release_date_lte?: string;
    sort_by?: string;
    popularity_desc?: string;
    vote_average_gte?: number;
    vote_average_lte?: number;
    vote_count_gte?: number;
    vote_count_lte?: number;
    watch_region?: string;
    with_cast?: string;
    with_companies?: string;
    with_crew?: string;
    with_genres?: string;
    with_keywords?: string;
    with_origin_country?: string;
    with_original_language?: string;
    with_people?: string;
    with_release_type?: number;
    with_runtime_gte?: number;
    with_runtime_lte?: number;
    with_watch_monetization_types?: string;
    with_watch_providers?: string;
    without_companies?: string;
    without_genres?: string;
    without_keywords?: string;
    without_watch_providers?: string;
    year?: number;
}
interface RequestTokenProps {
    success: boolean;
    expires_at: Date;
    request_token: string;
}
