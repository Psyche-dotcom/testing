import { NextPage } from "next";
import ReactPlayer from "react-player";
import { useSpringCarousel } from "react-spring-carousel";

const mockedItems = [
  { id: 1, color: "", title: "Content-1" },
  { id: 2, color: "", title: "Content-2" },
  { id: 3, color: "", title: "Content-3" },
];

const Test2: React.FC = () => {
  const {
    carouselFragment,
    slideToPrevItem,
    enterFullscreen,
    slideToNextItem,
  } = useSpringCarousel({
    items: [
      "/assets/videos/waterfall.mp4",
      "/assets/videos/test-video-1.mp4",
      "/assets/videos/test-video-2.mp4",
      "/assets/videos/test-video-3.mp4",
      "/assets/videos/test-video-4.mp4",
      "/assets/videos/test-video-5.mp4",
      "/assets/videos/test-video-6.mp4",
      "/assets/videos/waterfall2.mp4",
      "/assets/videos/test-video-7.mp4",
      "/assets/videos/vreel-vid.mp4",
    ].map((e) => {
      return {
        id: "item-1",
        renderItem: (
          <ReactPlayer
            playing={true}
            muted={true}
            url={e}
            //   url="/assets/videos/test-video-3.mp4"
            playsinline={false}
            config={{
              file: {
                attributes: {
                  autoPlay: false,
                  playsInline: false,
                  muted: true,
                  type: "video",
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -2,
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                  },
                },
              },
            }}
          />
        ),
      };
    }),
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <ReactPlayer
        playing={true}
        muted={true}
        // url="/assets/videos/waterfall.mp4"
        url="/assets/videos/test-video-3.mp4"
        playsinline={false}
        config={{
          file: {
            attributes: {
              autoPlay: false,
              playsInline: false,
              muted: true,
              type: "video",
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -2,
                height: "100%",
                width: "100%",
                objectFit: "cover",
              },
            },
          },
        }}
      />
    </div>
  );
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {carouselFragment}
    </div>
  );
};

export default Test2;
