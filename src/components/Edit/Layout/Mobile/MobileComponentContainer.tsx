import { BackToManagerBtn } from "@shared/Buttons/NavButtons";
import FActionsBtn from "@shared/Buttons/SlidesBtn/SlideActionsBtn/FActionsBtn";
import UserProfile from "@shared/UserProfile/UserProfile"
import { useRouter } from "next/router";
import Styles from "./MobileDashboard.module.scss";
interface Props {
    pagesChild?: boolean;
}

function Header({ pagesChild }: Props) {
    const router = useRouter();
    return (
        <div
            className={Styles.buttonsContainer}

        >
            {/* Page Manager Button */}

            <BackToManagerBtn />


            <FActionsBtn
                title={`Files`}
                padding="0.5rem 2rem"
                bgColor="white"
                borderRadius={"20px"}
                color="black"
                actions={() => router.push('/edit/files')}
            />
            <section style={{ marginTop: "0.5rem" }}>
                <UserProfile section="edit" />
            </section>
        </div>
    )
}

export default function MobileComponentContainer({ children }) {
    return (
        <div>
            <Header />
            <div style={{ padding: "1rem" }}>
                {children}
            </div>
        </div>
    )
}