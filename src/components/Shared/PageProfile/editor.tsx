import { useMutation } from "@apollo/client";
import { REMOVE_PAGE, UPDATE_PAGE_NAME } from "@graphql/mutations";
import useDebounce from "@hooks/useDebounce";
import useDidMountEffect from "@hooks/useDidMountEffect";
import { createPage, setEditorPages } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import { useRef, useState } from "react"
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export const CreatePageView = () => {
    const dispatch = useDispatch<any>();
    const [cookies] = useCookies(["userAuthToken"]);
    const nameRef = useRef<HTMLInputElement>();

    function handleCreatePage() {
        const name = nameRef.current.value;
        dispatch(createPage({ token: cookies.userAuthToken, name }))
    }
    return (
        <div>
            <input ref={nameRef} placeholder={"Name"} />
            <input placeholder={"Page Type"} />
            <FActionsBtn
                title={`Add New Page`}
                padding="7px 13px"
                bgColor="#ff7a00"
                color="white"
                actions={handleCreatePage}
            />
        </div>
    )
}

export default function PageProfileEditor({ page }): JSX.Element {
    const [disabled, setDisabled] = useState<boolean>(page.nonEditable ? true : false);
    const [raw, setRaw] = useState(page?.name);
    const [updatePageName] = useMutation(UPDATE_PAGE_NAME);
    const [removePage] = useMutation(REMOVE_PAGE)
    const value = useDebounce(raw);
    const [cookies] = useCookies(["userAuthToken"]);
    const { pages } = useSelector((state: RootState) => state.editorSlice)
    const dispatch = useDispatch();

    function handleDeletePage() {
        setDisabled(true);
        removePage({
            variables: {
                token: cookies.userAuthToken,
                page: page.id
            }
        }).then(() => {
            const filtered = pages.filter(($page) => $page.id !== page.id)
            dispatch(setEditorPages(filtered))
        })
            .catch(() => alert("failed to remove page"))
            .finally(() => {
                setDisabled(false)
            })

    }

    useDidMountEffect(() => {
        updatePageName({
            variables: {
                token: cookies.userAuthToken,
                name: value,
                page: page.id
            }
        })
    }, [value]);

    return (
        <div>
            <input disabled={disabled} value={raw} onChange={e => setRaw(e.target.value)} />
            <input placeholder="Page Type" disabled={disabled} />

            {!disabled &&
                <FActionsBtn
                    title={`Delete`}
                    padding="5px 15px"
                    bgColor="#ff0000"
                    color="white"
                    actions={handleDeletePage}
                />
            }

        </div>
    )
}