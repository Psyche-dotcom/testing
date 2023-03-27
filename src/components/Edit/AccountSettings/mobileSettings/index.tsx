import { useMutation } from "@apollo/client";
import { FormikContainer } from "@formik/FormikContainer";
import { UPDATE_USER } from "@graphql/mutations";
import React from "react";
import { useCookies } from "react-cookie";
import PersonalInfoFields from "../PersonalInfo/PersonalInfoFields";

const AccountKeys = [
  "first_name",
  "last_name",
  "email",
  "prefix",
  "website",
  "suffix",
  "work_phone",
  "cell_phone",
  "home_phone",
  "job_title",
  "profile_picture",
  "company_name",
  "business_address",
  "home_address",
  "landing_page",
  "middle_initial",
  "self_portrait_image",
  "self_landscape_image",
  "linkedin_url",
  "note",
  "pages_ref",
  "pages",
  "v_email",
];

export default function MobileAccountInformationPage({
  initialValues,
}): JSX.Element {
  const [updateUser] = useMutation(UPDATE_USER);
  const [cookies] = useCookies(["userAuthToken"]);
  function handleSubmit(values) {
    const fields = [];
    for (let [field, value] of Object.entries(values)) {
      if (field === "companyName") field = "company_name";
      if (field === "linkedinUrl") field = "linkedin_url";
      if (AccountKeys.includes(field)) {
        fields.push({ field, value });
      }
    }
    updateUser({
      variables: {
        token: cookies.userAuthToken,
        fields,
      },
    }).catch((err) => alert(err.message));
  }

  return (
    <FormikContainer initialValues={initialValues}>
      {(formik) => {
        //   setCurrentVals(formik.values)
        return <PersonalInfoFields onSave={handleSubmit} />;
      }}
    </FormikContainer>
  );
}
