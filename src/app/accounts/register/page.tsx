'use client';

import React from 'react';
import LabelWithInput from '@/components/LabelWithInput';
import Button from '@/components/Button';

const Register = () => {
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
                                <div className="grid grid-cols-2 gap-4">
                                    <LabelWithInput title="First Name" />
                                    <LabelWithInput title="Last Name" />
                                </div>
                                <LabelWithInput title="Email" type="email" />
                                <LabelWithInput title="Password" />
                                <LabelWithInput title="Repeat Password" />
                            </div>
                            <div className="mt-8 mb-2">
                                <Button title="Register" onClick={() => {}} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
