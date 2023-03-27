import { client } from "@graphql/index";
import { ACCEPT_COLLABORATION_REQUEST, SET_COLLABORATION_REQUEST_STATUS } from "@graphql/mutations";
import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.userAuthToken;
    const requestId = req.query.request;
    if (!requestId) return res.status(401).json({ err: "missing request id" })
    if (!token) return res.redirect(307, 'https://vreel.page');
    client.mutate({
        mutation: ACCEPT_COLLABORATION_REQUEST,
        variables: {
            token: token,
            requestId,
        }
    })
        .finally(() => {
            console.log("finished !!")
            res.redirect(307, 'https://vreel.page')
            // res.end()
        })

    // res.status(200).json({ name: req.query.request, cookie: req.cookies })
}

