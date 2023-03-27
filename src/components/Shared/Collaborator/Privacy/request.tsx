import { useMutation, useQuery } from "@apollo/client"
import { PLACE_COLLAB_SLIDE } from "@graphql/mutations";
import { GET_PAGE_INVITATION } from "@graphql/query";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn"
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

interface Props {
    requests: [{ email: string, id: string }]
    handleRemove(id: string)

}

export default function PrivacyCollabRequest({ requests, handleRemove }: Props) {
    const [placeSlide] = useMutation(PLACE_COLLAB_SLIDE);
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { currentPageId } = useSelector((state: RootState) => state.editorSlice);
    const { setValues } = useFormikContext();
    return (
        <div >
            {

                requests?.map((r => (
                    <div key={r.id} style={{
                        backgroundColor: "white",
                        padding: "15px",
                        color: "block",
                        borderRadius: "10px",
                        display: "block",
                        position: "relative",
                        marginTop: "15px"
                    }}>
                        <div>
                            <label style={{color: "black", fontSize: "12px"}}>{r.email}</label>
                        </div>

                        <div style={{ position: "absolute", right: "1rem", top: "-3px" }}>
                            <FActionsBtn
                                title="Remove"
                                padding="2px 10px"
                                bgColor="red"
                                color="white"
                                fontSize="12px"
                                actions={() => handleRemove(r.id)} />
                        </div>
                    </div>
                )))
            }
        </div>
    )
}