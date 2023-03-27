import React, { useState } from "react";
import AwsS3 from "@uppy/aws-s3";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");
const { DashboardModal } = require("@uppy/react");
const GoogleDrive = require("@uppy/google-drive");
const Dropbox = require("@uppy/dropbox");
const Instagram = require("@uppy/instagram");
const Url = require("@uppy/url");
const Webcam = require("@uppy/webcam");

const UppyModal = ({ open, setOpen }) => {
  const [cookies] = useCookies(["userAuthToken"]);

  const uppy = new Uppy({ id: "uppy", autoProceed: false, debug: true })
    .use(AwsS3, {
      limit: 2,
      timeout: 600,
      companionUrl: "https://uppy-companion.myapp.com/",
    })
    .use(Tus, {
      // endpoint: process.env.NEXT_PUBLIC_MEDIA_BASE_URL,
      endpoint:
        "https://nicoledennisbenn.s3.amazonaws.com/hello?Content-Type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZ5AO4IXHPJXNNR5W%2F20220718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220718T202346Z&X-Amz-Expires=600&X-Amz-Signature=3f9b9cd2eeebff4485fc76a79b16c490683bf08d695237e6b60c4f48af30fa78&X-Amz-SignedHeaders=host",
      /*  headers: {
        token: cookies["userAuthToken"],
        "Access-Control-Allow-Origin": "http://localhost:7070",
        "Access-Control-Allow-Headers": "*",
        // "Access-Control-Request-Headers": "*"
      }, */
      headers: {
        "Content-type": "image/jpeg",
        "Access-Control-Allow-Origin": "*",
      },
      removeFingerprintOnSuccess: true,
    })
    .use(GoogleDrive, { companionUrl: "https://companion.uppy.io" })
    .use(Dropbox, { companionUrl: "https://companion.uppy.io" })
    .use(Instagram, { companionUrl: "https://companion.uppy.io" })
    .use(Url, { companionUrl: "https://companion.uppy.io" })
    .use(Webcam, {
      mirror: true,
      facingMode: "user",
      showRecordingLength: true,
    });

  uppy.on("complete", (result) => {
    // refetch();
    result.successful.map((res) => {
      toast.success(`Upload ${res.type} successfully`);
    });
  });
  return (
    <div>
      <DashboardModal
        uppy={uppy}
        open={open}
        plugins={[
          "GoogleDrive",
          "Dropbox",
          "Instagram",
          "ScreenCapture",
          "Url",
          "Webcam",
        ]}
        // target={document.body}
        onRequestClose={() => setOpen(false)}
      />
    </div>
  );
};

export default UppyModal;
