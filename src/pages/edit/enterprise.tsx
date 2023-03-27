import { useMutation, useQuery } from "@apollo/client";
import AccountSensitivity from "@edit/AccountSettings/PersonalInfo/AccountSensitivity";
import PersonalInfoFields from "@edit/AccountSettings/PersonalInfo/PersonalInfoFields";
import Element from "@edit/Elements/Element/Element";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { client } from "@graphql/index";
import clsx from "clsx";
import {
  ADD_EMPLOYEE_TO_ENTERPRISE,
  REMOVE_EMPLOYEE_FROM_ENTERPRISE,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_METATDATA,
  UPDATE_ENTERPRISE_MUTATION,
} from "@graphql/mutations";
import {
  GET_ENTERPRISE_EMPLOYEES,
  GET_USER_BY_TOKEN,
  GET_USER_PAGES,
} from "@graphql/query";
import useDebounce from "@hooks/useDebounce";
import { setEditorPages } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import CopyLinkBtn from "@shared/Buttons/AccountSettings/CopyLinkBtn/CopyLinkBtn";
import LogoBtn from "@shared/Buttons/SlidesBtn/AdvancedLogoBtn/SlideLogo";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import Collapse from "@shared/Collapse/Collapse";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ObjectisEqual } from "src/utils/check";
// import Styles from "./Enterprise.module.scss";
import CallToActions from "@edit/Slides/Slides/Slide/CallToActions/CallToActions";
import { useFormikContext } from "formik";
import useDidMountEffect from "@hooks/useDidMountEffect";
import Styles from "@edit/Slides/Slides/Slide/Slide.module.scss";
import Switch, { CTAPositionSwitch } from "@formik/common/Switch/Switch";
import { SearchBar } from "@shared/Inputs/search";

const analyticsBaseUrl = `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/vreel.page/`;
const baseUrl = process.env.NEXT_PUBLIC_SITE_BASE_URL;
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
interface Props {
  pages: string[];
}
const initialValues = {
  name: "mobile" || "desktop",
  uri: "uri",
};

function FormikToggle({ name, title }) {
  const { values, setFieldValue } = useFormikContext<any>();
  const boolVal: boolean = values.employee_metadata[name];
  function handleClick(e) {
    e.preventDefault();
    setFieldValue(`employee_metadata.${name}`, !boolVal);
  }

  return (
    <button
      style={{ backgroundColor: "white", padding: "10px" }}
      onClick={handleClick}
    >{`${title}: ${boolVal}`}</button>
  );
}

