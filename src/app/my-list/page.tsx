'use client';
import Button from '@/components/Button';
import { createSession } from '@/service/list';
import React from 'react';

const MyList = () => {
    return (
        <div className="w-full my-6">
            <div className="flex justify-between items-center">
                <h4 className="text-3xl font-semibold capitalize">My list</h4>
                <Button
                    title="Create list"
                    onClick={async () => {
                        console.log('requestToken', await createSession());
                    }}
                />
            </div>
            <div>
                <span>You haven&quot;t created any lists.</span>
            </div>
        </div>
    );
};

export default MyList;
