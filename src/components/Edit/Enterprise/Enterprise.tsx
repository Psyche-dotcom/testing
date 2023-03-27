import { useMutation, useQuery } from "@apollo/client";
import AccountSensitivity from "@edit/AccountSettings/PersonalInfo/AccountSensitivity";
import PersonalInfoFields from "@edit/AccountSettings/PersonalInfo/PersonalInfoFields";
import Element from "@edit/Elements/Element/Element";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import {
  ADD_EMPLOYEE_TO_ENTERPRISE,
  REMOVE_EMPLOYEE_FROM_ENTERPRISE,
  UPDATE_EMPLOYEE,
} from "@graphql/mutations";
import { GET_ENTERPRISE_EMPLOYEES } from "@graphql/query";
import { RootState } from "@redux/store/store";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import LogoBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SlideLogo";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import Collapse from "@shared/Collapse/Collapse";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Styles from "./Enterprise.module.scss";
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
  "pages_ref",
];
type Props = {};
const initialValues = {
  name: "mobile" || "desktop",
  uri: "uri",
};

function EmployeeCard({
  title,
  user,
  token,
  refetch,
}: {
  title: string;
  id: string;
  user: any;
  token: string;
  refetch: (o: any) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE_FROM_ENTERPRISE);
  const [pagesRef, setPagesRef] = useState(user.pagesRef);
  const { pages } = useSelector((state: RootState) => state.editorSlice);
  const [currentVals, setCurrentVals] = useState(user);


  function handleSubmit() {
    const fields = [];

    for (let [field, value] of Object.entries(currentVals)) {
      if (field === "companyName") field = "company_name";
      if (field === "linkedinUrl") field = "linkedin_url";

      if (AccountKeys.includes(field)) {
        fields.push({
          field,
          value,
        });
      }
    }
    fields.push({
      field: "pages_ref",
      value: pagesRef
    })
    updateEmployee({
      variables: {
        token,
        employee: user.id,
        fields,
      },
    })
      .then(() => alert("updated employee!"))
      .catch((err) => alert(err.message));
  }

  function deleteEmployee() {
    removeEmployee({
      variables: {
        token,
        employee: user.id,
      },
    })
      .then(() => {
        alert("removed employee!");
        refetch({
          token,
        });
      })
      .catch((err) => alert(err.message));
  }
  return (
    <div
      style={{ backgroundColor: "gray", padding: "30px", borderRadius: "10px" }}
    >
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{title}</h1>
        <button
          style={{ color: "white", backgroundColor: "black", padding: "10px" }}
          onClick={() => setOpen(!open)}
        >
          {!open ? "Open" : "Close"}
        </button>
      </section>
      <label style={{ backgroundColor: "white", padding: "3px" }}>
        {user.id}
      </label>
      {open && (
        <div style={{ padding: "10px" }}>
          <FormikContainer initialValues={user}>
            {(formik) => {
              const { values } = formik;
              setCurrentVals(values);
              return (
                <form style={{ marginTop: "4px" }} onSubmit={handleSubmit}>
                  <PersonalInfoFields />
                  <div style={{ display: "flex" }}>
                    <FormikControl
                      control="media-image"
                      name={`self_portrait_image`}
                    />
                    <label style={{ color: "white", marginTop: "3pc" }}>
                      Portrait Image
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <FormikControl
                      control="media-image"
                      name={`self_landscape_image`}
                      image={values.selfLandscapeImage}
                    />
                    <label style={{ color: "white", marginTop: "3pc" }}>
                      Landscape Image
                    </label>
                  </div>
                  <div style={{ display: "flex" }}>
                    <FormikControl
                      control="media-image"
                      name={`profile_picture`}
                      image={"https://vreel-storage.nyc3.digitaloceanspaces.com/…/images/E6358897-74A8-4C8B-888E-80B738FF57A6.jpeg"}
                    />
                    <label style={{ color: "white", marginTop: "3pc" }}>
                      Profile Image
                    </label>
                  </div>
                  <div>
                    <label>Select Page</label>
                    <section>
                      <select onChange={(e) => setPagesRef(e.target.value)} value={pagesRef} >
                        {pages.map(({ name, id }) => {
                          return <option value={id}>{`Page: ${id}`}</option>;
                        })}
                      </select>
                    </section>
                  </div>
                </form>
              );
            }}
          </FormikContainer>
          <section>
            <FActionsBtn
              title={`Update ${user.first_name}`}
              padding="7px 13px"
              bgColor="#11b03e"
              color="white"
              actions={handleSubmit}
            />
            <FActionsBtn
              title={`Remove ${user.first_name}`}
              padding="7px 13px"
              bgColor="red"
              color="white"
              actions={deleteEmployee}
            />
          </section>
        </div>
      )}
    </div>
  );
}

const Enterprise = (props: Props) => {
  const [cookies] = useCookies(["userAuthToken"]);
  const { data, error, refetch } = useQuery(GET_ENTERPRISE_EMPLOYEES, {
    variables: { token: cookies.userAuthToken },
  });
  const [addEmployee] = useMutation(ADD_EMPLOYEE_TO_ENTERPRISE);
  const [employees, setEmployees] = useState([]);
  const [newEmployeeEmail, setNewEmployeeEmail] = useState<string>("");

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
    if (data) {
      setEmployees(data.enterpriseByToken.employees);
    }
  }, [error, data]);

  function handleAddEmployee() {
    addEmployee({
      variables: {
        token: cookies.userAuthToken,
        input: {
          account_type: "employee",
          username: "",
          email: newEmployeeEmail,
          password: "",
        },
      },
    })
      .then(() => {
        alert("added new employee: " + newEmployeeEmail);
        refetch({
          token: cookies.userAuthToken,
        });
      })
      .catch((err) => alert(err.message));
  }

  return (
    <div>
      <section>
        <input
          style={{ padding: "10px" }}
          placeholder="New Employee Email"
          onChange={(e) => setNewEmployeeEmail(e.target.value)}
        />
        <FActionsBtn
          title="Add New Employee"
          padding="7px 13px"
          bgColor="#11b03e"
          color="white"
          actions={handleAddEmployee}
        />
      </section>
      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <div>
              {employees.map((employee) => (
                <div key={employee.id} style={{ margin: 30 }}>
                  <EmployeeCard
                    token={cookies.userAuthToken}
                    user={employee}
                    id={employee.id}
                    title={`${employee.first_name || "Unamed "} 
                    ${employee.last_name || "Employee"}`}
                    refetch={refetch}
                  />
                </div>
              ))}
            </div>
          );
        }}
      </FormikContainer>
    </div>
  );
};

export default Enterprise;
