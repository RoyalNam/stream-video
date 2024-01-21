'use client';
import React from 'react';
import LabelWithInput from '@/components/LabelWithInput';
import Button from '@/components/Button';
import Link from 'next/link';

const Login = () => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[url('/bg.jpeg')] z-50 w-full h-full">
            <div className="flex flex-1 w-full h-full justify-center items-center">
                <div className="bg-bgColor p-7 w-auto -mt-20">
                    <div className="border-b mb-5 pb-2">
                        <h4 className="text-3xl font-semibold uppercase text underline underline-offset-[13px] decoration-4 decoration-primary">
                            Sign In
                        </h4>
                    </div>
                    <div className="w-[500px]">
                        <form action="" method="post">
                            <div className="flex flex-col gap-3">
                                <LabelWithInput title="Email" type="email" />
                                <LabelWithInput title="Password" type="password" />
                                <div>
                                    <input type="checkbox" name="Remember" id="" title="Remember" />
                                    <label className="ml-2">Remember Me</label>
                                </div>
                            </div>
                            <div className="my-4">
                                <Button onClick={() => {}} title="Log In" />
                            </div>
                            <div className="text-primary flex gap-2">
                                <Link href={'/'}>Register</Link>
                                <span className="text-white">|</span>
                                <Link href={'/'}>Lost your password</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
