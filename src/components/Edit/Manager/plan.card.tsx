import { useRouter } from "next/router";
import { FC } from "react";
import { Plan, Plans } from "./data";

interface Props {
    plan: Plan
}

export const PlanCard: FC<Props> = ({ plan }) => {
    const router = useRouter();

    function handleNavigation() {

    }
    return (
        <div onClick={handleNavigation} style={{ backgroundColor: "white", height: "14rem", width: "7rem" }}>
            <section>
                <label>{plan.type}</label>
                <div>
                    <label>{plan.storage}</label>
                </div>
                <div>
                    <label>{plan.bandwidth}</label>
                </div>
                {
                    !plan.free &&
                    <div>
                        <label>+ Pro Features</label>
                    </div>
                }
                <div>
                    <button>
                        current
                        <label>{plan.price}</label>
                    </button>
                </div>
            </section>
        </div>
    )
}


export default function PlanSelector() {
    return (
        <div>
            <div style={{ display: "flex", gap: "2rem" }}>
                {
                    Plans.map(plan => (
                        <PlanCard plan={plan} />
                    ))
                }
            </div>
        </div>
    )
}