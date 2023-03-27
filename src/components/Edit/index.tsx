import { setCurrentPageId } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Layout from "./Layout/Layout";

const Edit: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.userAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      console.log("main uuser => ", user)
      // dispatch(setCurrentPageId(user.id))
    }
  }, [user])
  if (user.id) return <Layout userId={user.id} />;
  return <></>
};

export default Edit;
