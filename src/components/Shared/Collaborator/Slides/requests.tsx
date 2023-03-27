import { useMutation } from "@apollo/client"
import { PLACE_COLLAB_SLIDE } from "@graphql/mutations";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn"
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";

interface Props {
    slides: any[];
    refetch();
    context: {
        isSection: boolean
        collectionId: string
    }
}

export default function SlideRequests({ slides, refetch, context }: Props) {
    const [placeSlide] = useMutation(PLACE_COLLAB_SLIDE);
    const [{ userAuthToken: token }] = useCookies(["userAuthToken"]);
    const { currentPageId } = useSelector((state: RootState) => state.editorSlice)
    function handlePlaceSlice(collabId: string,) {
        console.log("context =>", context, collabId)
        placeSlide({
            variables: {
                token,
                input: {
                    collabId,
                    ...context
                }
            }
        })
            .then(refetch)
            .catch(console.log)
    }
    return (
        <div style={{ padding: "1rem" }}>
            {/*<section>*/}
            {/*    <label style={{ color: 'white' }}>Collab Slides</label>*/}
            {/*</section>*/}
            {
                slides?.map((slide => (
                    <div style={{
                        backgroundColor: "white",
                        height: "4rem",
                        margin: "1rem",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between"
                    }}>
                        <div style={{ paddingTop: "1.5rem", paddingLeft: "1rem" }}>
                            <label>{slide.title.header}</label>
                        </div>
                        <div style={{ paddingRight: "1rem" }}>
                            <FActionsBtn
                                // Icon={BsPlus}
                                title="Accept"
                                padding="7px 13px"
                                bgColor="green"
                                color="white"
                                actions={() => handlePlaceSlice(slide.collabRef)} />
                        </div>
                    </div>
                )))
            }
        </div>
    )
}