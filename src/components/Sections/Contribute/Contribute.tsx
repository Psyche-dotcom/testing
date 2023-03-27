import React from "react";
import { useGroupData } from "src/hooks/useGroupData";
import useWindowDimensions from "src/hooks/useWindowDimensions";
import { ContributeDataType } from "../../Shared/Types/BottomSheetDataTypes";
import SectionContainer from "../SectionContainer/SectionContainer";
import CommomSocialsLinks from "../CommonSocialsLinks/CommomSocialsLinks";

const Contribute = ({ parentSwiper }) => {
  const contributeData: ContributeDataType[] = [
    {
      icon_link: "/assets/icons/dollar.svg",
      bgColor: "#DCEFDC",
      href: "",
      name: "Cash App",
    },
    {
      icon_link: "/assets/icons/paypal.svg",
      bgColor: "#D8DDF3",
      href: "",
      name: "Paypal",
    },
    {
      icon_link: "/assets/icons/venmo.svg",
      bgColor: "#CCE4FF",
      href: "",
      name: "Venmo",
    },
    {
      icon_link: "/assets/icons/crypto.svg",
      bgColor: "#E6E6E6",
      href: "",
      name: "Crypto",
    },
    {
      icon_link: "/assets/icons/bitpay.svg",
      bgColor: "#CCE4FF",
      href: "",
      name: "Bitpay",
    },
    {
      icon_link: "/assets/icons/klarna.svg",
      bgColor: "#FFCCD9",
      href: "",
      name: "Klarna",
    },
  ];
  const { height } = useWindowDimensions();
  const Data = useGroupData(contributeData, height < 500 ? 4 : 6);

  return (
    <SectionContainer title="Contribute" parentSwiper={parentSwiper}>
      <CommomSocialsLinks data={Data} />
    </SectionContainer>
  );
};

export default Contribute;
