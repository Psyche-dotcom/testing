const React = require("react");
const Uppy = require("@uppy/core");
const Tus = require("@uppy/tus");
const GoogleDrive = require("@uppy/google-drive");
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import XHRUpload from "@uppy/xhr-upload";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
const { Dashboard, DashboardModal } = require("@uppy/react");
const Dropbox = require("@uppy/dropbox");
const Instagram = require("@uppy/instagram");
const Url = require("@uppy/url");
const Webcam = require("@uppy/webcam");
import AwsS3 from "@uppy/aws-s3";
const UploadImagesModal = ({ setOpenModel, openModel, refetch }) => {
  const [cookies] = useCookies(["userAuthToken"]);

  const uppy = new Uppy({ id: "uppy", autoProceed: false, debug: true })
    .use(XHRUpload, {
      // endpoint: process.env.NEXT_PUBLIC_MEDIA_BASE_URL,
      endpoint: `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/upload?token=${cookies["userAuthToken"]}`,
      fieldName: "content",
      formData: true,
      headers: {
        token: cookies["userAuthToken"],
      },
    })
    .use(GoogleDrive, { companionUrl: "https://companion.uppy.io", })
    .use(Dropbox, { companionUrl: "https://companion.uppy.io" })
    .use(Instagram, { companionUrl: "https://companion.uppy.io" })
    .use(Url, { companionUrl: "https://companion.uppy.io" })
    .use(Webcam, {
      mirror: true,
      facingMode: "user",
      showRecordingLength: true,
    });

  uppy.on("complete", (result) => {
    refetch();
    setOpenModel(close);
    result.successful.map((res) => {
      toast.success(`Upload ${res.type} successfully`);
    });
  });

  return (
    <div style={{ color: "black" }}>
      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        open={openModel}
        onRequestClose={async () => {
          setOpenModel(false);
        }}
      />
      {/* <Dashboard
        uppy={uppy}
        plugins={["GoogleDrive", "Dropbox", "Instagram", "Url", "Webcam"]}
        metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
      /> */}
    </div>
  );
};

export default UploadImagesModal;
