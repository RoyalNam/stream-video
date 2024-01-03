'use client';
import React from 'react';
import Tippy from '@tippyjs/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAlignJustify, FaSearch, FaSignInAlt, FaUpload, FaUser } from 'react-icons/fa';

const Navbar = () => {
    const pathname = usePathname();
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
        <nav className="bg-[#141b29]">
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
                    <search className="flex items-center border rounded-xl">
                        <form>
                            <input
                                type="text"
                                placeholder="Search ..."
                                title="Search"
                                className="bg-transparent py-3 pl-3 outline-none"
                            />
                            <button type="submit" title="Search" className="px-3 border-l">
                                <FaSearch />
                            </button>
                        </form>
                    </search>
                    <Tippy interactive theme="translucent" placement="bottom-end" render={() => Render}>
                        <button
                            title="User"
                            className="flex items-center justify-center bg-primary ml-2 h-11 w-11 rounded-full"
                        >
                            <FaUser />
                        </button>
                    </Tippy>
                    <button title="Menu" className="flex md:hidden bg-primary p-3">
                        <FaAlignJustify className="text-xl" />
                    </button>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
const LiNK = [
    { name: 'Home', to: '/' },
    { name: 'TV Shows', to: '/tv-shows' },
    { name: 'Movies', to: '/movies' },
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
