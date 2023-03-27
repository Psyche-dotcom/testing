import React, { useEffect, useRef, useState } from "react";

import QRCodeStyling, {
  Options as QRCodeStylingOptions,
  FileExtension,
} from "qr-code-styling";

const styles = {
  inputWrapper: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20,
  },
};

const qrOptions: QRCodeStylingOptions = {
  width: 300,
  height: 300,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
};

export const useQRCodeStyling = (
  options: QRCodeStylingOptions
): QRCodeStyling | null => {
  //Only do this on the client
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCodeStylingLib = require("qr-code-styling");
    const qrCodeStyling: QRCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};

const QrCodePage = () => {
  const [url, setUrl] = useState("https://cardstore.matrixdigital.com");
  const [fileExt, setFileExt] = useState<FileExtension | undefined>("png");
  const qrCode = useQRCodeStyling(qrOptions);
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
    <div className="m-3">
      <h1 className="text-lg text-medium">QR Codes</h1>
      <div className="my-5">
        <div style={styles.inputWrapper}>
          <input value={url} onChange={onUrlChange} style={styles.inputBox} />
          <select onChange={onExtensionChange} value={fileExt}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WEBP</option>
          </select>
        </div>
        <div ref={ref} />
      </div>
    </div>
  );
};

export default QrCodePage;
