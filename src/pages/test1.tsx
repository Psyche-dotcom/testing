// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  Mousewheel,
  EffectFade,
  Lazy,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSlider from "@sections/Sliders/HeroSlider/HeroSlider";
import { lazy, Suspense, useRef } from "react";
import useWindowDimensions from "@hooks/useWindowDimensions";

const vreel = {
  author: "can7os223akuve30qlgg",
  elements: {
    socials: {
      header: "",
      socials: [
        {
          platform: "twitter",
          username: "vreel",
        },
      ],
    },
    videos: {
      header: "",
      position: 2,
      videos: [1, 2, 3, 4, 5, 6, 7].map((e) => {
        return {
          mobile: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/videos/test-video-${e}.mp4`,
            content_type: "video",
          },
          desktop: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/videos/test-video-${e}.mp4`,
            content_type: "video",
          },
          cta1: {
            link_header: "Sign Up",
            link_type: "URL",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "URL",
            link_url: "/login",
          },
        };
      }),
    },
    gallery: {
      header: "",
      position: 3,
      images: [1, 2, 3, 4].map((e) => {
        return {
          mobile: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/images/test-image (${e}).jpg`,
            content_type: "image",
          },
          desktop: {
            start_time: 0,
            stop_time: 0,
            background_audio_uri: null,
            uri: `/assets/images/test-image (${e}).jpg`,
            content_type: "image",
          },
          cta1: {
            link_header: "Sign Up",
            link_type: "URL",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "URL",
            link_url: "/login",
          },
        };
      }),
      hidden: false,
    },
    simple_links: {
      header: "",
      links: [
        {
          id: "candi5i23akkasd8kg6g",
          thumbnail:
            "https://staging.vreel.page/files/6dbd0edfdc7e4cfd8c36d32d6401da92",
          link_header: "Black Embition prize",
          url: "https://staging.vreel.page/files/6dbd0edfdc7e4cfd8c36d32d6401da92",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candjpa23akkasd8kg70",
          thumbnail:
            "https://staging.vreel.page/files/364fb06406188a4d0d0a9b28af83ebef",
          link_header: "Black Embition prize 2",
          url: "https://staging.vreel.page/files/364fb06406188a4d0d0a9b28af83ebef",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candmoq23akkasd8kg7g",
          thumbnail:
            "https://staging.vreel.page/files/7453964216168b85c8c64a5f9b6990f5",
          link_header: "Black Embition prize 2",
          url: "https://staging.vreel.page/files/7453964216168b85c8c64a5f9b6990f5",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candn1a23akkasd8kg80",
          thumbnail:
            "https://staging.vreel.page/files/1b0f235025c5c3b4fdf9b1d0a43a1733",
          link_header: "Black Embition prize 4",
          url: "https://staging.vreel.page/files/1b0f235025c5c3b4fdf9b1d0a43a1733",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candn9q23akkasd8kg8g",
          thumbnail:
            "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_header: "Black Embition 5",
          url: "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_type: "url",
          tag: "shop",
        },
        {
          id: "candnba23akkasd8kg90",
          thumbnail:
            "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_header: "Black Embition 6",
          url: "https://staging.vreel.page/files/3d69c3b6bdc396a9bcba69ed0e282692",
          link_type: "url",
          tag: "shop",
        },
      ],
    },
  },
  slides: [
    "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1655858115/samples/Pexels_Videos_2815411_spikr6.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1645686811/samples/sea-turtle.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1655858114/samples/pexels-rodnae-productions-7895613_itn7mi.mp4",
  ].map((e) => {
    return {
      id: "canefb223akkasd8kg9g",
      slide_location: 1,
      content_type: "",
      uri: "",
      title: {
        header: "Hello 1",
        description: "World",
      },
      advanced: {
        header: "Hello",
      },
      mobile: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: null,
        uri: e,
        content_type: "video",
      },
      desktop: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri: null,
        uri: e,
        content_type: "video",
      },
      cta1: {
        link_header: "Sign Up",
        link_type: "URL",
        link_url: "/register",
      },
      cta2: {
        link_header: "Login",
        link_type: "URL",
        link_url: "/login",
      },
    };
  }),
};


// const HeroSlider = () => {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination, Autoplay]}
//       loop
//       navigation
//       pagination
//       onLoad={() => {}}
//       slidesPerView={1}
//       initialSlide={1}
//       //   onSlideChange={(s) => {
//       //     if (username)
//       //       router.push(
//       //         `/${username}?slide=${slides?.map((e) => e.id)[s.realIndex]}`
//       //       );
//       //     else {
//       //       router.push(`/?slide=${slides?.map((e) => e.id)[s.realIndex]}`);
//       //     }
//       //     setCurrentSlide(s.realIndex);
//       //   }}
//       speed={1000}
//       autoplay={{
//         delay: 10000,
//       }}
//       //   onSwiper={(swiper) => {
//       //     setSwiper(swiper);
//       //   }}
//       // effect='fade'
//       style={{
//         height: '100vh',
//       }}
//     >
//       {vreel.slides.map((obj, index) => (
//         <SwiperSlide key={index}>
//           <video
//             // ref={videoEl}
//             preload='metadata'
//             autoPlay={true}
//             muted={true}
//             playsInline
//             onEnded={(e) => {
//               /* swiper.slideNext();
//           console.log("ended", currentSlide, slideId); */
//             }}
//           >
//             <source src={obj.desktop.uri} type={'video/mp4'}></source>
//             Your browser does not support the video tag.
//           </video>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

const LazySlider = lazy(
  () => import("@sections/Sliders/HeroSlider/HeroSlider")
);

const Test1 = () => {
  const { height, width } = useWindowDimensions();
  const devref = useRef(null);
  return (
    <Swiper
      modules={[Pagination, Autoplay, Mousewheel, Navigation]}
      slidesPerView={1}
      mousewheel={true}
      speed={300}
      autoplay={{
        delay: 10000,
      }}
      direction={"vertical"}
      style={{ height: "100vh" }}
    >
      {[1, 2, 3, 4].map((item, index) => {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);

        return (
          <SwiperSlide>
            {index === 0 ? (
              <Suspense fallback={<div>Please wait..</div>}>
                <LazySlider slides={vreel.slides} view="Mobile" />
              </Suspense>
            ) : (
              <div
                style={{
                  height: "100vh",
                  border: `10px solid rgb(${red}, ${green}, ${blue})`,
                }}
              >
                Content - {index}
              </div>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Test1;
