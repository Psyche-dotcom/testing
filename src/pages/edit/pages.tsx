import EditorContext from "@edit/context";
import PageManager from "@edit/Layout/pages";
import PrivacyPage from "@edit/Layout/Privacy";
import PrivacyScreen from "@shared/privacy";

export default function () {
    return (
        <EditorContext module={null}>
            <PageManager />
        </EditorContext>
    );
}
