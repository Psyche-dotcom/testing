import EditorContext from "@edit/context";
import EditorLayout from "@edit/Layout/Layout";
import Slides from "@edit/Slides/Slides/Slides";
import { RootState } from "@redux/store/store";
import { useSelector } from "react-redux";

export default function () {
  const { currentPageId } = useSelector(
    (state: RootState) => state.editorSlice
  );
  return (
    <EditorContext module="home">
      <Slides />
    </EditorContext>
  );
}
