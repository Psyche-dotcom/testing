import MainContainer from "@sections/MainContainer/MainContainer";
import React from "react";
import Styles from "./VLinksModal.module.scss";
import { Data } from "../VLinks/VLinksData";
import { EventsDataTypes } from "@shared/Types/BottomSheetDataTypes";
import { IoIosCloseCircleOutline } from "react-icons/io";

const VLinksModal = ({ setOpen, id }) => {
  const item = Data.find((obj: EventsDataTypes, index) => obj.id === id);

  return (
    <MainContainer>
      <div className={Styles.vLinksModal}>
        <div className={Styles.vLinksModal__vLinksModalContainer}>
          <button
            onClick={() => setOpen(false)}
            className={Styles.vLinksModal__vLinksModalContainer__icons}
          >
            <IoIosCloseCircleOutline />
          </button>
          <div className={Styles.vLinksModal__vLinksModalContainer__content}>
            <div
              className={
                Styles.vLinksModal__vLinksModalContainer__content__imgContainer
              }
            >
              <img src={item.thumbnail} alt="VLinks Images" />
            </div>
            <div
              className={
                Styles.vLinksModal__vLinksModalContainer__content__textContainer
              }
            >
              <div
                className={
                  Styles.vLinksModal__vLinksModalContainer__content__textContainer__text
                }
              >
                <h4>{item.link_header}</h4>
              </div>
              <div
                className={
                  Styles.vLinksModal__vLinksModalContainer__content__textContainer__btnContainer
                }
              >
                <p>{item.link_sub_header}</p>
                <div
                  className={
                    Styles.vLinksModal__vLinksModalContainer__content__textContainer__btnContainer__btn
                  }
                >
                  <button
                    onClick={() => setOpen(false)}
                    className={
                      Styles.vLinksModal__vLinksModalContainer__content__textContainer__btnContainer__btn__readMore
                    }
                  >
                    Read Less
                  </button>
                  <button>Become a Partner</button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={Styles.vLinksModal__vLinksModalContainer__description}
          >
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, quia
              ut exercitationem esse soluta, adipisci aperiam consequuntur at
              labore nisi autem ratione voluptas a dolorem molestiae ipsa,
              dolore expedita quasi?
            </p>
          </div>

          <div className={Styles.vLinksModal__vLinksModalContainer__logo}>
            <img src="/assets/icons/Vreel_logo_small.svg" alt="Vreel Logo" />
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default VLinksModal;
