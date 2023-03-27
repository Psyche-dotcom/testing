import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SwiperContainer: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className='sheetSlider'>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        speed={1500}
        // effect='fade'
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
