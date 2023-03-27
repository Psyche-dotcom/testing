import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Collapse from "src/components/Shared/Collapse/Collapse";
import AccountMenu from "src/components/Shared/Menu/AccountMenu/AccountMenu";
import GeneralMenu from "src/components/Shared/Menu/GeneralMenu/GeneralMenu";
import { RootState, useAppDispatch } from "src/redux/store/store";

export default function collupse() {
  const [heights, setHeights] = useState([]);
  return (
    <>
      {/* <Slides /> */}
      {/* <EditFiles /> */}
      {/* <GeneralMenu /> */}
      {/* <AccountMenu /> */}
      {/* <Collapse title={`Slides_${e}`} level={1}></Collapse> */}
      {[1].map((e) => (
        <Collapse title={`Slides_${e}`} level={1}>
          <div>Hello And Welcome</div>
        </Collapse>
      ))}
    </>
  );
}
