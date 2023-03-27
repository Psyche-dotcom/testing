import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { GET_USER_BY_USER_NAME } from "src/services/graphql/query";
import { RootState } from "src/redux/store/store";
import AccountMenu from "./AccountMenu/AccountMenu";
import GeneralMenu from "./GeneralMenu/GeneralMenu";
import MainContainer from "@sections/MainContainer/MainContainer";

export default function Menus() {
  const { initMenuState } = useSelector((state: RootState) => state.expandMenu);
  const router = useRouter();
  const { username } = router?.query;
  const { loading, error, data } = useQuery(GET_USER_BY_USER_NAME, {
    variables: {
      username: username,
    },
    fetchPolicy: "cache-and-network",
  });


  return (
    <>
      {initMenuState && (
        <MainContainer>
          <GeneralMenu />
        </MainContainer>
      )}
      <MainContainer>
        <AccountMenu />
      </MainContainer>
    </>
  );
}
