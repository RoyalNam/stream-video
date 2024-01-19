'use client';
import SliderVideo from '@/components/SliderVideo';
import React from 'react';
import Slider from 'react-slick';

const MyList = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        // slidesToScroll: 1,
    };
    return (
        <div className="w-full">
            <h2>My list</h2>
        </div>
    );
};

export default MyList;
