import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_PAGE, GET_PAGE_SECURITY, GET_USER_BY_USER_NAME } from "@graphql/query";
// import BottomSheetSlide from '@shared/BottomSheet/BottomSheetContainer/BottomSheetSlide';
import Sections from "src/components/Sections/Sections";
import { Loader } from "@shared/Loader/Loader";
import { useDispatch } from "react-redux";
import { setVreel, setVreelMetadata } from "@redux/createSlice/vreelSlice";
import { client } from "@graphql/index";
import PrivacyScreen from "@shared/privacy";
import { MountController } from "src/controller";

const userPage = ({ result }) => {
  const securedPayload = result?.data?.pageIsSecure;
  const router = useRouter();
  const pageId = result?.data?.pageIsSecure.PageId
  const dispatch = useDispatch();
  const { username } = router?.query;
  const [vreelContent, setVreelContent] = useState(null);
  const [showSecure, setShowSecure] = useState<boolean>(securedPayload.Secured);

  const [vreelkey, setVreelKey] = useState("");
  const [getVreel, { loading, error, data }] = useLazyQuery(GET_PAGE);

  useEffect(() => {
    if (!showSecure) getAuthenticatedVreel(null);
  }, [showSecure])

  useEffect(() => {
    MountController();
  }, [])

  useEffect(() => {
    if (data) {
      setVreelContent(data?.page);
      dispatch(setVreel(data?.page));
      dispatch(setVreelMetadata({ employee: data?.page.id }));
      setShowSecure(false);
    }
    if (error) {
      console.log(error)
      // router.push('/')
    }
  }, [data, error])

  // console.log({ data, username });
  if (loading || error) return <Loader />;


  const user = data?.username
  const metaName = user?.companyName !== "" ? user?.companyName : user?.username;
  const metaImageSrc = user?.vreel?.display_options?.default_logo !== "" ? user?.vreel?.display_options?.default_logo : "/icons/Vreel_logo_small.svg"

  function fetchVreel(data) {
    console.log("request type")
  }
  async function getAuthenticatedVreel(key: string) {
    getVreel({
      variables: {
        id: pageId,
        metadata: {
          presentation: true,
          passcode: key
        }
      }
    }).then(console.log)
      .catch((err) => err.message)


  }

  return (
    <div>
      <Head>
        <title>{`${metaName}'s`} VReel</title>
        <meta property="og:image" content={metaImageSrc} />
      </Head>
      {vreelContent &&
        <Sections vreel={vreelContent} />
      } {
        showSecure &&
        <PrivacyScreen logo={securedPayload?.PageLogo} pageId={pageId} setKey={getAuthenticatedVreel} />
      }
    </div>
  );
};

export default userPage;


export const getServerSideProps = async ({ params, res }) => {
  const { username } = params;
  const result = await client.query({
    query: GET_PAGE_SECURITY,
    variables: { id: username, context: "username" }
  });
  console.log("@ =>", result)
  if (result.errors?.length > 0 || result?.error) return { notFound: true }


  return {

    props: {
      result
    }
  }
}