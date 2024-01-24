'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Tippy from '@tippyjs/react/headless';
import { FaAlignJustify, FaSignInAlt, FaUpload, FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import { useGenresOrCertificationData } from '@/context/store';
import Search from './Search';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const GENRES = useGenresOrCertificationData<GenresProps>();
    const [isShowMenu, setShowMenu] = useState(false);
    const [isShowDropDownMenu, setShowDropDownMenu] = useState(false);

    const LiNK = [
        { name: 'Home', to: '/' },
        {
            name: 'Movies',
            to: '/movies/movies-list/',
            children: [
                { name: 'Now playing', to: '/movies/movies-list/now_playing' },
                { name: 'Top rated', to: '/movies/movies-list/top_rated' },
                { name: 'Popular', to: '/movies/movies-list/popular' },
                { name: 'Upcoming', to: '/movies/movies-list/upcoming' },
            ],
        },
        {
            name: 'Genres',
            to: '/movies/genres/#',
            children: GENRES && GENRES.map((item) => ({ name: item.name, to: `/movies/genres/${item.name}` })),
        },
        { name: 'My List', to: '/my-list' },
    ];

    // Render
    const renderUserDropdown = (
        <div className="flex flex-col rounded overflow-hidden bg-[#0a0e17] shadow-md shadow-cyan-300/50 pt-1 min-w-52">
            {DROP_MENU.map((item, idx) => (
                <Link key={idx} href={item.to} className="hover:bg-primary flex items-center gap-2 py-1 pl-3">
                    {item.icon}
                    {item.name}
                </Link>
            ))}
        </div>
    );

    const renderMobileMenu = (
        <div className="fixed inset-0 z-20 select-none">
            <div className="absolute inset-0 z-20 bg-black/70" onClick={() => setShowMenu(false)} />
            <div className="w-64 bg-secondary absolute right-0 h-full z-30">
                <button title="Close" className="absolute -left-8 bg-secondary p-1" onClick={() => setShowMenu(false)}>
                    <IoClose className="text-3xl" />
                </button>
                <div className="flex flex-col mt-4 gap-3">
                    {LiNK.map((item, idx) => (
                        <div
                            onClick={!item.children ? () => router.push(item.to) : () => {}}
                            key={idx}
                            // href={item.to}
                            className={`px-4 font-medium ${!item.children && 'hover:text-primary'}`}
                        >
                            <span>{item.name}</span>
                            {item.children && (
                                <div className="flex flex-col px-4">
                                    {item.children.map((cld) => (
                                        <Link key={cld.to} href={cld.to}>
                                            {cld.name as string}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderMainMenu = (
        <div className="mr-4 hidden lg:flex">
            {LiNK.map((item, idx) =>
                item.children ? (
                    <Tippy
                        key={idx}
                        interactive
                        placement="bottom-start"
                        render={() => (
                            <div
                                className={`${
                                    item.children && item.children.length > 7 ? 'grid grid-cols-3' : ''
                                } bg-secondary min-w-48 shadow-sm shadow-black`}
                            >
                                {item.children &&
                                    item.children.map((cat, catIdx) => (
                                        <Link
                                            key={catIdx}
                                            href={cat.to}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            passHref
                                            className={`py-2 block px-4 hover:bg-primary ${
                                                pathname === cat.to ? 'text-primary' : ''
                                            }`}
                                        >
                                            {cat.name as string}
                                        </Link>
                                    ))}
                            </div>
                        )}
                    >
                        <div
                            key={idx}
                            className={`px-4 font-medium ${
                                pathname === item.to || item.children.some((cat) => pathname === cat.to)
                                    ? 'text-primary'
                                    : ''
                            }`}
                        >
                            {item.name}
                        </div>
                    </Tippy>
                ) : (
                    <Link
                        key={idx}
                        href={item.to}
                        className={`px-4 font-medium ${pathname === item.to ? 'text-primary' : ''}`}
                    >
                        {item.name}
                    </Link>
                ),
            )}
        </div>
    );

    //
    return (
        <nav className="bg-[#141b29]/95 sticky top-0 w-full z-50">
            <div className="w-full max-w-8xl mx-auto flex items-center justify-between min-h-20 px-4">
                <a href="/" title="Home">
                    <img className="h-20" src="/myLogo.png" alt="" />
                </a>
                <div className="flex items-center h-full gap-4">
                    {renderMainMenu}
                    <Search />
                    <Tippy
                        interactive
                        visible={isShowDropDownMenu}
                        onClickOutside={() => setShowDropDownMenu(false)}
                        theme="translucent"
                        placement="bottom-end"
                        render={() => renderUserDropdown}
                    >
                        <button
                            title="User"
                            className="flex items-center justify-center bg-primary ml-2 h-11 w-11 rounded-full"
                            onClick={() => setShowDropDownMenu(!isShowDropDownMenu)}
                        >
                            <FaUser />
                        </button>
                    </Tippy>
                    <div>
                        <button
                            title="Menu"
                            className="flex lg:hidden bg-primary p-3"
                            onClick={() => setShowMenu(true)}
                        >
                            <FaAlignJustify className="text-xl" />
                        </button>
                        {isShowMenu && renderMobileMenu}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;

const DROP_MENU = [
    {
        icon: <FaSignInAlt />,
        name: 'Login',
        to: '/accounts/login',
    },
    {
        icon: <FaUser />,
        name: 'Register',
        to: '/accounts/register',
    },
    {
        icon: <FaUpload />,
        name: 'Upload',
        to: '/',
    },
];
