import { useMutation, useQuery } from "@apollo/client";
import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import {
  SET_PAGE_INVITE_Duration,
  SET_PAGE_PASSWORD,
  SET_PAGE_SECURITY_STATE,
  SET_SECURED_IMAGE,
} from "@graphql/mutations";
import { GET_PAGE_INVITATION } from "@graphql/query";
import useDidMountEffect from "@hooks/useDidMountEffect";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import PrivacyRequests from "@shared/Collaborator/Privacy";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Styles from "./Privacy.module.scss"
import SlidesToggleButton from "@shared/Buttons/SlidesBtn/SlidesToggleButton/SlidesToggleButton";
import MediaSelectorGallery from "@formik/common/Media/MediaSelectorGridItem/MediaSelectorGallery";
const requests = [
  {
    id: "1",
    email: "aaronmarsh755@gmail.com",
  },
];

const inviteDurations = [
  { title: "5 minutes", value: "5m" },
  { title: "10 minutes", value: "10m" },
  { title: "30 minutes", value: "30m" },
  { title: "1 hour", value: "1h" },
];

export default function PrivacyPage() {
  const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
  const { currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  const [hasPasswordSet, setHasPasswordSet] = useState(false);
  const [securityOptions, setSecurityOptions] = useState<any>({
    password: "",
    requests: [],
    invite_duration: "",
    secured: null,
  });
  const [setPagePassword] = useMutation(SET_PAGE_PASSWORD);
  const [invitations, setInvitations] = useState([]);
  const { data, error } = useQuery(GET_PAGE_INVITATION, {
    variables: { token, pageId: currentPageId },
  });
  const [setPageInviteDuration] = useMutation(SET_PAGE_INVITE_Duration);
  const [setPageSecurityState] = useMutation(SET_PAGE_SECURITY_STATE);
  const [setSecuredImage] = useMutation(SET_SECURED_IMAGE);
  const [mediaSelectorOpen, setMediaSelectorOpen] = useState<boolean>(false);
  const passcodeRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (data) {
      console.log(data);
      setInvitations(data?.pageInvitations.invites);
      setSecurityOptions({ ...data?.pageInvitations });
    }
  }, [data, error]);

  useEffect(() => {
    console.log(securityOptions, invitations);
  }, [securityOptions]);

  function handleSetPageSecurityState() {
    setSecurityOptions((prev) => {
      const secured = !prev.secured;
      setPageSecurityState({
        variables: {
          token,
          page: currentPageId,
          secured: secured,
        },
      })
        .then(console.log)
        .catch(console.log);
      return { ...prev, secured };
    });
  }

  function handleSetPagePassword() {
    setPagePassword({
      variables: {
        token,
        vreelId: currentPageId,
        password: passcodeRef.current.value,
      },
    })
      .then(console.log)
      .catch(console.log);
  }
  useDidMountEffect(() => {
    console.log("security request changed");
  }, [securityOptions.requests]);

  function handleSetInviteDuration(e) {
    setSecurityOptions((prev) => ({
      ...prev,
      invite_duration: e.target.value,
    }));

    setPageInviteDuration({
      variables: {
        token,
        duration: e.target.value,
        vreelId: currentPageId,
      },
    })
      .then(console.log)
      .then(console.log);
  }

  function handleSetSecuredImage(item) {
    setSecuredImage({
      variables: {
        token,
        page: currentPageId,
        uri: item.uri
      }
    }).then((data)=> {
      console.log(data);
    })
  }

  return (
    <div style={{}}>
      <div className={Styles.privacyPage}
      >
        <div style={{ padding: "2rem" }}>
          <label style={{ fontSize: "20px", color: "white" }}>
            Page Security
          </label>
        </div>
        <div className={Styles.levelForm} >
          {data && (
            <FormikContainer initialValues={securityOptions}>
              {(formik) => {
                // const { invite_duration } = formik.values;
                // setSecurityOptions(prev => ({ ...prev, ...formik.values }))
                return (
                  <div>
                    <div className={Styles.levelForm__one}>
                      <MediaSelectorGallery 
                        open={mediaSelectorOpen}
                        setOpen={setMediaSelectorOpen}
                        setItem={handleSetSecuredImage}
                         />
                      <label>Level 1 - Passcode</label>
                      <div>
                      <button style={{ backgroundColor: "white", padding: "0.5rem" }} 
                      onClick={() => setMediaSelectorOpen(true)}>Select Secured Image</button>
                      </div>

                      <section>
                        <SlidesToggleButton
                          bgColor="#8D8D8D"
                          width={180}
                          height={30}
                          firstTitle="Private"
                          secondTitle="Public"
                          firstInnerText="Public"
                          secondInnertext="Private"
                          name="secured"
                        />

                      </section>
                      <section>
                        <input
                          type={"text"}
                          ref={passcodeRef}
                          placeholder="Passcode"
                        />
                      </section>

                      <section style={{ textAlign: "center" }}>

                        <FActionsBtn
                          title="Set Passcode"
                          bgColor="green"
                          color="white"
                          padding="8px 23px"
                          borderRadius="8px"
                          actions={handleSetPagePassword}
                        />
                      </section>
                    </div>

                    <div className={Styles.levelForm__two}>
                      <label>Level 2 - Email & Passcode</label>
                      <div className={Styles.slideTiming}>
                        <div className={Styles.slideTiming__label}>Passcode Timing</div>
                        <div className={Styles.slideTiming__rotate}>Rotate in</div>
                        {/*<div className={Styles.slideTiming__input}>*/}
                        {/*  <FormikControl*/}
                        {/*      name="transition_duration"*/}
                        {/*      control="input"*/}
                        {/*      placeholder="15"*/}
                        {/*      type="text"*/}
                        {/*      slideinput={true}*/}
                        {/*      advanced={true}*/}
                        {/*  />*/}
                        {/*</div>*/}
                        <div className={Styles.slideTiming__select}>
                          {/*<p>Minutes</p>*/}
                          <select
                            value={securityOptions?.invite_duration}
                            onChange={(e) => {
                              handleSetInviteDuration(e);
                            }}
                          >
                            {inviteDurations.map((item) => (
                              <option value={item.value}>{item.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <PrivacyRequests
                        invitations={invitations}
                        setInvitations={setInvitations}
                      />

                    </div>
                  </div>
                );
              }}
            </FormikContainer>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
