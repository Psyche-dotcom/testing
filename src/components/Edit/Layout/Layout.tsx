import { useQuery } from "@apollo/client";
import SecureRoute from "@auth/SecureRoute/SecureRoute";
import { GET_PAGES_BY_TOKEN } from "@graphql/query";
import { setEditorPages } from "@redux/createSlice/editorSlice";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import DesktopDashboard from "./Desktop/DesktopDashboard";
import MobileComponentContainer from "./Mobile/MobileComponentContainer";
import MobileDashboard from "./Mobile/MobileDashboard";

const EditorLayout: React.FC<{ userId: string; mobile: boolean, children: React.ReactNode }> = ({
  userId,
  children,
  mobile
}) => {

  if (!mobile) {
    return <DesktopDashboard children={children} />
  }
  return <MobileComponentContainer>{children}</MobileComponentContainer>

};

export default EditorLayout;
