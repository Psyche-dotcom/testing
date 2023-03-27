import { useMutation } from "@apollo/client"
import { CANCEL_COLLABORATION_REQUEST, CREATE_COLLABORATION_REQUEST, SET_COLLABORATION_REQUEST_STATUS } from "@graphql/mutations"
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import Styles from "./Collaborator.module.scss";

interface Props {
    slideId: string
}
type: String!
recipient: String!
item_id: String!

function RequestItem({ request, token, handleRemoveRequest }) {
    function handleRemove(e) {
        e.preventDefault();
        handleRemoveRequest(request.id)
    }
    return (
        <div className={Styles.collaborator__item}>
                <div className={Styles.collaborator__item__logo}>
                    {request.username.charAt(0)}
                </div>
                <div className={Styles.collaborator__item__name}>
                    <h3>{request.username}</h3>
                    <small>Collaborator -  {request.status}</small>
                    <p>Sponsor</p>
                </div>

                    <button
                        onClick={handleRemove}>X</button>
        </div>
    )
}

export default function CollaboratorCard({ slideId }: Props) {
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { values } = useFormikContext<any>();
    const [createRequest] = useMutation(CREATE_COLLABORATION_REQUEST);
    const [cancelRequest] = useMutation(CANCEL_COLLABORATION_REQUEST);
    const [username, setUsername] = useState<string>("");
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const reqs = values?.advanced?.collaboration_requests;
        if (reqs) setRequests(reqs)
    }, [])

    function handleAddCollaborator() {
        createRequest({
            variables: {
                token,
                input: {
                    type: "slide",
                    recipient: username,
                    item_id: slideId
                }
            }
        }).then(({ data }) => {
            toast.success("Send Invite Request");
            const newRequest = {
                username,
                id: data.createCollabRequest.message,
                status: "pending"
            }
            setRequests(prev => [...prev, newRequest])
        })
            .catch((err => {
                toast.error(err.message)
            }))
    }

    function handleRemoveCollaborator(collabId: string) {
        cancelRequest({
            variables: {
                token,
                collabId
            }
        }).then(() => {
            setRequests(prev => {
                return prev.filter(r => r.id !== collabId)
            })
        })
            .catch(console.log)
    }

    return (
        <div className={Styles.collaborator}>
            <h4>Invite Collaborator</h4>
            <label>Search Username/Email</label>
            <input
                placeholder="Username/ Email"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <FActionsBtn
                title="Submit"
                bgColor="#424242"
                color="white"
                padding="8px 23px"
                borderRadius="8px"
                actions={handleAddCollaborator}
            />
            <div className={Styles.collaborator__items}>
                {
                    requests?.map((req) => (
                        <section>
                            <RequestItem handleRemoveRequest={handleRemoveCollaborator} token={token} request={req} />
                        </section>
                    ))
                }
            </div>


        </div>
    )
}