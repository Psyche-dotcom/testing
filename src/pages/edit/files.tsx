import EditorContext from "@edit/context";
import EditFiles from "@edit/Files/EditFiles/EditFiles";
import File from "@edit/Files/File/File";

export default function FileManager() {
  return (
    <EditorContext module="files">
      <EditFiles />
    </EditorContext>
  );
}
