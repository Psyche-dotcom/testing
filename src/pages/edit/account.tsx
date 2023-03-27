import AccountSettings from "@edit/AccountSettings/AccountSettings/AccountSettings";
import EditorContext from "@edit/context";

export default function AccountSettingsView(): JSX.Element {
  return (
    <EditorContext module="contact_information">
      <AccountSettings />
    </EditorContext>
  );
}
