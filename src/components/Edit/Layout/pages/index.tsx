import { setCurrentPageId } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store"
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import PageProfileEditor, { CreatePageView } from "@shared/PageProfile/editor";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import Styles from "../Desktop/Dashboard-lg-sidebar.module.scss";
//^^ recycling styles. update these
export default function PageManager(): JSX.Element {
    const { pages, currentPageId } = useSelector((state: RootState) => state.editorSlice);
    const { user } = useSelector((state: RootState) => state.userAuth);
    const router = useRouter();

    if (window.innerWidth > 500) router.push('/edit/home')


    const dispatch = useDispatch();
    return (
        <div>
            <div>
                {/* Create The Page View */}
                <CreatePageView />
            </div>
            <div>
                {/* list all pages */}
                {pages.map((page) => (
                    <div
                        className={clsx(
                            Styles.buttonWrapper__elementWrapper__Pages__Page,
                            currentPageId === page.id &&
                            Styles.buttonWrapper__elementWrapper__Pages__Page__Active
                        )}
                        onClick={() => dispatch(setCurrentPageId(page.id))}
                    >
                        <span
                            className={clsx(
                                Styles.buttonWrapper__elementWrapper__Pages__Page__Radio,
                                currentPageId === page.id &&
                                Styles.buttonWrapper__elementWrapper__Pages__Page__Radio__Active
                            )}
                        ></span>
                        <span
                            className={
                                Styles.buttonWrapper__elementWrapper__Pages__Page__Toggle
                            }
                        >
                            <img src="/assets/icons/showhide.png" alt="show-hide" />
                        </span>
                        {/*<FormikControl name="page_visible" control="toggle_show_hide" />*/}
                        <div
                            className={
                                Styles.buttonWrapper__elementWrapper__Pages__Page__ButtonWrapper
                            }
                        >
                            <PageProfileEditor page={page} />

                            <FActionsBtn
                                title={`View Page`}
                                padding="5px 5px"
                                bgColor="#ff7a00"
                                color="white"
                                actions={() => {
                                    window.open(`${process.env.NEXT_PUBLIC_SITE_BASE_URL}/${user.username}/p/${page.id}`)
                                    dispatch(setCurrentPageId(page.id))
                                }}
                            />
                            <FActionsBtn
                                title={`Copy Page URL`}
                                padding="5px 5px"
                                bgColor="#ff7a00"
                                color="white"
                                actions={() => {
                                    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SITE_BASE_URL}/${user.username}/p/${page.id}`)
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}