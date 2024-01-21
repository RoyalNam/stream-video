'use client';

import React from 'react';
import AccountLayout from '../layout';
import LabelWithInput from '@/components/LabelWithInput';
import Button from '@/components/Button';

const Register = () => {
    return (
        <AccountLayout title="Register">
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
        </AccountLayout>
    );
};

export default Register;
