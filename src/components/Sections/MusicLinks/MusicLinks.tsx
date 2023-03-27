import React from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import { ContributeDataType } from "../../Shared/Types/BottomSheetDataTypes";
import SectionContainer from "../SectionContainer/SectionContainer";
import CommomSocialsLinks from "../CommonSocialsLinks/CommomSocialsLinks";

const MusicLinks = ({ parentSwiper }) => {
  const musicLinksData: ContributeDataType[] = [
    {
      icon_link: "/assets/icons/music.svg",
      bgColor: "white",
      href: "",
      name: "Apple Music",
    },
    {
      icon_link: "/assets/icons/spotify.svg",
      bgColor: "white",
      href: "",
      name: "Spotify",
    },
    {
      icon_link: "/assets/icons/sound_cloud.svg",
      bgColor: "white",
      href: "",
      name: "Sound Cloud",
    },
    {
      icon_link: "/assets/icons/youtubesBg.svg",
      bgColor: "white",
      href: "",
      name: "Youtube Music",
    },
    {
      icon_link: "/assets/icons/amazon.svg",
      bgColor: "white",
      href: "",
      name: "Amazon Music",
    },
    {
      icon_link: "/assets/icons/tidal.svg",
      bgColor: "white",
      href: "",
      name: "Tidal",
    },
    {
      icon_link: "/assets/icons/amazon.svg",
      bgColor: "white",
      href: "",
      name: "Amazon Music",
    },
    {
      icon_link: "/assets/icons/tidal.svg",
      bgColor: "white",
      href: "",
      name: "Tidal",
    },
  ];
  const { height } = useWindowDimensions();
  const Data = useGroupData(musicLinksData, height < 500 ? 4 : 6);
  return (
    <SectionContainer title="Music Link" parentSwiper={parentSwiper}>
      <CommomSocialsLinks data={Data} />
    </SectionContainer>
  );
};

export default MusicLinks;
