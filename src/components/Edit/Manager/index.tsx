import { FormikContainer } from "@formik/FormikContainer";
import FormikControl from "@formik/FormikControl";
import { FormikContext, FormikProvider } from "formik";
import { FC } from "react";
import PlanSelector from "./plan.card";
import { ProgressBar } from "./progress";

interface Props {

}

const test_data = {
    username: "amarsh",
    email: "aaronmarsh7555@gmail.com"
};

const ManagerPage: FC<Props> = ({ }) => {
    return (
        <div>
            <div>
                <h1>Account</h1>
            </div>

            <div>
                <section>
                    <FormikContainer value={test_data}>
                        {
                            (formik) => (
                                <form>
                                    <div>
                                        Username
                                        <FormikControl
                                            name="username"
                                            type="text"
                                            control="input"
                                        />
                                    </div>
                                    <div>
                                        Email
                                        <FormikControl
                                            name="email"
                                            type="text"
                                            control="input"
                                        />
                                    </div>
                                </form>
                            )
                        }
                    </FormikContainer>

                </section>
                <div >
                    <label>Account Type</label>
                    <label> Top Plans</label>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <PlanSelector />
                    </div>
                </div>
                <div style={{ color: "white" }}>
                    <div>
                        <section>
                            Usage
                            <label>Storage</label>
                            <ProgressBar />
                            <label>Bandwidth</label>
                            <ProgressBar />
                        </section>
                        <section>
                            Maintanance
                            <button>Delete</button>
                            <button>Deactivate</button>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerPage;