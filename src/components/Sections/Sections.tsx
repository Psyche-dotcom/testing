import React, {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Swiper, SwiperProps, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay, Mousewheel, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import dynamic from "next/dynamic";
import Links from "./Links/Links";
import Socials from "./Socials/Socials";
import Contribute from "./Contribute/Contribute";
import MusicLinks from "./MusicLinks/MusicLinks";
import GallerySlider from "./Sliders/GallerySlider/GallerySlider";
import { useRouter } from "next/router";
import { Loader } from "@shared/Loader/Loader";
import MainContainer from "./MainContainer/MainContainer";
import HeroSlider from "./Sliders/HeroSlider/HeroSlider";
import CustomHead from "@shared/meta/MetaTags";
import EmbedSection from "./Embed";
import SectionContainer from "./SectionContainer/SectionContainer";
import useAudio from "@hooks/useAudio";
import useFonts from "@hooks/useFonts";
import { useDispatch } from "react-redux";
import { setActiveSection } from "@redux/createSlice/presentation";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";
import { type } from "os";
import { setCurrent } from "@redux/createSlice/vreelSlice";
import { controller, UnmountController } from "src/controller";
import UsageTelementryController from "src/controller/modules/usage";

export let gmenu = [];
export let sp = null;

const Sections: React.FC<{
  vreel: any;
  user?: any;
  enterprise?: any;
  username: string;
}> = ({ vreel, user, enterprise }) => {
  if (!controller) {
    return "NO";
  }
  const UsageController = useMemo(() => {
    return new UsageTelementryController(
      {
        username,
        pageId: vreel.id,
      },
      10000
    );
  }, []);

  const router = useRouter();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
  const { username, section, employee } = router?.query;
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sectionStack, setSectionStack] = useState<string[]>([]);
  const sections = useMemo(() => {
    return controller?.getSections() || [];
  }, [sectionStack, isMobile]);

  function setStack(list) {
    setSectionStack(list);
  }
  useEffect(() => {
    controller?.onWindowResize(isMobile);
  }, [isMobile]);

  useEffect(() => {
    console.log("@stack updated!", sectionStack);
  }, [sectionStack]);
  useEffect(() => {
    controller.setRerenderListener(setStack);
  }, []);

  const path = useRef(router.asPath);

  const audioType = vreel?.display_options?.audio_type;

  useEffect(() => {
    const backgroundAudioUrl = vreel?.display_options?.background_audio;
    controller.setBackgroundAudioSource({
      src: backgroundAudioUrl,
      audioType: audioType,
    });
  }, []);
  const [slides, setSlides] = useState([]);
  const { fonts, setFonts } = useFonts([]);
  const [mute, setMute] = useState<boolean>(true);
  const [slidesState, setSlidesState] = useState({});
  const { activeSectionId } = useSelector(
    (state: RootState) => state.presentation
  );
  const [queryFields, setQueryFields] = useState({
    section: router.query.section || "",
    slide: router.query.slide || "",
  });
  const dispatch = useDispatch();
  let sectionMap = {};
  const name = `${user?.prefix ? user?.prefix + " " : ""}${
    user?.first_name ? user?.first_name + " " : ""
  }${user?.middle_initial ? user?.middle_initial + " " : ""}${
    user?.last_name ? user?.last_name + " " : ""
  }${user?.suffix ? user?.suffix + " " : ""}`;

  const employeeSlide = employee
    ? {
        id: user.id,
        slide_location: 0,
        logo_visible: true,
        logo_uri: vreel.display_options?.default_logo,
        content_type: "",

        uri: "",
        title: {
          header: name,
          description: user?.job_title,
        },
        advanced: {
          background_audio_url: "",
          header:
            "We make you look better! Our Web3 interface curates and displays your story amazingly.",
        },
        mobile: {
          start_time: 0,
          stop_time: 0,
          background_audio_uri: "",
          uri:
            user.selfPortraitImage !== ""
              ? user.selfPortraitImage
              : enterprise?.default_portrait,
          content_type: "image",
        },
        desktop: {
          start_time: 0,
          stop_time: 0,
          background_audio_uri: "",
          uri:
            user.selfLandscapeImage !== ""
              ? user.selfLandscapeImage
              : enterprise?.default_landscape,
          content_type: "image",
        },
        cta_position: user?.employee_metadata?.cta_position,
        cta1: user?.employee_metadata?.cta1,
        cta2: user?.employee_metadata?.cta2,
        cta3: user?.employee_metadata?.cta3,
        cta4: user?.employee_metadata?.cta4,
        contact_visible: user?.employee_metadata?.contact_visible,
        share_visible: user?.employee_metadata?.share_visible,
        qrcode_visible: user?.employee_metadata?.qrcode_visible,
        profile_picture: user?.employee_metadata?.display_profile_image
          ? user?.profilePicture
          : "",
        is_employee: true,
        job_description: user?.employee_metadata?.job_description,
        company_name: enterprise.companyName,
      }
    : null;

  useEffect(() => {
    controller.setUsageController(UsageController);
    console.log("::employe", employeeSlide);
    const menuItems = controller.setVreel(vreel, employeeSlide as any);
    gmenu = menuItems;

    return () => {
      UnmountController();
    };
  }, []);

  useEffect(() => {
    const { slide, section } = router.query;
    controller.navigateFromParams(section as string, slide as string);
  }, []);

  function handleViewResize() {
    setIsMobile(window.innerWidth < 500);
  }
  useEffect(() => {
    window.addEventListener("resize", handleViewResize);
    return () => {
      window.removeEventListener("resize", handleViewResize);
    };
  }, []);

  useEffect(() => {
    if (swiper) controller.setSwiper(swiper);
  }, [swiper]);

  useEffect(() => {
    const fonts = [];
    const options = vreel?.display_options;
    if (!options) return;
    if (options.slide?.title?.uri) {
      fonts.push({
        uri: options?.slide?.title?.uri,
        fontFace: options?.slide?.title?.family,
      });
    }
    if (options.slide?.description?.uri) {
      fonts.push({
        uri: options?.slide?.description?.uri,
        fontFace: options?.slide?.description?.family,
      });
    }
    if (options.slide?.button?.uri) {
      fonts.push({
        uri: options?.slide?.button?.uri,
        fontFace: options?.slide?.button?.family,
      });
    }

    if (options?.sections?.title?.uri) {
      fonts.push({
        uri: options?.sections?.title?.uri,
        fontFace: options?.sections?.title?.family,
      });
    }
    if (options.sections?.description?.uri) {
      fonts.push({
        uri: options?.sections?.description?.uri,
        fontFace: options?.sections?.description?.family,
      });
    }
    if (options.slide?.button?.uri) {
      fonts.push({
        uri: options?.sections?.button?.uri,
        fontFace: options?.sections?.button?.family,
      });
    }

    fonts.push({
      uri:
        options?.sections?.header?.uri ||
        "http://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJDUc1NECPY.ttf",
      fontFace: "headerFont",
    });

    setFonts(fonts);
  }, []);

  useEffect(() => {
    if (!activeSectionId) return;
    if (activeSectionId?.toString().toLocaleLowerCase() === "slides") {
      swiper?.slideTo(0);
      return;
    }
    const index = sectionMap[activeSectionId];
    if (index) swiper?.slideTo(index);
  }, [activeSectionId]);

  useEffect(() => {
    dispatch(setCurrent(queryFields));
  }, [queryFields]);
  const swiperRef = useRef(null);

  function startVideoOnSecondSlide() {
    const swiper = swiperRef.current.swiper;
    if (swiper.activeIndex === 1) {
      const video = document.querySelector(".swiper-slide:nth-child(2) video");

      if (video) {
        video.play();
      }
    }
  }
  return (
    <div id="vreel-content">
      <Swiper
        modules={[Pagination, Autoplay, Mousewheel, Navigation]}
        slidesPerView={1}
        mousewheel={true}
        lazy={true}
        speed={300}
        direction={"vertical"}
        style={{ height: window.innerHeight + "px" }}
        onSlideChange={(s) => {
          setActiveIndex(s.activeIndex);

          let activeSectionId;

          setCurrentSlide(s.realIndex);
          if (s.activeIndex === 0) {
            setQueryFields((prev) => ({ ...prev, section: null }));
            return;
          }
          for (const [key, val] of Object.entries(sectionMap)) {
            if (val === s.activeIndex) {
              activeSectionId = key;
              if (activeSectionId) {
                setQueryFields((prev) => ({
                  ...prev,
                  section: activeSectionId,
                }));

                // Call startVideoOnSecondSlide function when user swipes from the first slide
                if (swiperRef.current.swiper.activeIndex === 0) {
                  startVideoOnSecondSlide();
                }

                return;
              }
              return;
            }
          }
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setSwiper(swiper);
        }}
      >
        {sections.map(({ id, Section }, idx) => (
          <div key={id}>{Section}</div>
        ))}
      </Swiper>
    </div>
  );
};

export default Sections;
