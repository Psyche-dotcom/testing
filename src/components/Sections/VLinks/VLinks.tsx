import React, { useState } from "react";
import { useGroupData } from "../../../hooks/useGroupData";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { SwiperSlide } from "swiper/react";
import Styles from "./VLinks.module.scss";
import { EventsDataTypes } from "../../Shared/Types/BottomSheetDataTypes";
import clsx from "clsx";
import SwiperContainer from "@shared/SwiperContainer/SwiperContainer";
import SectionContainer from "@sections/SectionContainer/SectionContainer";
import { Data } from "./VLinksData";
import VLinksModal from "./VLinksModal";
import { useRouter } from "next/router";

const VLinks: React.FC<{ parentSwiper?: any }> = ({ parentSwiper }) => {
  const { height } = useWindowDimensions();
  const data = useGroupData(Data, height < 500 ? 2 : 4);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0);
  const router = useRouter();

  return (
    <SectionContainer title="VLinks" parentSwiper={parentSwiper}>
      {open && <VLinksModal id={id} setOpen={setOpen} />}
      <SwiperContainer>
        {data.map((obj, index) => (
          <SwiperSlide key={index}>
            <div className={Styles.vLinks}>
              {obj.map((item: EventsDataTypes, index: number) => (
                <div key={index} className={Styles.vLinks__slide}>
                  <div className={clsx(Styles.vLinks__slide__container)}>
                    <div
                      className={clsx(
                        Styles.vLinks__slide__container__imgContainer,
                        index % 2 === 0
                          ? Styles.vLinks__slide__container__orderFrist
                          : Styles.vLinks__slide__container__orderLast
                      )}
                    >
                      <img src={item.thumbnail} alt="Events Images" />
                    </div>
                    <div
                      className={clsx(
                        Styles.vLinks__slide__container__vLinksTextContainer,
                        index % 2 !== 0
                          ? Styles.vLinks__slide__container__orderFrist
                          : Styles.vLinks__slide__container__orderLast
                      )}
                    >
                      <div
                        className={
                          Styles.vLinks__slide__container__vLinksTextContainer__vLinksTexts
                        }
                      >
                        <h4>{item.link_header}</h4>
                      </div>
                      <div
                        className={
                          Styles.vLinks__slide__container__vLinksTextContainer__btnContainer
                        }
                      >
                        <p>{item.link_sub_header}</p>
                        <div
                          className={
                            Styles.vLinks__slide__container__vLinksTextContainer__btnContainer__btn
                          }
                        >
                          <button
                            onClick={() => {
                              setOpen(true);
                              setId(item.id);
                            }}
                            className={
                              Styles.vLinks__slide__container__vLinksTextContainer__btnContainer__btn__readMore
                            }
                          >
                            Read More
                          </button>
                          <button>Become a Partner</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </SectionContainer>
  );
};

export default VLinks;
