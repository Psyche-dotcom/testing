import React, { useState, useEffect, useRef } from "react"
import { useMutation } from "@apollo/client"
import RequestItem from "./request"
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useFormikContext } from "formik";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { REMOVE_PAGE_INVITE, SEND_PAGE_INVITE } from "@graphql/mutations";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store/store";

export default function PrivacyRequests({ invitations, setInvitations }) {
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { currentPageId } = useSelector((state: RootState) => state.editorSlice);
    const { values, setFieldValue } = useFormikContext<any>();
    const [sendInvite] = useMutation(SEND_PAGE_INVITE);
    const [username, setUsername] = useState<string>("");
    const [requests, setRequests] = useState<any>([]);
    const [removeInvite] = useMutation(REMOVE_PAGE_INVITE);

    const emailRef = useRef<HTMLInputElement>();

    useEffect(() => {
        const reqs = values?.requests
        if (reqs) setRequests(reqs)

    }, [values?.requests])

    function sendPageInvite() {
        const email = emailRef.current.value;
        sendInvite({
            variables: {
                token,
                vreelId: currentPageId,
                email
            }
        })
            .then(({ data }) => {
                const { message: id } = data?.sendPageInvite;
                setInvitations(prev => [...prev, { id, email }])
            })
            .catch(console.log)
    }

    function handleRemove(id: string) {
        removeInvite({
            variables: {
                token,
                pageId: currentPageId,
                inviteId: id
            }
        }).then(() => {
            setInvitations(prev => prev.filter((item => item.id !== id)))
        })
            .catch(console.log)
    }

    return (
        <div>
            <input ref={emailRef} placeholder="email"
            style={{
                width: "100%",
                padding: "10px",
                border: "2px solid #ffffff",
                borderRadius: "10px"

            }}
            ></input>
            <FActionsBtn
                title="Add Email"
                bgColor="green"
                color="white"
                padding="8px 23px"
                borderRadius="8px"
                actions={sendPageInvite}
            />
            <div>
                <RequestItem handleRemove={handleRemove} requests={invitations as any} />
            </div>
        </div>

    )
}