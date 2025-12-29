import React from 'react';
import "./SlideShow.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ArticleCard from './ArticleCard';

const SlideShow = ({articles}) => {

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            className="slide-show-container"
        >
            {articles.map((article, index) => (
                <SwiperSlide key={index}>
                    <ArticleCard key={article.id} article={article} variant="slide-show" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default SlideShow;