function EmployeeCard({
  title,
  user,
  token,
  refetch,
  pages,
}: {
  title: string;
  id: string;
  user: any;
  token: string;
  pages: { label: string; id: string }[];
  refetch: (o: any) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE_FROM_ENTERPRISE);
  const [pagesRef, setPagesRef] = useState(user.pagesRef);
  const [currentVals, setCurrentVals] = useState(user);
  const [updateEmployeeMetdata] = useMutation(UPDATE_EMPLOYEE_METATDATA);
  const { username } = useSelector((state: RootState) => state.userAuth.user);
  const [employeeAnalyticsUrl] = useState(
    `${analyticsBaseUrl}?&page=%2F${username}%2Fe%2F${user.id}`
  );
  const didMount = useRef(false);
  const debounceValues = useDebounce(currentVals);

  const [catOpen, setCatOpen] = useState(1);

  useDidMountEffect(() => {
    updateEmployee({
      variables: {
        token,
        employee: user.id,
        fields: [{ field: "pages_ref", value: pagesRef }],
      },
    });
  }, [pagesRef]);

  useEffect(() => {
    if (didMount.current) {
      if (
        !ObjectisEqual(user.employee_metadata, debounceValues.employee_metadata)
      ) {
        const values = debounceValues.employee_metadata;
        delete values["__typename"];
        delete values["cta1"]["__typename"];
        delete values["cta2"]["__typename"];
        delete values["cta3"]["__typename"];
        delete values["cta4"]["__typename"];

        console.log("submittingh values => ", values);
        updateEmployeeMetdata({
          variables: {
            token,
            input: values,
            employeeId: user.id,
          },
        });
      }
      updateMedia();
    }

    didMount.current = true;
  }, [debounceValues]);

  const [employeeUrl] = useState(`${baseUrl}/${username}/e/${user.id}`);

  function updateMedia() {
    const { profilePicture, selfPortraitImage, selfLandscapeImage } =
      debounceValues;
    const fields = [
      {
        field: "profile_picture",
        value: profilePicture,
      },
      {
        field: "self_portrait_image",
        value: selfPortraitImage,
      },
      {
        field: "self_landscape_image",
        value: selfLandscapeImage,
      },
    ];
    updateEmployee({
      variables: {
        token,
        employee: user.id,
        fields,
      },
    }).catch((err) => alert(err.message));
  }

  useEffect(() => { }, []);

  function handleSubmit(values) {
    const fields = [];
    for (let [field, value] of Object.entries(values)) {
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
      value: pagesRef,
    });

    updateEmployee({
      variables: {
        token,
        employee: user.id,
        fields,
      },
    }).catch((err) => alert(err.message));
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
      style={{
        backgroundColor: "#C4C4C4",
        padding: "20px 15px",
        borderRadius: "10px",
      }}
    >
      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{title}</h1>
        <div>
          <button
            style={
              {
                // color: "white",
                // backgroundColor: "black",
                // padding: "10px",
              }
            }
            onClick={() => setOpen(!open)}
          >
            {!open && (
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2L8.76772 7.94098L15.527 2"
                  stroke="black"
                  stroke-width="2.96325"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            )}
            {open && (
              <svg
                width="18"
                height="10"
                viewBox="0 0 18 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5269 7.94092L8.75914 1.99994L1.99987 7.94092"
                  stroke="black"
                  stroke-width="2.96325"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </section>
      <label
        style={{ display: "none", backgroundColor: "white", padding: "3px" }}
      >
        {user.id}
      </label>
      {open && (
        <div
          style={{
            padding: "10px 0",
            width: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => {
              navigator.clipboard.writeText(employeeAnalyticsUrl);
              alert("Copied Analytics Url");
            }}
            style={{
              width: "44%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              margin: "3%",
              backgroundColor: "rgb(255, 122, 0)",
              color: "#ffffff",
              fontSize: "0.65rem",
              fontWeight: "600",
              textAlign: "center",
              borderRadius: "0.375rem",
              padding: "0.5rem",
              minHeight: "30px",
              maxHeight: "53px",
              fontFamily: "Poppins",
            }}
          >
            Copy Analytics Url
          </button>
          <button
            onClick={() => window.open(employeeAnalyticsUrl)}
            style={{
              width: "44%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              margin: "3%",
              backgroundColor: "rgb(255, 122, 0)",
              color: "#ffffff",
              fontSize: "0.65rem",
              fontWeight: "600",
              textAlign: "center",
              borderRadius: "0.375rem",
              padding: "0.5rem",
              minHeight: "30px",
              maxHeight: "53px",
              fontFamily: "Poppins",
            }}
          >
            View Analytics
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(employeeUrl);
              alert("Copied Employee Url");
            }}
            style={{
              width: "44%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              margin: "3%",
              backgroundColor: "rgb(255, 122, 0)",
              color: "#ffffff",
              fontSize: "0.65rem",
              fontWeight: "600",
              textAlign: "center",
              borderRadius: "0.375rem",
              padding: "0.5rem",
              minHeight: "30px",
              maxHeight: "53px",
              fontFamily: "Poppins",
            }}
          >
            Copy Employee Url{" "}
          </button>
          <button
            onClick={() => window.open(employeeUrl)}
            style={{
              width: "44%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              margin: "3%",
              backgroundColor: "rgb(255, 122, 0)",
              color: "#ffffff",
              fontSize: "0.65rem",
              fontWeight: "600",
              textAlign: "center",
              borderRadius: "0.375rem",
              padding: "0.5rem",
              minHeight: "30px",
              maxHeight: "53px",
              fontFamily: "Poppins",
            }}
          >
            View Employee
          </button>
          <FormikContainer initialValues={user}>
            {(formik) => {
              // alert("rerender")
              const { values } = formik;
              setCurrentVals(values);
              return (
                <form
                  style={{ marginTop: "4px" }}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div
                    style={{
                      padding: "10px",
                      width: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <label style={{ marginBottom: "10px" }}>Select Page</label>
                    <section>
                      <select
                        onChange={(e) => setPagesRef(e.target.value)}
                        value={pagesRef}
                        placeholder={"Select Assigned Page"}
                        style={{
                          textAlign: "center",
                          border: "solid 1px gray",
                          borderRadius: "20px",
                          padding: "10px 15px",
                          marginBottom: "10px",
                        }}
                      >
                        <option style={{ color: "gray" }} value="">
                          Select Assigned Page
                        </option>
                        {pages.map(({ id, label }) => {
                          return <option value={id}>{label}</option>;
                        })}
                      </select>
                    </section>
                  </div>
                  <PersonalInfoFields onSave={handleSubmit} />
                  <hr
                    style={{
                      borderTop: "dashed 3px orange",
                      background: "transparent",
                      margin: "20px -15px",
                    }}
                  />

                  <section>
                    <h3 style={{ margin: "10px 0", fontWeight: "bold" }}>
                      Enterprise Slide Media
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        background: "#8D8D8D",
                        borderRadius: "10px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <FormikControl
                        control="media-image"
                        name={`selfPortraitImage`}
                        classname={`row`}
                        image={values.selfPortraitImage}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        background: "#8D8D8D",
                        borderRadius: "10px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <FormikControl
                        control="media-image"
                        name={`selfLandscapeImage`}
                        classname={`row`}
                        image={values.selfLandscapeImage}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        background: "#8D8D8D",
                        borderRadius: "10px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <FormikControl
                        control="media-image"
                        name={`profilePicture`}
                        classname={`row`}
                        image={values.profilePicture}
                      />
                    </div>
                    <div style={{ margin: "20px" }}>
                      <FormikToggle
                        title="Display Profile Image"
                        name="display_profile_image"
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <FormikToggle
                        title="Display Contact Button"
                        name="contact_visible"
                      />
                      <FormikToggle
                        title="Display Share Button"
                        name="share_visible"
                      />
                      <FormikToggle
                        title="Display Qrcode"
                        name="qrcode_visible"
                      />
                    </div>
                  </section>
                  <hr
                    style={{
                      borderTop: "dashed 3px orange",
                      background: "transparent",
                      margin: "20px -15px",
                    }}
                  />
                  <div className={"call-to-action"}>
                    <h3 style={{ margin: "10px 0", fontWeight: "bold" }}>
                      Call-To-Action Buttons
                    </h3>
                    <h5
                      style={{
                        margin: "15px 15px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      CTA Button Position
                    </h5>
                    <div className={Styles.slideBody__callToActions__toggleBtn}>
                      <span>
                        <CTAPositionSwitch
                          name="employee_metadata.cta_position"
                          position={
                            formik.values?.employee_metadata?.cta_position
                          }
                        />
                      </span>
                    </div>
                    <p
                      className={
                        Styles.slideBody__callToActions__toggleBtn__note
                      }
                    >
                      Toggle button locations between center bottom & right side
                      panel
                    </p>
                    <h4 style={{ margin: "15px 0", textAlign: "center" }}>
                      Select Button
                    </h4>
                    <div
                      style={{
                        background: "#FFF",
                        width: "80%",
                        display: "flex",
                        borderRadius: "1rem",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "auto",
                        marginRight: "auto",
                        flexWrap: "wrap",
                      }}
                    >
                      <a
                        onClick={() => {
                          setCatOpen(1);
                        }}
                        style={{
                          width: "25%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          backgroundColor: `${catOpen == 1
                              ? "rgba(255, 122, 0, 1)"
                              : "rgba(255, 122, 0, 0)"
                            }`,
                          color: `${catOpen == 1 ? "#ffffff" : "#000000"}`,
                          fontSize: "1.65rem",
                          fontWeight: "600",
                          textAlign: "center",
                          borderRadius: "1rem",
                          padding: "5%",
                          minHeight: "30px",
                          maxHeight: "53px",
                          fontFamily: "Poppins",
                        }}
                      >
                        1
                      </a>
                      <a
                        onClick={() => {
                          setCatOpen(2);
                          return false;
                        }}
                        style={{
                          width: "25%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          backgroundColor: `${catOpen == 2
                              ? "rgba(255, 122, 0, 1)"
                              : "rgba(255, 122, 0, 0)"
                            }`,
                          color: `${catOpen == 2 ? "#ffffff" : "#000000"}`,
                          fontSize: "1.65rem",
                          fontWeight: "600",
                          textAlign: "center",
                          borderRadius: "1rem",
                          padding: "5%",
                          minHeight: "30px",
                          maxHeight: "53px",
                          fontFamily: "Poppins",
                        }}
                      >
                        2
                      </a>
                      <a
                        onClick={() => {
                          setCatOpen(3);
                        }}
                        style={{
                          width: "25%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          backgroundColor: `${catOpen == 3
                              ? "rgba(255, 122, 0, 1)"
                              : "rgba(255, 122, 0, 0)"
                            }`,
                          color: `${catOpen == 3 ? "#ffffff" : "#000000"}`,
                          fontSize: "1.65rem",
                          fontWeight: "600",
                          textAlign: "center",
                          borderRadius: "1rem",
                          padding: "5%",
                          minHeight: "30px",
                          maxHeight: "53px",
                          fontFamily: "Poppins",
                        }}
                      >
                        3
                      </a>
                      <a
                        onClick={() => {
                          setCatOpen(4);
                        }}
                        style={{
                          width: "25%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          backgroundColor: `${catOpen == 4
                              ? "rgba(255, 122, 0, 1)"
                              : "rgba(255, 122, 0, 0)"
                            }`,
                          color: `${catOpen == 4 ? "#ffffff" : "#000000"}`,
                          fontSize: "1.65rem",
                          fontWeight: "600",
                          textAlign: "center",
                          borderRadius: "1rem",
                          padding: "5%",
                          minHeight: "30px",
                          maxHeight: "53px",
                          fontFamily: "Poppins",
                        }}
                      >
                        4
                      </a>
                    </div>
                    <div
                      style={{
                        display: `${catOpen == 1 ? "block" : "none"}`,
                      }}
                    >
                      <div></div>
                      <CallToActions
                        name="employee_metadata.cta1"
                        link_type={
                          formik.values.employee_metadata?.cta1?.link_type ||
                          "url"
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: `${catOpen == 2 ? "block" : "none"}`,
                      }}
                    >
                      <div></div>
                      <CallToActions
                        name="employee_metadata.cta2"
                        link_type={
                          formik.values.employee_metadata?.cta2?.link_type ||
                          "url"
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: `${catOpen == 3 ? "block" : "none"}`,
                      }}
                    >
                      <div></div>
                      <CallToActions
                        name="employee_metadata.cta3"
                        link_type={
                          formik.values.employee_metadata?.cta3?.link_type ||
                          "url"
                        }
                      />
                    </div>
                    <div
                      style={{
                        display: `${catOpen == 4 ? "block" : "none"}`,
                      }}
                    >
                      <div></div>
                      <CallToActions
                        name="employee_metadata.cta4"
                        link_type={
                          formik.values.employee_metadata?.cta4?.link_type ||
                          "url"
                        }
                      />
                    </div>
                  </div>

                  <hr
                    style={{
                      borderTop: "dashed 3px orange",
                      background: "transparent",
                      margin: "20px -15px",
                    }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <FormikControl
                      control="input"
                      type="text"
                      placeholder="Job Description"
                      name="employee_metadata.job_description"
                      slideinput={true}
                    />
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <FormikControl
                      control="input"
                      type="text"
                      placeholder="Description"
                      name="employee_metadata.description"
                      slideinput={true}
                    />
                  </div>
                </form>
              );
            }}
          </FormikContainer>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "20px",
            }}
          >
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

interface EnterpriseDataType {
  default_landscape: string;
  default_portrait: string;
}

const Enterprise = ({ pages }: Props) => {
  const [cookies] = useCookies(["userAuthToken"]);
  const { data, error, refetch } = useQuery(GET_ENTERPRISE_EMPLOYEES, {
    variables: {
      token: cookies.userAuthToken,
      metadata: {
        presentation: false,
        self: true,
        token: cookies.userAuthToken,
      },
    },
  });
  const [addEmployee] = useMutation(ADD_EMPLOYEE_TO_ENTERPRISE);
  const [employees, setEmployees] = useState([]);
  const [enterprise, setEnterprise] = useState<EnterpriseDataType>();
  const [newEmployeeEmail, setNewEmployeeEmail] = useState<string>("");
  const [currentValues, setCurrentValues] = useState();
  const [updateEnterprise] = useMutation(UPDATE_ENTERPRISE_MUTATION);
  const debounceValues = useDebounce(currentValues);
  const dispatch = useDispatch();

  const didMount = useRef(false);

  useEffect(() => {
    // alert("mounting!")
    if (didMount.current) {
      updateEnterprise({
        variables: {
          token: cookies.userAuthToken,
          input: debounceValues,
        },
      }).catch((err) => null);
    }
    didMount.current = true;
  }, [debounceValues]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
    if (data) {
      const enterprise = data?.enterpriseByToken;
      setEmployees(enterprise?.employees);
      setEnterprise({
        default_landscape: enterprise.default_landscape,
        default_portrait: enterprise.default_portrait,
      });
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
      <div>
        <SearchBar />
      </div>
      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <p style={{textAlign: "center", color: "white", fontSize: "14px", padding: "10px"}}>Add New Member</p>
        <input
          style={{
            padding: "15px",
            borderRadius: "10px",
            width: "82%",
            maxWidth: "400px",
          }}
          placeholder="Email"
          onChange={(e) => setNewEmployeeEmail(e.target.value)}
        />
        <FActionsBtn
            title="Add"
            padding="4px 13px"
            bgColor="#FF7A00"
            color="white"
            actions={handleAddEmployee}
        />
      </section>
      <div style={{ padding: "20px" }}>
        <section>
          <h2
            style={{
              color: "white",
              fontSize: "14px",
              marginBottom: "20px",
              marginLeft: "20px",
            }}
          >
            Default Member Image
          </h2>
        </section>
        <div style={{ backgroundColor: "#8D8D8D", borderRadius: "10px" }}>
          {enterprise && (
            <FormikContainer initialValues={enterprise}>
              {(formik) => {
                if (!ObjectisEqual(formik.values, enterprise)) {
                  setCurrentValues(formik.values);
                }
                return (
                  <div
                    style={{
                      padding: "15px 25px",
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <section style={{ maxWidth: "300px", width: "50%" }}>
                      <h4
                        style={{
                          color: "#FFFFFF",
                          fontSize: "10px",
                          display: "block",
                          textAlign: "center",
                          width: "100%",
                          padding: "0px 0px 5px",
                        }}
                      >
                        Mobile Slide Selection
                      </h4>
                      <FormikControl
                        control="media-image"
                        name={`default_portrait`}
                        image={enterprise.default_portrait}
                      />
                    </section>
                    <section style={{ maxWidth: "300px", width: "50%" }}>
                      <h4
                        style={{
                          color: "#FFFFFF",
                          fontSize: "10px",
                          display: "block",
                          textAlign: "center",
                          width: "100%",
                          padding: "0px 0px 5px",
                        }}
                      >
                        Desktop Slide Selection
                      </h4>
                      <FormikControl
                        control="media-image"
                        name={`default_landscape`}
                        image={enterprise.default_landscape}
                      />
                    </section>
                  </div>
                );
              }}
            </FormikContainer>
          )}
        </div>
      </div>

      <FormikContainer initialValues={initialValues}>
        {(formik) => {
          return (
            <div>
              {employees.map((employee) => (
                <div key={employee.id} style={{ margin: 20 }}>
                  <EmployeeCard
                    pages={pages}
                    token={cookies.userAuthToken}
                    user={employee}
                    id={employee.id}
                    title={`${employee.prefix}${employee.first_name || "Unamed "
                      } 
                    ${employee.middle_initial}
                    ${employee.last_name || "Employee"} ${employee.suffix}`}
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

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const token = req.cookies["userAuthToken"];

  if (!token) return res.writeHead(301, { Location: "/" });

  const resp = await client.query({
    query: GET_USER_PAGES,
    variables: { token, metadata: { presentation: false, self: true, token } },
  });

  const data = resp.data?.getUserByToken;

  if (!resp.error) {
    const pages = data?.pages.map(({ id, name }) => ({
      label: `${name} (${id})`,
      id,
    }));
    console.log([{ label: `Main (${data?.id})`, id: data?.id }, ...pages]);
    return {
      props: {
        pages: [
          { label: `Main (${data?.id})`, id: data?.id },
          ...pages,
        ] as string[],
      },
    };
  }
};
