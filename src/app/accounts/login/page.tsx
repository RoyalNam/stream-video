'use client';
import React from 'react';
import AccountLayout from '../layout';
import LabelWithInput from '@/components/LabelWithInput';
import Button from '@/components/Button';
import Link from 'next/link';

const Login = () => {
    return (
        <AccountLayout title="Sign In">
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
        </AccountLayout>
    );
};

export default Login;
