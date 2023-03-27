import { useRouter } from "next/router"
import React from "react";
import Styles from "./NavButtons.module.scss";
export const BackToManagerBtn: React.FC = () => {

    const router = useRouter();

    function onClick() {
        router.push('/edit/pages');
    }
    return (
        <button className={Styles.button} onClick={onClick}><img
            src="/assets/icons/arrow-right-white.svg"
            alt="Back to page manager"
        /> Page Manager</button>
    )
}