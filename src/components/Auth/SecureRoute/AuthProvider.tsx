import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import { userAuthReducer } from "@redux/createSlice/userSlice";

import { Loader } from "@shared/Loader/Loader";
import { GET_USER_BY_TOKEN } from "@graphql/query";
import MainContainer from "@sections/MainContainer/MainContainer";
import {
  setCurrentPageId,
  setEditorPages,
} from "@redux/createSlice/editorSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["userAuthToken"]);

  const { loading, error, data } = useQuery(GET_USER_BY_TOKEN, {
    variables: {
      token: cookies?.userAuthToken,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken,
      },
    },
  });

  useEffect(() => {
    if (data) {
      const user = data.getUserByToken;
      const pageData = [];
      [{ id: user.id, name: "Main", nonEditable: true }, ...user.pages].forEach((page, idx) => {
        pageData.push({ name: page.name, id: page.id, nonEditable: page?.nonEditable });
      });

      dispatch(setEditorPages(pageData));
    }
    if (error) {
      alert(error.message);
    }
  }, [data]);
  if (loading) {
    return <Loader />;
  }

  const { id, email, username, vreel } = data?.getUserByToken || {};

  if (id && email && username) {
    dispatch(
      userAuthReducer({
        authenticated: true,
        user: {
          id: id,
          email,
          username,
          vreel: vreel,
          token: cookies?.userAuthToken,
        },
      })
    );
  }

  return children;
};

export default AuthProvider;
