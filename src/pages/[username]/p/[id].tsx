import { useLazyQuery } from "@apollo/client";
import { client } from "@graphql/index";
import { GET_PAGE, GET_PAGE_SECURITY } from "@graphql/query";
import { setVreel, setVreelMetadata } from "@redux/createSlice/vreelSlice";
import Sections from "@sections/Sections";
import PrivacyScreen from "@shared/privacy";
import { GetServerSideProps } from "next"
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
//nsf
export default function ({ result }) {
    const securedPayload = result?.data?.pageIsSecure;

    const router = useRouter();
    const { id } = router.query
    const [getVreel, { data, error }] = useLazyQuery(GET_PAGE);
    console.log(id)
    const [vreelContent, setVreelContent] = useState(null);
    const [showSecure, setShowSecure] = useState<boolean>(securedPayload?.Secured);

    const dispatch = useDispatch();
    useEffect(() => {
        if (data) {
            console.log(data)
            const vreel = data.page
            dispatch(setVreel(vreel));
            dispatch(setVreelMetadata({ employee: vreel?.id }));
            setVreelContent(vreel);
        }
        if (error) {
            console.log(error)
        }

    }, [data, error])

    useEffect(() => {
        if (!showSecure) {
            getVreel({
                variables: {
                    id,
                    metadata: {
                        presentation: true
                    }
                }
            })
        }
    }, [])

    async function getAuthenticatedVreel(key: string) {
        getVreel({
            variables: {
                id,
                metadata: {
                    presentation: true,
                    passcode: key
                }
            }
        }).catch((err) => err.message)


    }
    const user = data?.username
    const metaName = user?.companyName !== "" ? user?.companyName : user?.username;
    const metaImageSrc = user?.vreel?.display_options?.default_logo !== "" ? user?.vreel?.display_options?.default_logo : "/icons/Vreel_logo_small.svg"

    return (
        <div>
            <Head>
                <title>{`${metaName}'s`} VReel</title>
                <meta property="og:image" content={metaImageSrc} />
            </Head>
            {vreelContent &&
                <Sections vreel={vreelContent} />
            } {
                showSecure &&
                <PrivacyScreen logo={securedPayload.PageLogo} pageId={id} setKey={getAuthenticatedVreel} />
            }
        </div>
    );

}

export const getServerSideProps: GetServerSideProps<any> = async ({ params, res }) => {
    const { id } = params;
    const result = await client.query({
        query: GET_PAGE_SECURITY,
        variables: { id: id, context: "page" }
    })

    console.log(result)
    // const { data, error } = await client.query({ query: GET_PAGE, variables: { id, presentation: true } })
    // if (!data) return res.writeHead(301, { Location: '/' })
    return {
        props: {
            result
        }
    }
}