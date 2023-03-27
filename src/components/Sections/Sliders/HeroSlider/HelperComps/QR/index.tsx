import clsx from "clsx";
import { useSelector } from "react-redux";
import { QRCode } from "react-qrcode-logo";
import { expandInfo, expandQR } from "src/redux/createSlice/createMenuSlice";
import { RootState, useAppDispatch } from "src/redux/store/store";
import Sheet, { SheetRef } from "react-modal-sheet";
import Styles from "./QR.module.scss";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SliderCrossButton from "@shared/Buttons/SliderCrossButton/SliderCrossButton";
import QrCodePage from "./QRCodePage";

const QR: React.FC = () => {
  const state = useSelector((state: RootState) => state.expandMenu.initQRState);
  const dispatch = useAppDispatch();
  const ref = useRef<SheetRef>();
  // const snapTo = (i: number) => ref.current?.snapTo(i);
  const router = useRouter();
  const base = `${process.env.NEXT_PUBLIC_SITE_BASE_URL}${router.asPath.split("?")[0]}`;

  const { current } = useSelector((state: RootState) => state.vreel);
  const [contentUrl, setContentUrl] = useState("");
  useEffect(() => {
    setContentUrl(`${base}?section=${current.section}&slide=${current.slide}`);

  }, [current])
  return (
    <Sheet
      ref={ref}
      isOpen={state}
      onClose={() => { }}
      onSnap={(snapIndex) => { }
      }
      draggable={true}
    >
      <Sheet.Container onViewportBoxUpdate={() => { }}>
        <Sheet.Content onViewportBoxUpdate={() => { }}>
          <div
            className={clsx(
              Styles.qr,
              state ? Styles.qr__show : Styles.qr__hidden
            )}
          >
            <div className={Styles.content}>
              {/* <button
                onClick={() => dispatch(expandQR())}
                className={Styles.bar__icon}
              ></button> */}

              <SliderCrossButton
                position="absolute"
                top={1}
                right={1}
                method={() => dispatch(expandQR())}
              />

              <h2 className={Styles.qr__title}>Scan Me</h2>
              <div className={Styles.qr__imageWrapper}>
                {/* <img src='/assets/images/female.png' alt='' /> */}
                {/* <QrCode url={base + router.asPath} /> */}

                <QrCodePage dataUrl={contentUrl} />
              </div>

              {/* <div className={Styles.content__logo}>
                <button>Download QR</button>
                <img
                  src="/assets/icons/vreel-powered.svg"
                  alt="Powered By VReel"
                />
              </div> */}
            </div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};

export default QR;

export function QrCode(props) {
  const ref = useRef(null);
  const defaultOptions = {
    ecLevel: "M",
    enableCORS: false,
    size: 283,
    quietZone: 10,
    bgColor: "#FFFFFF",
    fgColor: "#000000",
    logoImage:
      "https://res.cloudinary.com/klwebco/image/upload/v1655087042/Frame_50254_ag47l8.png",
    logoWidth: 50,
    logoHeight: 50,
    logoOpacity: 1,
    qrStyle: "squares",
    eyeRadius: [
      [0, 10, 10, 10], // top/left eye
      [10, 0, 10, 10], // top/right eye
      [10, 10, 10, 0], // bottom/left
    ],
  };

  const options = { ...defaultOptions, ...props.options };
  function test() {
    (document.getElementById("react-qrcode-logo") as HTMLCanvasElement);
  }

  return (
    <div
      onClick={() => {
        test();
      }}
    >
      <QRCode
        crossorigin="anonymous"
        enableCORS={true}
        ref={ref}
        value={props.url}
        {...options}
      />
    </div>
  );
}
