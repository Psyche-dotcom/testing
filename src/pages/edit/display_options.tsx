import EditorContext from "@edit/context";
import DisplayOptions from "@edit/DisplayOptions/DisplayOptions";

export default function () {
  return (
    <EditorContext module="display_options">
      <DisplayOptions />
    </EditorContext>
  );
}
