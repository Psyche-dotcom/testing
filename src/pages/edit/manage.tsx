import EditorContext from "@edit/context";
import DisplayOptions from "@edit/DisplayOptions/DisplayOptions";
import ManagerPage from "@edit/Manager";


export default function Manager() {
    return (
        <EditorContext module="manager">
            <ManagerPage />
        </EditorContext>
    );
}