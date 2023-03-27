import { gql, useQuery } from "@apollo/client";
import { RootState } from "@redux/store/store";
import clsx from "clsx";
import React from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import File from "../File/File";
import Players from "../Players/Players";
import UploadImages from "../UploadImages";
import Styles from "./Desktop.module.scss";
const SCHEMAS = gql`
  query User($token: String!, $metadata: DetailedRequest!) {
    getUserByToken(token: $token, metadata: $metadata) {
      files {
        file_count
        files {
          id
          file_name
          file_type
          uri
        }
      }
    }
  }
`;

const Desktop = () => {
  const [cookies, setCookie] = useCookies(["userAuthToken"]);
  const userFiles = useQuery(SCHEMAS, {
    variables: {
      token: cookies.userAuthToken,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken
      }
    },
  });

  const { showPreviewInitialState, mobilePreviewInitialState } = useSelector(
    (state: RootState) => state.expandMenu
  );
  const len = showPreviewInitialState.payload?.length ? true : false;


  return (
    <div className={Styles.filesDesktopVersion}>
      <div className={Styles.grid}>
        <div className={Styles.grid__wrapper}>
          <UploadImages refetch={userFiles.refetch} />
        </div>
        <div className={Styles.grid__wrapper}>
          <div className={clsx(Styles.preview)}>
            {len && mobilePreviewInitialState ? (
              <div>
                <Players />
              </div>
            ) : (
              <h3>Preview</h3>
            )}
          </div>
        </div>
      </div>
      <File userFiles={userFiles} />
    </div>
  );
};

export default Desktop;
