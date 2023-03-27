import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling, {
  Options as QRCodeStylingOptions,
  FileExtension,
  Options,
  TypeNumber,
  Mode,
  DrawType,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
} from "qr-code-styling";
import Styles from "./QRCodePage.module.scss";
import { useQRCodeStyling } from "@hooks/useQUCodeStyling";

const options: Options = {
  width: 300,
  height: 300,
  type: "svg" as DrawType,
  data: "http://qr-code-styling.com",
  // image:
  //   "https://res.cloudinary.com/klwebco/image/upload/v1655087042/Frame_50254_ag47l8.png",
  margin: 10,
  qrOptions: {
    typeNumber: 0 as TypeNumber,
    mode: "Byte" as Mode,
    errorCorrectionLevel: "Q" as ErrorCorrectionLevel,
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 20,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    color: "#222222",
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
    // },
    type: "square" as DotType,
  },
  backgroundOptions: {
    color: "#ffffff",
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 0,
    //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
    // },
  },
  cornersSquareOptions: {
    color: "#222222",
    type: "square" as CornerSquareType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
    // },
  },
  cornersDotOptions: {
    color: "#222222",
    type: "" as CornerDotType,
    // gradient: {
    //   type: 'linear', // 'radial'
    //   rotation: 180,
    //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
    // },
  },
};

const QrCodePage: React.FC<{ dataUrl: string }> = ({ dataUrl }) => {
  const [url, setUrl] = useState(dataUrl);
  const [fileExt, setFileExt] = useState<FileExtension | undefined>("png");
  // const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));
  const qrCode = useQRCodeStyling(options);
  const ref = useRef<any>(null);
  useEffect(() => {
    qrCode?.append(ref.current);
  }, [ref, qrCode]);
  useEffect(() => {
    qrCode?.update({ data: url });
  }, [url, qrCode]);
  const onUrlChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (
    event
  ) => {
    event.preventDefault();
    setUrl(event.target.value);
  };
  const onExtensionChange:
    | React.ChangeEventHandler<HTMLSelectElement>
    | undefined = (event) => {
    setFileExt(event.target.value as FileExtension);
  };
  const onDownloadClick = () => {
    qrCode?.download({ extension: fileExt });
  };
  return (
    <div className={Styles.container}>
      <div ref={ref} />
      <div className={Styles.container__bottom}>
        <button onClick={onDownloadClick}>Download</button>
        <img src="/assets/icons/vreel-powered.svg" alt="Powered By VReel" />
      </div>
    </div>
  );
};
export default QrCodePage;
