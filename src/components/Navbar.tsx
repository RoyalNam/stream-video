'use client';
import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAlignJustify, FaSearch, FaSignInAlt, FaUpload, FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
    const pathname = usePathname();
    const [isShowMenu, setShowMenu] = useState(false);
    const [isShowDropDownMenu, setShowDropDownMenu] = useState(false);
    const Render = (
        <div className="flex flex-col rounded overflow-hidden bg-[#0a0e17] shadow-md shadow-cyan-300/50 pt-1 min-w-52">
            {DROP_MENU.map((item, idx) => (
                <Link key={idx} href={item.to} className="hover:bg-primary flex items-center gap-2 py-1 pl-3">
                    {item.icon}
                    {item.name}
                </Link>
            ))}
        </div>
    );
    return (
        <nav className="bg-[#141b29] sticky top-0 w-full z-20">
            <div className="w-full max-w-8xl mx-auto flex items-center justify-between min-h-20 px-4">
                <a href="/" title="Home">
                    <img className="h-12" src="/logo-1.png" alt="" />
                </a>
                <div className="flex items-center h-full gap-4">
                    <div className="mr-4 hidden lg:flex">
                        {LiNK.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.to}
                                className={`px-4 font-medium ${pathname == item.to && 'text-primary'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <search className="flex items-center border-0 md:border rounded-xl">
                        <form>
                            <input
                                type="text"
                                placeholder="Search ..."
                                title="Search"
                                className="bg-transparent hidden md:inline-flex py-3 pl-3 outline-none border-r"
                            />
                            <button type="submit" title="Search" className="px-3">
                                <FaSearch />
                            </button>
                        </form>
                    </search>
                    <Tippy
                        interactive
                        visible={isShowDropDownMenu}
                        onClickOutside={() => setShowDropDownMenu(false)}
                        theme="translucent"
                        placement="bottom-end"
                        render={() => Render}
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
                        {isShowMenu && (
                            <div className="fixed inset-0 z-20 select-none">
                                <div className="absolute inset-0 z-20 bg-black/70" onClick={() => setShowMenu(false)} />
                                <div className="w-64 bg-secondary absolute right-0 h-full z-30">
                                    <button
                                        title="Close"
                                        className="absolute -left-8 bg-secondary p-1"
                                        onClick={() => setShowMenu(false)}
                                    >
                                        <IoClose className="text-3xl" />
                                    </button>
                                    <div className="flex flex-col mt-4 gap-3">
                                        {LiNK.map((item, idx) => (
                                            <Link
                                                key={idx}
                                                href={item.to}
                                                className={`px-4 font-medium ${pathname == item.to && 'text-primary'}`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
const LiNK = [
    { name: 'Home', to: '/' },
    { name: 'Movies', to: '/movies' },
    { name: 'Genres', to: '#' },
    { name: 'My List', to: '/my-list' },
];
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
