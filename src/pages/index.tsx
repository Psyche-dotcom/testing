import { useQuery } from "@apollo/client";
import { GET_USER_BY_USER_NAME } from "@graphql/query";
import Section from "@sections/Section";
import HeroSlide from "@sections/Sliders/HeroSlider/HeroSlide/HeroSlide";
import HeroSlider from "@sections/Sliders/HeroSlider/HeroSlider";
import { Loader } from "@shared/Loader/Loader";
import { GetServerSideProps } from "next";
import { useState } from "react";

import Sections from "src/components/Sections/Sections";

export const vreel = {
  author: "can7os223akuve30qlgg",
  elements: {
    socials: {
      header: "",
      position: 5,
      socials: [
        {
          platform: "twitter",
          username: "vreel",
        },
      ],
    },
    videos: {
      header: "",
      position: 3,
      videos: [
        "https://res.cloudinary.com/klwebco/video/upload/v1656836002/samples/test-video-5_m2wxg1.mp4",
        "/assets/videos/test-video-1.mp4",
        "/assets/videos/test-video-2.mp4",
        /*    "/assets/videos/test-video-3.mp4",
        "/assets/videos/test-video-4.mp4",
        "/assets/videos/test-video-5.mp4",
        "/assets/videos/test-video-6.mp4",
        "/assets/videos/waterfall2.mp4",
        "/assets/videos/test-video-7.mp4",
        "/assets/videos/vreel-vid.mp4", */
      ].map((e) => {
        return {
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
    },
    gallery: {
      header: "",
      position: 4,
      images: [1, 2, 3, 4, 5].map((e) => {
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
            link_type: "",
            link_url: "/register",
          },
          cta2: {
            link_header: "Login",
            link_type: "",
            link_url: "/login",
          },
        };
      }),
      hidden: false,
    },
    simple_links: {
      header: "",
      position: 1,
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
    {
      url: "https://vreel-page.s3.amazonaws.com/Gucci+Resort+Collection-1080p+(1).mp4",
      content_type: "video",
    },
    {
      url: "https://vreel.page/users/avangardinnovative/videos/aiexplainer_optimized.mp4",
      content_type: "video",
    },
    {
      url: "https://staging.vreel.page/files/04923aaa9dbb37bd49b050bde398ecec",
      content_type: "video/mp4",
    },
    {
      url: "https://shaktisinghcheema.com/wp-content/uploads/2019/10/Laptop-63.mp4",
      content_type: "video/mp4",
    },
    {
      url: "https://res.cloudinary.com/klwebco/video/upload/v1656836002/samples/test-video-5_m2wxg1.mp4",
      content_type: "video/mp4",
    },

    {
      url: "https://res.cloudinary.com/klwebco/video/upload/v1656835997/samples/test-video-1_edlvu6.mp4",
      content_type: "video/mp4",
    },
    {
      url: "https://res.cloudinary.com/klwebco/video/upload/v1656835999/samples/test-video-2_sjox9x.mp4",
      content_type: "video/mp4",
    },
    {
      url: "https://res.cloudinary.com/klwebco/image/upload/v1655998234/test-image_1_nhb5cc.jpg",
      content_type: "image/jpeg",
    },

    //   url: "https://res.cloudinary.com/klwebco/image/upload/v1645686800/samples/sheep.jpg",
    //   content_type: "image",
    // },

    // "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
    // "https://res.cloudinary.com/klwebco/video/upload/v1645686813/samples/elephants.mp4",
    // "/assets/videos/test-video-1.mp4",
    /*     "/assets/videos/test-video-2.mp4",
    "/assets/videos/test-video-3.mp4",
    "/assets/videos/test-video-4.mp4",
    "https://res.cloudinary.com/klwebco/video/upload/v1645686811/samples/sea-turtle.mp4",
    "/assets/videos/test-video-5.mp4",
    "/assets/videos/test-video-6.mp4",
    "/assets/videos/waterfall2.mp4",
    "/assets/videos/test-video-7.mp4",
    "/assets/videos/vreel-vid.mp4", */
  ].map((e, index) => {
    return {
      id: e.url,
      slide_location: index,
      active: true,
      content_type: "",
      uri: "",
      title: {
        header: "VREEL™",
        description:
          "We make you look better! Our Web3 interface curates and displays your story amazingly.",
      },
      advanced: {
        header:
          "We make you look better! Our Web3 interface curates and displays your story amazingly.",
      },
      mobile: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri:
          index == 3
            ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
            : "",
        uri: e.url,
        content_type: e.content_type,
      },
      desktop: {
        start_time: 0,
        stop_time: 0,
        background_audio_uri:
          index == 1
            ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            : "",
        uri: e.url,
        content_type: e.content_type,
      },
      cta1: {
        link_header: "Sign Up",
        link_type: "",
        link_url: "/register",
      },
      cta2: {
        link_header: "Login",
        link_type: "",
        link_url: "/login",
      },
    };
  }),
};
const gucci = {
  author: "cb64dq223akrshkitkqg",
  logo_uri: "https://staging.vreel.page/files/e2444c33d95d58c9156f4cc150d4b973",
  elements: {
    simple_links: {
      header: "",
      position: 0,
      links: [
        {
          id: "cb8o3ca23akoj0csfep0",
          thumbnail:
            "https://staging.vreel.page/files/8eb2c95528e6da660a6a35c92538666a",
          link_header: "Gucci X Adidas",
          url: "https://www.gucci.com/us/en/st/capsule/adidas-gucci",
          link_type: "url",
          tag: "",
        },
        {
          id: "cb8o3hi23akoj0csfepg",
          thumbnail:
            "https://staging.vreel.page/files/a0c7c4f13732474a6187331800ac295a",
          link_header: "Gucci Lovelight",
          url: "https://www.gucci.com/us/en/st/capsule/gucci-lovelight",
          link_type: "url",
          tag: "",
        },
        {
          id: "cb8o3ni23akoj0csfeq0",
          thumbnail:
            "https://staging.vreel.page/files/a28b22e771a48d496269a498e67b3ba6",
          link_header: "Gucci Resort Collection",
          url: "https://www.gucci.com/us/en/st/capsule/gucci-resort-collection",
          link_type: "url",
          tag: "",
        },
        {
          id: "cb8o42i23akoj0csfer0",
          thumbnail:
            "https://staging.vreel.page/files/18940a079247234ff53cfa15b45923d8",
          link_header: "Gucci Client Services",
          url: "https://www.gucci.com/us/en/st/capsule/gifts-services",
          link_type: "url",
          tag: "",
        },
        {
          id: "cbb827a23aklkqtogqrg",
          thumbnail:
            "https://staging.vreel.page/files/73f7f2b2976c08f2f07475bdd28c8276",
          link_header: "Official Gucci Website",
          url: "www.gucci.com",
          link_type: "url",
          tag: "",
        },
        {
          id: "cbb89v223aklkqtogqs0",
          thumbnail:
            "https://staging.vreel.page/files/94a48c26984cf8886c098e580b1c9eed",
          link_header: "Gucci Oura Ring",
          url: "https://www.gucci.com/us/en/st/capsule/gucci-x-oura",
          link_type: "url",
          tag: "",
        },
      ],
    },
    socials: {
      header: "",
      position: 3,
      socials: [
        {
          platform: "instagram",
          username: "gucci",
        },
        {
          platform: "twitter",
          username: "gucci",
        },
        {
          platform: "facebook",
          username: "GUCCI",
        },
        {
          platform: "pinterest",
          username: "gucci",
        },
      ],
    },
    gallery: {
      header: "",
      position: 1,
      images: [
        {
          id: "cbbcgti23aklkqtogr10",
          hidden: false,
          position: null,
          mobile: {
            start_time: null,
            stop_time: null,
            background_audio_uri: null,
            uri: "https://staging.vreel.page/files/be08a6906a81d828ebcc05945d0974f8",
            content_type: "image/jpg",
          },
          desktop: {
            start_time: null,
            stop_time: null,
            background_audio_uri: null,
            uri: "https://staging.vreel.page/files/57406387c8935101eff2f5959159fa45",
            content_type: "image/jpg",
          },
          cta1: {
            link_header: "SHOP NOW",
            link_type: "url",
            link_url: "https://www.gucci.com/us/en/st/capsule/gucci-lovelight",
          },
          cta2: {
            link_header: "SEE MORE",
            link_type: "url",
            link_url: "https://www.gucci.com/us/en/",
          },
        },
        {
          id: "cbbcn3i23aklkqtogr20",
          hidden: false,
          position: null,
          mobile: {
            start_time: null,
            stop_time: null,
            background_audio_uri: null,
            uri: "https://staging.vreel.page/files/fc12ea4d668e953175eb6fd96622fbf3",
            content_type: "image/jpg",
          },
          desktop: {
            start_time: null,
            stop_time: null,
            background_audio_uri: null,
            uri: "https://staging.vreel.page/files/20a933ed9b7473cbd5436213e6f3c5b6",
            content_type: "image/jpg",
          },
          cta1: {
            link_header: "SHOP NOW",
            link_type: "url",
            link_url: "https://www.gucci.com/us/en/st/capsule/gucci-bloom",
          },
          cta2: {
            link_header: "SEE MORE",
            link_type: "url",
            link_url: "https://www.gucci.com/us/en/",
          },
        },
        {
          id: "cbbcpla23aklkqtogr2g",
          hidden: false,
          position: null,
          mobile: {
            start_time: null,
            stop_time: null,
            background_audio_uri: null,
            uri: "https://staging.vreel.page/files/3768836e49a665ff87937e3469a81b26",
            content_type: "image/jpg",
          },
          desktop: {
            start_time: null,
            stop_time: null,
            background_audio_uri: null,
            uri: "https://staging.vreel.page/files/08b413bd033aa0194c15e97fd13cf526",
            content_type: "image/jpg",
          },
          cta1: {
            link_header: "SHOP NOW",
            link_type: "url",
            link_url: "https://www.gucci.com/us/en/st/capsule/adidas-gucci",
          },
          cta2: {
            link_header: "SEE MORE",
            link_type: "url",
            link_url: "https://www.gucci.com/us/en/",
          },
        },
      ],
    },
    videos: {
      header: "",
      position: 2,
      videos: [],
    },
  },
  slides: [
    {
      id: "cb8ra1a23akoj0csfevg",
      slide_location: 4,
      active: true,
      content_type: "",
      uri: "",
      title: {
        header: "Gucci Pet Collection",
        description:
          "Gucci Pet Collection infuses the everyday with a magical aura.",
      },
      advanced: {
        header: "",
      },
      mobile: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/The+Gucci+Pet+Collection-1080p_Trim.mp4",
        content_type: "video/mp4",
      },
      desktop: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/The+Gucci+Pet+Collection-1080p_Trim.mp4",
        content_type: "video/mp4",
      },
      cta1: {
        link_header: "SHOP NOW",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/st/capsule/gucci-pet-collection",
      },
      cta2: {
        link_header: "EXPLORE GUCCI",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/",
      },
    },
    {
      id: "cb64dq223akrshkitkr0",
      slide_location: 1,
      active: true,
      content_type: "",
      uri: "",
      title: {
        header: "Gucci US",
        description:
          "A lineup of ready-to-wear and accessories from the latest collection.",
      },
      advanced: {
        header: "",
      },
      mobile: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/Exquisite+Gucci.mp4",
        content_type: "video/mp4",
      },
      desktop: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/Exquisite+Gucci.mp4",
        content_type: "video/mp4",
      },
      cta1: {
        link_header: "SHOP NOW",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/",
      },
      cta2: {
        link_header: "CLIENT SERVICES",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/st/capsule/gifts-services",
      },
    },
    {
      id: "cb8qvkq23akoj0csfeu0",
      slide_location: 1,
      active: true,
      content_type: "",
      uri: "",
      title: {
        header: "adidas x Gucci",
        description: "  ",
      },
      advanced: {
        header: "",
      },
      mobile: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/Gucci+x+Adidas.mp4",
        content_type: "video/mp4",
      },
      desktop: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/%5BBTCLOD.COM%5D+adidas+x+Gucci-1080p.mp4",
        content_type: "video/mp4",
      },
      cta1: {
        link_header: "SHOP NOW",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/st/capsule/adidas-gucci",
      },
      cta2: {
        link_header: "COLLECTION",
        link_type: "url",
        link_url: "https://staging.vreel.page/adidasxgucci",
      },
    },
    {
      id: "cb8r4c223akoj0csfeug",
      slide_location: 2,
      active: true,
      content_type: "",
      uri: "",
      title: {
        header: "Gucci Lovelight Collection",
        description:
          "The selection of women’s and men’s ready-to-wear, shoes, accessories, jewelry, eyewear, and lifestyle items echo the romantic narrative of the House.",
      },
      advanced: {
        header: "",
      },
      mobile: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/The+Gucci+Lovelight+Collection-1080p_Trim.mp4",
        content_type: "video/mp4",
      },
      desktop: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/The+Gucci+Lovelight+Collection-1080p_Trim.mp4",
        content_type: "video/mp4",
      },
      cta1: {
        link_header: "SHOP NOW",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/st/capsule/gucci-lovelight",
      },
      cta2: {
        link_header: "EXPLORE GUCCI",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/",
      },
    },
    {
      id: "cb8r7cq23akoj0csfev0",
      slide_location: 3,
      active: true,
      content_type: "",
      uri: "",
      title: {
        header: "Gucci Resort Collection",
        description:
          "The Gucci Resort Collection features a selection of items dedicated to renewed travel destinations, personalized with colors, trims and a leather tag unique to the location it represents.",
      },
      advanced: {
        header: "",
      },
      mobile: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/Gucci+Resort+Collection-1080p.mp4",
        content_type: "video/mp4",
      },
      desktop: {
        start_time: null,
        stop_time: null,
        background_audio_uri: "",
        uri: "https://vreel-page.s3.amazonaws.com/Gucci+Resort+Collection-1080p.mp4",
        content_type: "video/mp4",
      },
      cta1: {
        link_header: "SHOP NOW",
        link_type: "url",
        link_url:
          "https://www.gucci.com/us/en/st/capsule/gucci-resort-collection",
      },
      cta2: {
        link_header: "EXPLORE GUCCI",
        link_type: "url",
        link_url: "https://www.gucci.com/us/en/",
      },
    },
  ],
};
export default function Home() {
  // const router = useRouter();
  // const [currentSlide, setCurrentSlide] = useState(null);
  // const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: "vreel",
      metadata: {
        presentation: true
      }
    },
  });


  if (loading || error || !data) {
    return <Loader />;
  }


  return <Sections vreel={data.username.vreel} />;
  // return <Sections vreel={vreel} />;
}
