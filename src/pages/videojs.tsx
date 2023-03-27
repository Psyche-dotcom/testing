import Events from "@sections/Events/Events";
import SliderVideo2 from "@sections/Sliders/HeroSlider/HelperComps/SliderVideo/SliderVideo2";
import VideoJS from "@sections/Sliders/HeroSlider/HelperComps/video/VideoJs";
import VideoJsPlay from "src/components/Sections/Sliders/HeroSlider/HelperComps/video/VideoJsPlay";

import VLinks from "@sections/VLinks/VLinks";
import { Loader } from "@shared/Loader/Loader";
import { useState } from "react";
import { Audio } from "react-loader-spinner";
export default function test() {
  const [loading, setloading] = useState(true);
  // return (
  //   <div style={{ width: "100%", height: "100%", background: "red" }}></div>
  // );
  // return <Loader />;
  return <VideoJsPlay />;
}
