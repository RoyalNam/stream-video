import React, { ReactNode } from 'react';

type AccountLayoutProps = {
    children: ReactNode;
    title: string;
};

const AccountLayout: React.FC<AccountLayoutProps> = ({ children, title }) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-[url('/bg.jpeg')] z-50 w-full h-full">
            <div className="flex flex-1 w-full h-full justify-center items-center">
                <div className="bg-bgColor p-7 w-auto -mt-20">
                    <div className="border-b mb-5 pb-2">
                        <h4 className="text-3xl font-semibold uppercase text underline underline-offset-[13px] decoration-4 decoration-primary">
                            {title}
                        </h4>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;
