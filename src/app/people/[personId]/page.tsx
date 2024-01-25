'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaFacebook, FaInstagram, FaStar, FaTwitter, FaYoutube } from 'react-icons/fa';
import Tippy from '@tippyjs/react/headless';
import ErrorDisplay from '@/components/ErrorDisplay';
import { IMAGE_URL_ORIGIN } from '@/constants';
import { getExternalIDs, getPersonDetail, getPersonMovieCredits } from '@/service/people';

interface PersonMovieCreditsProps {
    id: number;
    cast: CastCredit[];
    crew: CrewCredit[];
}

const Person = () => {
    const { personId } = useParams();
    const router = useRouter();
    const [personDetail, setPersonDetail] = useState<PersonDetail>();
    const [personExternalIds, setPersonExternalIds] = useState<ExternalIds>();
    const [personCredit, setPersonCredit] = useState<PersonMovieCreditsProps>();
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    // Action
    const handlePushLink = (id: number) => {
        router.push(`/movies/${id}`);
    };
    const fetchData = async () => {
        try {
            setPersonDetail(await getPersonDetail({ person_id: Number(personId) }));
            setPersonExternalIds(await getExternalIDs({ person_id: Number(personId) }));

            const credits: PersonMovieCreditsProps = await getPersonMovieCredits({ person_id: Number(personId) });
            const sortedCast = credits.cast.sort(
                (a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear(),
            );
            const sortedCrew = credits.crew.sort(
                (a, b) => new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear(),
            );

            setPersonCredit({
                cast: sortedCast,
                crew: sortedCrew,
                id: credits.id,
            });
        } catch (err) {
            setErr('An error occurred while fetching data. Please try again later.');
        }
    };

    // Render
    const PersonInfo = ({ personDetail }: { personDetail: PersonDetail }) => (
        <div>
            <img
                src={IMAGE_URL_ORIGIN + personDetail.profile_path}
                alt={personDetail.name}
                className="rounded-xl w-72 lg:w-80"
            />
            {personExternalIds && (
                <div className="flex gap-3 text-2xl my-6">
                    {personExternalIds.facebook_id && (
                        <Link href={`https://www.facebook.com/${personExternalIds.facebook_id}`} target="_blank">
                            <FaFacebook />
                        </Link>
                    )}
                    {personExternalIds.twitter_id && (
                        <Link href={`https://twitter.com/${personExternalIds.twitter_id}`} target="_blank">
                            <FaTwitter />
                        </Link>
                    )}
                    {personExternalIds.instagram_id && (
                        <Link href={`https://www.instagram.com/${personExternalIds.instagram_id}`} target="_blank">
                            <FaInstagram />
                        </Link>
                    )}
                    {personExternalIds.youtube_id && (
                        <Link href={`https://www.youtube.com/user/${personExternalIds.youtube_id}`} target="_blank">
                            <FaYoutube />
                        </Link>
                    )}
                </div>
            )}
            <div>
                <h4 className="text-xl font-semibold my-1">Personal Info</h4>
                <div className="flex flex-col gap-3">
                    <RenderInfoItem title="Known Credits" value={personDetail.known_for_department} />
                    <RenderInfoItem title="Gender" value={personDetail.gender} />
                    <RenderInfoItem title="Birthday" value={personDetail.birthday} />
                    <RenderInfoItem title="Place of Birth" value={personDetail.place_of_birth} />
                    <RenderInfoItem title="Also Known As" value={'_'} />
                </div>
            </div>
        </div>
    );

    const PersonKnownFor = ({ personCredit }: { personCredit: PersonMovieCreditsProps }) => (
        <div className="flex flex-col">
            <h5 className="font-medium capitalize">Known for</h5>
            <div className="flex flex-nowrap gap-4 mt-2 overflow-auto">
                {personCredit.cast.slice(0, 15).map(
                    (item) =>
                        item.poster_path && (
                            <div
                                key={item.id}
                                onClick={() => router.push(`/movies/${item.id}`)}
                                className="w-32 flex-shrink-0 cursor-pointer"
                            >
                                <img
                                    src={IMAGE_URL_ORIGIN + item.poster_path}
                                    alt={item.title}
                                    className="w-full h-48 flex-shrink rounded"
                                />
                                <h5 className="text-xs hover:text-primary font-light py-3 text-center line-clamp-2">
                                    {item.title}
                                </h5>
                            </div>
                        ),
                )}
            </div>
        </div>
    );

    const PersonCredits = ({ personCredit }: { personCredit: PersonMovieCreditsProps }) => (
        <div className="">
            <h5 className="font-medium capitalize">Acting</h5>
            <div className="p-4">
                <div className="shadow shadow-white/40 gap-2 flex p-3 flex-col">
                    {personCredit.cast && personCredit.cast.map((item) => <RenderCredits key={item.id} item={item} />)}
                </div>
            </div>
            <h5 className="font-medium capitalize">Crew</h5>
            {personCredit.crew.length != 0 && (
                <div className="p-4">
                    <div className="shadow shadow-white/40 flex p-3 gap-2 flex-col">
                        {personCredit.cast &&
                            personCredit.crew.map((item) => <RenderCredits key={item.id} item={item} />)}
                    </div>
                </div>
            )}
        </div>
    );

    const RenderInfoItem = ({ title, value }: { title: string; value: any }) => (
        <div>
            <h5 className="font-medium capitalize">{title}</h5>
            <span className="text-sm font-extralight">{value}</span>
        </div>
    );

    const isCrewCredit = (item: CrewCredit | CastCredit): item is CrewCredit => 'job' in item;
    const isCastCredit = (item: CrewCredit | CastCredit): item is CastCredit => 'character' in item;

    const RenderCredits = ({ item }: { item: CrewCredit | CastCredit }) =>
        item.release_date && (
            <div className="flex gap-4 items-center">
                <span className="w-10">{new Date(item.release_date).getFullYear()}</span>
                <Tippy
                    interactive
                    render={() => (
                        <div className="w-full max-w-[600px] bg-secondary gap-3 flex p-3 rounded-lg">
                            <div className="w-28">
                                <img
                                    onClick={() => handlePushLink(item.id)}
                                    src={IMAGE_URL_ORIGIN + item.poster_path}
                                    className="w-full h-40 rounded cursor-pointer"
                                    alt={item.title}
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex gap-2">
                                    <h4
                                        onClick={() => handlePushLink(item.id)}
                                        className="font-semibold hover:underline line-clamp-1 text-xl cursor-pointer"
                                    >
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-1 text-yellow-300">
                                        <span>{item.vote_average.toFixed(1)}</span>
                                        <FaStar />
                                    </div>
                                </div>
                                <p className="text-sm font-light line-clamp-6">{item.overview}</p>
                            </div>
                        </div>
                    )}
                >
                    <span className="w-2 h-2 rounded-full bg-red-50 hover:bg-primary" />
                </Tippy>
                <div className="leading-5">
                    <h5 className="hover:underline cursor-pointer" onClick={() => handlePushLink(item.id)}>
                        {item.title}
                    </h5>
                    <div className="text-sm font-thin ml-5">
                        {isCastCredit(item) && (
                            <span>
                                as <strong>{item.character}</strong>
                            </span>
                        )}
                        {isCrewCredit(item) && (
                            <span>
                                as <strong> {item.job}</strong>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );

    //
    return err ? (
        <ErrorDisplay error={err} />
    ) : (
        personDetail && personCredit && (
            <div className="py-4 flex">
                <div className="flex gap-8 max-w-full">
                    <PersonInfo personDetail={personDetail} />
                    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                        <h4 className="text-3xl font-semibold">{personDetail.name}</h4>
                        <RenderInfoItem title="Biography" value={personDetail.biography} />
                        <PersonKnownFor personCredit={personCredit} />
                        <PersonCredits personCredit={personCredit} />
                    </div>
                </div>
            </div>
        )
    );
};

export default Person;
