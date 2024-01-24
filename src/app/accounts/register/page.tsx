'use client';

import React from 'react';
import LabelWithInput from '@/components/LabelWithInput';
import Button from '@/components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Register = () => {
    const router = useRouter();
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[url('/bg.jpeg')] z-50 w-full h-full">
            <div className="flex flex-1 w-full h-full justify-center items-center">
                <div className="bg-bgColor p-7 w-auto -mt-20">
                    <div className="border-b mb-5 pb-2">
                        <h4 className="text-3xl font-semibold uppercase text underline underline-offset-[13px] decoration-4 decoration-primary">
                            Register
                        </h4>
                    </div>
                    <div className="w-[500px]">
                        <form action="" method="post">
                            <div className="flex gap-3 flex-col">
                                <LabelWithInput title="Username" />
                                <LabelWithInput title="Email" type="email" />
                                <LabelWithInput title="Password" type="password" />
                                <LabelWithInput title="Repeat Password" type="password" />
                            </div>
                            <div className="mt-8 mb-2 flex gap-4">
                                <Button
                                    title="Register"
                                    onClick={() => {
                                        router.push('/');
                                    }}
                                />
                                <div className="flex items-center gap-4">
                                    <span>or</span>
                                    <Link
                                        className="underline hover:text-primary block uppercase text-lg"
                                        href={'/accounts/login'}
                                    >
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
