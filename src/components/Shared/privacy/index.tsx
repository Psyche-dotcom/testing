import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Yup from "yup";
import { ApolloConsumer, useLazyQuery, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

// import Styles from "./Login.module.scss";
import { userAuthReducer } from "@redux/createSlice/userSlice";
import { GET_USER_BY_TOKEN, LOGIN_QUERY } from "@graphql/query";

import BtnForm from "@shared/BtnForn/BtnForm";
import AuthContainer from "@shared/AuthContainer/AuthContainer";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { SEND_EMAIL_INVITATION } from "@graphql/mutations";

const initialValues = {
    email: "",
    passcode: "",
};
const validationSchema = Yup.object({
    email: Yup.string().email("Must be a valid email").required("Required"),
    password: Yup.string().required("No password provided."),
    // .min(8, "Password is too short - should be 8 chars minimum."),
    // .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});


const InputToggle: React.FC<{ acceptPassscode: boolean, setAcceptPasscode: (v: boolean) => void }> = ({ acceptPassscode, setAcceptPasscode }) => {
    const styles = {
        // height: "1rem",
        width: "5rem",
        padding: "0.8rem",
    }
    return (
        <div style={{ display: "flex" }}>
            <button onClick={() => setAcceptPasscode(false)} style={{ ...styles, backgroundColor: !acceptPassscode ? "gray" : "white" }}>Email</button>
            <button onClick={() => setAcceptPasscode(true)} style={{ ...styles, backgroundColor: acceptPassscode ? "gray" : "white" }}>Passcode</button>

        </div>
    )
}


const PrivacyScreen = ({ setKey, pageId, logo }) => {
    const [acceptPasscode, setAcceptPasscode] = useState(false);
    const [values, setValues] = useState<typeof initialValues>(initialValues)
    const [sendEmailRequest] = useMutation(SEND_EMAIL_INVITATION);
    function handleSubmit(e) {
        e.preventDefault();
        console.log(values)
        if (!acceptPasscode) {
            console.log(values)
            sendEmailRequest({
                variables: {
                    pageId,
                    email: values.email
                }
            }).then(console.log)
                .catch(console.log)
        } else {
            setKey(values.passcode)
        }
    }
    // const [] = useMutation(Resuk);
    return (
        <AuthContainer logo={logo}>
            <ApolloConsumer>
                {
                    (client) => {
                        return <div></div>;
                    } /* do stuff here */
                }
            </ApolloConsumer>
            <div>
                <div>
                </div>
                <div>
                    <h4>Access Page</h4>
                    <section style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                        <InputToggle acceptPassscode={acceptPasscode} setAcceptPasscode={setAcceptPasscode} />
                        {/* <button style={{ backgroundColor: "white", padding: "1rem" }}
                            onClick={() => setAcceptPasscode(prev => !prev)}
                        >{acceptPasscode ? "Passcode" : "Email"}
                        </button> */}
                    </section>
                    <FormikContainer
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {(formik) => {
                            setValues(formik.values)
                            return (
                                <form
                                    style={{ padding: "1rem" }}
                                    onSubmit={handleSubmit}
                                >
                                    {
                                        acceptPasscode ? (
                                            <FormikControl
                                                control="input"
                                                type="passcode"
                                                placeholder="passcode"
                                                name="passcode"
                                            />
                                        ) :
                                            (
                                                <FormikControl
                                                    control="input"
                                                    type="email"
                                                    placeholder="email"
                                                    name="email"
                                                />
                                            )
                                    }



                                    <div style={{ alignItems: "center", justifyContent: "center", display: "flex" }} >
                                        <BtnForm title="Enter" type="submit" formik={formik} />
                                    </div>
                                </form>
                            );
                        }}
                    </FormikContainer>



                    <div >
                        {/* <p>
              Don't have an account?
              <>
                <br />
              </>
              <Link href="/register">
                <span className={Styles.signUpBtn}>Sign Up FREE!</span>
              </Link>
            </p> */}
                    </div>
                </div>
            </div>
        </AuthContainer>
    );
};

export default PrivacyScreen;
