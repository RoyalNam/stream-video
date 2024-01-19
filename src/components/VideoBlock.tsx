import React from 'react';
import Button from './Button';

interface VideoBlockProps {
    tit: string;
    children: React.ReactNode;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ tit, children }) => {
    return (
        <div className="max-w-full">
            <div className="flex justify-between items-center my-3">
                <h4 className="text-2xl font-semibold text-white capitalize">{tit}</h4>
                <Button title="Load more" onClick={() => {}} />
            </div>
            <div className="-mx-2">{children}</div>
        </div>
    );
};

export default VideoBlock;
