import { components } from "@edit/data";
import EditFiles from "@edit/Files/EditFiles/EditFiles";
import DesktopDashboard from "@edit/Layout/Desktop/DesktopDashboard";
import EditorLayout from "@edit/Layout/Layout";
import MobileForm from "@edit/Layout/Mobile/MobileForm";
import { setModule } from "@redux/createSlice/editorSlice";
import { RootState } from "@redux/store/store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Loader } from "@shared/Loader/Loader";


interface EditorContextProps {
  module: String;
  children: React.ReactNode;
}

export default function EditorContext({
  children,
  module,
}: EditorContextProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [{ userAuthToken }] = useCookies(["userAuthToken"]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1023);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.userAuth)
  function handleResize() {
    setIsMobile(window.innerWidth < 1023)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  //   const { component: Component } = components.find(
  //     ({ title }) => title === module
  //   );
  useEffect(() => {
    if (userAuthToken) {
      if (!user) {
        router.push("/login");
        return
      }
    }
    if (!userAuthToken) {
      router.push("/login");
      return;
    }
    setAuthenticated(true);
    dispatch(setModule(module));
  }, [user]);
  if (!authenticated) return (
    <Loader />
  )
  if (!module) {
    if (isMobile) {
      return <MobileForm />
    } else {
      return <DesktopDashboard children={<EditFiles />} />
    }

  }
  return <EditorLayout mobile={isMobile} children={children} userId="" />;
}
