import EditorContext from "@edit/context";
import Elements from "@edit/Elements/Elements";
import { RootState } from "@redux/store/store";
import { useSelector } from "react-redux";

export default function () {
  const { currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  return (
    <EditorContext module="sections">
      <Elements />
    </EditorContext>
  );
}
