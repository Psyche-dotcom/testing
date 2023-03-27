import clsx from "clsx";
import { useRef } from "react";
import Sheet, { SheetRef } from "react-modal-sheet";
import { useSelector } from "react-redux";
import { expandInfo } from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Styles from "./Info.module.scss";
import * as FaIcons from "react-icons/fa";

const Info: React.FC = () => {
  const state = useSelector(
    (state: RootState) => state.expandMenu.initInfoState
  );
  const dispatch = useAppDispatch();
  const ref = useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  const slideCredits = [
    {
      name: "Robert Johnson",
      designation: "Executive Producer",
      img: "/assets/images/female.png",
    },
    {
      name: "David Henry",
      designation: "Videographer",
      img: "/assets/images/female.png",
    },
  ];
  const collaborators = [
    {
      name: "Apple",
      designation: "Retailer",
      img: "/assets/images/female.png",
    },
    {
      name: "Hi-Cone",
      designation: "Retailer",
      img: "/assets/images/female.png",
    },
  ];

  return (
    <Sheet
      ref={ref}
      isOpen={state}
      onClose={() => { }}
      snapPoints={[600, 400, 200, 100, 0]}
      initialSnap={2}
      onSnap={(snapIndex) => { }
      }
    >
      <Sheet.Container onViewportBoxUpdate={() => { }}>
        <Sheet.Content onViewportBoxUpdate={() => { }}>
          <div
            className={clsx(
              Styles.info,
              state ? Styles.info__show : Styles.info__hidden
            )}
          >
            <div className={Styles.content}>
              <div className={Styles.content__header}>
                <h5>More Info</h5>
                <span onClick={() => dispatch(expandInfo())}></span>
              </div>

              <div className={Styles.credits}>
                <span className={Styles.credits__title}>
                  Background Audio Credits
                </span>
                <span className={Styles.credits__subTitle}>Playing Now</span>
                <h4 className={Styles.credits__playingNow}>
                  <span>
                    <FaIcons.FaPlay />
                  </span>
                  <span>Eric Roberson-Lessons</span>
                </h4>
              </div>

              <div className={clsx(Styles.content__body)}>
                <h3 className={clsx(Styles.title)}>Think Circular</h3>
                <h6 className={clsx(Styles.subTitle)}>Save the planet</h6>
                <p className={clsx(Styles.details)}>
                  Avangard Innovative working hand and hand <br /> with comanies
                  around the clock to save the <br /> planet and make the world
                  a better place
                </p>

                <div className={Styles.gallery}>
                  <h6 className={Styles.gallery__title}>Slide Credits</h6>

                  <div className={Styles.gallery__wrapper}>
                    {slideCredits.map((obj, index) => (
                      <div key={index} className={Styles.card}>
                        <img src={obj.img} alt={obj.name} />

                        <div>
                          <span className={Styles.designation}>
                            {obj.designation}
                          </span>
                          <span className={Styles.name}>{obj.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={Styles.gallery}>
                  <h6 className={Styles.gallery__title}>Collaborators</h6>

                  <div className={Styles.gallery__wrapper}>
                    {collaborators.map((obj, index) => (
                      <div key={index} className={Styles.card}>
                        <img src={obj.img} alt={obj.name} />

                        <div>
                          <span className={Styles.designation}>
                            {obj.designation}
                          </span>
                          <span className={Styles.name}>{obj.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={clsx(Styles.content__footer)}>
                <img
                  src="/assets/icons/vreel-powered.svg"
                  alt="Vreel Powered icon"
                />
              </div>
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default Info;
