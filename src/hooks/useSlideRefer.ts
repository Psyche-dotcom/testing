import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES_PREVIEW, GET_PAGE, GET_USER_BY_TOKEN, GET_USER_BY_USER_NAME } from "@graphql/query";
import { RootState } from "@redux/store/store";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

export const useSlideRefer = () => {
  const [cookies] = useCookies(["userAuthToken"]);
  const [employees, setEmployees] = useState([]);
  const { currentPageId } = useSelector((state: RootState) => state.editorSlice)
  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: {
      id: currentPageId,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken
      }

    },
    fetchPolicy: "cache-and-network",
  });

  const { data: employeesData, error: employeeError } = useQuery(GET_EMPLOYEES_PREVIEW, {
    variables: {
      token: cookies.userAuthToken,
      metadata: { presentation: false, self: true, token: cookies.userAuthToken }
    }
  });



  useEffect(() => {
    if (employeesData) {
      setEmployees(employeesData?.enterpriseByToken?.employees);
    }
  }, [employeeError, employeesData])

  const cta_data = useMemo(() => {
    let slidesContent = [];
    const sectionsData = [{ name: "Home", id: "slides" }];
    if (data) {
      const { slides, simple_links, socials, gallery, members } =
        data?.page;
      slidesContent = slides
        .map((item: any) => item)
        .sort((a: any, b: any) => {
          return a.slide_location - b.slide_location;
        });

      [...gallery, ...members].forEach((g) => {
        sectionsData.push({
          id: g.id,
          name: g.header,
        });
      });
      simple_links?.forEach((link) => {
        // if (link.links.length > 0) {
        sectionsData.push({
          id: link.id,
          name: link.header,
        });
        // }
      });
      socials.forEach((social) => {
        sectionsData.push({
          id: social.id,
          name: social.header,
        });
      });
    }
    return {
      sectionsData,
      employees,
      slidesContent
    }
  }, [data, employees])
  return {
    data,
    ...cta_data,
  };
};
