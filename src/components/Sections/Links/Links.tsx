import React, { useRef, useState } from "react";
import Styles from "./Links.module.scss";

import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useWindowDimensions from "@hooks/useWindowDimensions";

import { useGroupData } from "src/hooks/useGroupData";
import SectionContainer from "../SectionContainer/SectionContainer";
import Link from "next/link";
import SwiperContainer from "@shared/SwiperContainer/SwiperContainer";

const Links: React.FC<{
  parentSwiper: any;
  links: any;
  header: string;
  displayOptions: any;
}> = ({ parentSwiper, links, header, displayOptions }) => {
  const { height, width } = useWindowDimensions();
  const Data = useGroupData(links, height < 640 && width < 380 ? 4 : 6);
  // const tags = Array.from(new Set(links.map((e: any) => e.tag)));
  return (
    <SectionContainer
      displayOptions={displayOptions}
      title={header}
      parentSwiper={parentSwiper}
    >
      {/* <div className={clsx("sheetSlider", Styles.LinksContainer)}> */}
      {/* <div className={Styles.filter}>
          {["all", ...tags].map((e: string, index: number) => (
            <span
              key={index}
              onClick={() => setfiler(e)}
              className={Styles.filter__item}
              style={{
                borderBottom: e == filter ? "1px solid white" : "",
              }}
            >
              {e}
            </span>
          ))}
        </div> */}
      <SwiperContainer>
        {Data.map((obj: any, index: number) => (
          <SwiperSlide key={index}>
            <div className={Styles.container}>
              <div className={Styles.container__content}>
                {obj.map((item: any) => (
                  <div className={Styles.container__content__slide}>
                    <div
                      className={Styles.container__content__slide__imgContent}
                    >
                      <Link href={item.url}>
                        <a target="_blank">
                          <img src={item.thumbnail} alt="Links Images" />
                        </a>
                      </Link>
                    </div>
                    <div
                      className={Styles.container__content__slide__textContent}
                    >
                      <Link href={item.url}>
                        <a style={{ textAlign: "center" }} target="_blank">
                          {item.link_header}
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </SectionContainer>
  );
};

export default Links;
