import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import SectionContainer from "../SectionContainer/SectionContainer";
import CommomSocialsLinks from "../CommonSocialsLinks/CommomSocialsLinks";

const Socials: React.FC<{ parentSwiper: any; socials: any, header: string, displayOptions: any }> = ({
  parentSwiper,
  socials,
  header,
  displayOptions
}) => {
  const dummySocials = [
    {
      platform: "facebook",
      username: "vreel-1",
    },
    {
      platform: "twitter",
      username: "vreel-2",
    },
    {
      platform: "youtube",
      username: "vreel-3",
    },
    {
      platform: "instagram",
      username: "vreel-4",
    },
    {
      platform: "snapChat",
      username: "vreel-5",
    },
    {
      platform: "twitch",
      username: "vreel-6",
    },
  ];




  const data = socials?.map((e) => {
    switch (e.platform.toLowerCase()) {
      case "facebook":
        return {
          icon_link: "/assets/images/facebook-white.png",
          bgColor: "#1877F2",
          name: "Facebook",
          href: `https://www.facebook.com/${e.username}`,
        };
      case "twitter":
        return {
          icon_link: "/assets/images/twitter.svg",
          bgColor: "#1DA1F2",
          name: "Twitter",
          href: `https://twitter.com/${e.username}`,
        };
      case "youtube":
        return {
          icon_link: "/assets/images/youtube.svg",
          bgColor: "#FF0000",
          name: "Youtube",
          href: `https://www.youtube.com/channel/${e.username}`,
        };
      case "instagram":
        return {
          icon_link: "/assets/images/instagram.svg",
          bgColor: "#F00073",
          name: "Instagram",
          href: `https://www.instagram.com/${e.username}`,
        };
      case "snapchat":
        return {
          icon_link: "/assets/images/snapChat.svg",
          bgColor: "#FAFF00",
          name: "SnapChat",
          href: `https://www.snapchat.com/add/${e.username}`,
        };
      case "twitch":
        return {
          icon_link: "/assets/images/twitch.svg",
          bgColor: "#9146FF",
          name: "Twitch",
          href: `https://www.twitch.tv/${e.username}`,
        };
      default:
        return {};
    }
  });
  const { height } = useWindowDimensions();
  const Data = useGroupData(
    data?.filter((e: any) => e.href),
    height < 500 ? 4 : 6
  );

  return (
    <SectionContainer displayOptions={displayOptions} title={header} parentSwiper={parentSwiper}>
      <CommomSocialsLinks data={Data} />
    </SectionContainer>
  );
};

export default Socials;
