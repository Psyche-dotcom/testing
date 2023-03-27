import EditorContext from "@edit/context";
import PrivacyPage from "@edit/Layout/Privacy";
import PrivacyScreen from "@shared/privacy";

export default function () {
  return (
    <EditorContext module="privacy">
      <PrivacyPage />
    </EditorContext>
  );
}
