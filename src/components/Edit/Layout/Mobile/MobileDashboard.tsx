import UserProfile from "../../../Shared/UserProfile/UserProfile";
import MobileForm from "./MobileForm";
import Styles from "./MobileDashboard.module.scss";
import ToggleButton from "./ToggleButton";
import { RootState, useAppDispatch } from "@redux/store/store";
import { removeAll } from "@redux/createSlice/createHeightSlice";
import { useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { toggleChangesFag } from "@redux/createSlice/trackChangesSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  triggerGlobalEdit,
  resetEditTrigger,
} from "@redux/createSlice/editorSlice";
const UPDATE_SLIDE = gql`
  mutation EditSlide($token: String!, $slideId: String!, $data: String!) {
    updateSlide(token: $token, slideId: $slideId, data: $data) {
      id
    }
  }
`;

export const changes = { slide: { refetch: null } };
const MobileDashboard: React.FC = ({ children }) => {
  const router = useRouter();
  const _dispatch = useDispatch();
  // const changesFag = useSelector(
  //   (state: RootState) => state.trackChanges.slide
  // );
  const [updateSlide] = useMutation(UPDATE_SLIDE);

  function resolveBatchFunctions() {
    _dispatch(triggerGlobalEdit());
    _dispatch(resetEditTrigger());
  }

  const handleSubmit = async (values) => {
    updateSlide({
      variables: {
        token: cookies.userAuthToken,
        slideId: values.id,
        data: JSON.stringify(values),
      },
    })
      .then((res) => {
        // changes?.slide?.refetch();
        // toast.success(`${values.title.header} updated!`);
      })
      .catch((err) => {
        toast.error(`Operation Failed for ${values.title.header}`);
      });
  };
  const [cookies, setCookie] = useCookies();
  const dispatch = useAppDispatch();
  return (
    <section className={Styles.mobileDash}>
      <div
        className={Styles.container}

      // className='flex justify-center px-4'
      >
        <div
          className={Styles.wrapper}
        // className='flex space-x-6'
        >
          <button
            onClick={() => {
              resolveBatchFunctions();
              alert("cliced");
              // changes.slide.refetch();
              // dispatch(removeAll());
              for (let slide in changes.slide) {
                if (slide != "refetch") {
                  handleSubmit(changes.slide[slide]);
                  delete changes.slide[slide];
                }
              }
              // toast.success(
              //   `${Object.keys(changes.slide).length - 1} slide(s) updated!`
              // );
              // if (Object.keys(changes.slide).length - 1)
              toast.success(`Changes are saved!`);
              if (changes.slide?.refetch) changes.slide?.refetch();

              // dispatch(toggleChangesFag());

              // router.reload();
            }}
            className="btn-save"
          >
            {"Save"}
          </button>
          {/* <ToggleButton /> */}
          <UserProfile section="edit" />
        </div>
      </div>

      <div className={Styles.content}>
        <MobileForm />
      </div>
    </section>
  );
};

export default MobileDashboard;

{
  /* <div>
<div
  onClick={() => {
    setButtonState(!buttonState);
    router.push('/');
  }}
  className={`border-2 border-white rounded-[38px] w-36  overflow-hidden flex transition-all duration-200 ease-in ${
    buttonState
      ? 'justify-start bg-vreel_gray '
      : 'justify-end  bg-secondary'
  }`}
>
  <button className='text-base capitalize px-4 py-2 bg-white text-black rounded-[38px] transition-all duration-200 ease-in'>
    {buttonState ? 'View' : 'Edit'}
  </button>
</div>
<p className='text-white font-medium text-sm mt-2'>
  Toggle To View VReel
</p>
</div> */
}
