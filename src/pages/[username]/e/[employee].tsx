import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_USER_BY_USER_NAME, GET_ENTERPRISE_EMPLOYEE, GET_PAGE_SECURITY } from "@graphql/query";
// import BottomSheetSlide from '@shared/BottomSheet/BottomSheetContainer/BottomSheetSlide';
import Sections from "src/components/Sections/Sections";
import { Loader } from "@shared/Loader/Loader";
import { setVreel, setVreelMetadata } from "@redux/createSlice/vreelSlice";
import { useDispatch } from "react-redux";
import CustomHead from "@shared/meta/MetaTags";
import { client } from "@graphql/index";
import PrivacyScreen from "@shared/privacy";

const userPage = ({ result }) => {
  const securedPayload = result?.data?.pageIsSecure;
  const router = useRouter();
  const dispatch = useDispatch();
  const { username, employee } = router?.query;
  const [showSecure, setShowSecure] = useState<boolean>(securedPayload.Secured);
  const [employeeData, setEmployeeData] = useState<any>();
  const [getEmployee, { loading, error, data }] = useLazyQuery(GET_ENTERPRISE_EMPLOYEE, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (!showSecure) getAuthenticatedEmployee(null);
  }, [showSecure]);

  useEffect(() => {
    if (data) {
      dispatch(setVreel(data?.enterpiseEmployee?.vreel));
      dispatch(setVreelMetadata({ employee: data?.enterpiseEmployee?.employee.id }))

      setEmployeeData(data?.enterpiseEmployee)
    }
  }, [data, error])

  function getAuthenticatedEmployee(key: string) {
    getEmployee({
      variables: {
        enterpriseName: username,
        employeeId: employee,
        key
      }
    })
  }

  if (loading || error) return <Loader />;

  return (
    <div>
      {
        employeeData &&
        <Sections
          enterprise={{
            companyName: employeeData.companyName, default_landscape: employeeData.default_landscape,
            default_portrait: employeeData.default_portrait,
          }}
          vreel={employeeData?.vreel}
          user={employeeData?.employee}
        />
      }
      {
        showSecure &&
        <PrivacyScreen logo={securedPayload?.PageLogo} pageId={securedPayload?.PageId} setKey={getAuthenticatedEmployee} />
      }

    </div>
  );
};

export default userPage;

export const getServerSideProps = async ({ params, res }) => {
  const { employee } = params;
  console.log("request entity", { id: employee, context: "employee" })
  const result = await client.query({
    query: GET_PAGE_SECURITY,
    variables: { id: employee, context: "employee" }
  });
  console.log("@ =>", result)
  if (result.errors?.length > 0 || result?.error) return { notFound: true }


  return {

    props: {
      result
    }
  }
}
