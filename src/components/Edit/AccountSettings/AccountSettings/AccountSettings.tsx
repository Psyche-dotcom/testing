import { useQuery } from "@apollo/client";
import { GET_ACCOUNT_DATA } from "@graphql/query";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import DesktopSettings from "../DesktopSetting/DesktopSettings";
import MobileAccountInformationPage from "../mobileSettings";
import PersonalInfo from "../PersonalInfo/PersonalInfo";

const AccountSettings = () => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 500);
  const { data } = useQuery(GET_ACCOUNT_DATA, {
    variables: {
      token: cookies.userAuthToken,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken,
      },
    },
  });

  function handleResize() {
    setIsMobile(window.innerWidth < 1024);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!data) return "Loading";
  return (
    <div>
      {data && (
        <>
          {isMobile && (
            <MobileAccountInformationPage
              initialValues={data?.getUserByToken}
            />
          )}
          {!isMobile && <DesktopSettings data={data?.getUserByToken} />}
        </>
      )}
    </div>
  );
};

export default AccountSettings;
