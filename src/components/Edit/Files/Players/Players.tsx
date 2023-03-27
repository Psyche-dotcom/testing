import { RootState } from "@redux/store/store";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import Styles from "./Players.module.scss";

type Props = {
  mobilePreview?: boolean;
};

const Players = ({ mobilePreview }: Props) => {
  const { showPreviewInitialState } = useSelector(
    (state: RootState) => state.expandMenu
  );

  return (
    <>
      {showPreviewInitialState.type === "image" && (
        <img
          src={showPreviewInitialState.payload}
          alt="Images"
          className={Styles.imgSizing}
        />
      )}

      <div className={Styles.players}>
        {showPreviewInitialState.type === "video" && (
          <ReactPlayer
            url={showPreviewInitialState.payload}
            playing={mobilePreview ? mobilePreview : false}
            controls={true}
            light={true}
            muted={mobilePreview ? mobilePreview : true}
            width="100%"
            height="100%"
          />
        )}
        {showPreviewInitialState.type === "audio" && (
          <ReactPlayer
            url={showPreviewInitialState.payload}
            playing={mobilePreview ? mobilePreview : false}
            controls
            muted={mobilePreview ? mobilePreview : false}
          />
        )}
      </div>
    </>
  );
};

export default Players;
