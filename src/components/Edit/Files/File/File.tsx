import { setMediaSelector } from "@redux/createSlice/createMobileMediaSelector";
import React, { SyntheticEvent } from "react";
import { useDispatch } from "react-redux";

import FileInput from "../FileInput/FileInput";
import Styles from "./File.module.scss";

export const docTypes = ["pdf"];

const File = ({ userFiles }: any) => {
  const { loading, error, data, refetch } = userFiles || {};

  if (loading || error || !data) return <div>Loading...</div>;
  // console.log(data.getUserByToken.files.files);
  const dispatch = useDispatch();
  dispatch(setMediaSelector(data.getUserByToken.files.files));

  const images = data?.getUserByToken?.files.files
    .filter((e) => e.file_type.split("/")[0] == "image")
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}`,
      };
    });
  const videos = data?.getUserByToken?.files.files
    .filter((e) => e.file_type.split("/")[0] == "video")
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}`,
      };
    });
  const audios = data?.getUserByToken?.files.files
    .filter((e) => e.file_type.split("/")[0] == "audio")
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}`,
      };
    });

  const docs = data?.getUserByToken?.files.files
    .filter((e) => docTypes.includes(e.file_type.split("/")[1]))
    .map((e) => {
      return {
        id: e.id,
        name: e.file_name,
        url: `${e.uri}`,
      };
    });

  return (
    <div className={Styles.gridContainer}>
      {[
        { type: "images", items: images },
        { type: "videos", items: videos },
        { type: "audio", items: audios },
        { type: "docs", items: docs },
      ].map((obj, index) => (
        <div className={Styles.gridItem} key={index}>
          <div className={Styles.type}>
            <p className={Styles.advance}>{obj.type}</p>
          </div>
          <div className={Styles.inputContainers}>
            {obj.items.map((item: any, index: number) => (
              <FileInput
                refetch={refetch}
                key={index}
                item={item}
                type={obj.type}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default File;
