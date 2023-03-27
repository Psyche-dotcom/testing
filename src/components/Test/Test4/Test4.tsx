import useWindowDimensions from "@hooks/useWindowDimensions";
import MainContainer from "@sections/MainContainer/MainContainer";
import SectionContainer from "@sections/SectionContainer/SectionContainer";
import SwiperContainer from "@shared/SwiperContainer/SwiperContainer";
import React, { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import Styles from "./Test4.module.scss";

const fakeData = [1, 2, 3, 4, 5, 6];
const Test4 = () => {
  const [data, setData] = useState(fakeData);
  const { height, width } = useWindowDimensions();
  const isMobile = height < 640 && width < 380;
  useEffect(() => {
    if (isMobile) {
      setData(fakeData.slice(1, 5));
    } else {
      setData(fakeData);
    }
  }, [isMobile]);


  return (
    <MainContainer>
      <SectionContainer title="Link">
        <SwiperContainer>
          {[1, 2].map(() => (
            <SwiperSlide>
              <div className={Styles.content}>
                {data.map((item) => (
                  <div className={Styles.card}>
                    <div className={Styles.card__Image}>
                      <img
                        src="https://images.unsplash.com/photo-1658191084280-69ca3f675c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                        alt=""
                      />
                    </div>
                    <div className={Styles.card__Content}>
                      Lorem ipsum dolor sit amet.
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </SwiperContainer>
      </SectionContainer>
    </MainContainer>
  );
};

export default Test4;
