import React, { useRef, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import clsx from "clsx";
import { FilesDataType } from "../FilesData";
import Styles from "./FileInput.module.scss";
import {
  showMobilePreview,
  showPreviewActions,
} from "src/redux/createSlice/createMenuSlice";
import { gql, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import Alert from "src/components/Shared/Alert/Alert";
import { useAppDispatch } from "@redux/store/store";

const EIDT_SCHEMA = gql`
  mutation renameFile($token: String!, $newName: String!, $fileId: String!) {
    editFileName(token: $token, newName: $newName, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const DELETE_SCHEMA = gql`
  mutation deleteFile($token: String!, $fileId: String!) {
    deleteFile(token: $token, fileId: $fileId) {
      succeeded
      message
    }
  }
`;
const FileInput: React.FC<{
  item: FilesDataType;
  type: string;
  refetch: Function;
}> = ({ item, type, refetch }) => {
  const [editable, setEditable] = useState(false);
  const [cookies] = useCookies(["userAuthToken"]);
  const inputRef = useRef(null);
  const dispatch = useAppDispatch();
  const [renameItem] = useMutation(EIDT_SCHEMA);
  const [isAlertActive, setAlertActive] = useState<boolean>(false);
  const [deleteItem] = useMutation(DELETE_SCHEMA);
  return (
    <div className={Styles.fileInputContainer}>
      <Alert
        open={isAlertActive}
        text="Are you sure to remove it?"
        noCallback={() => setAlertActive(false)}
        yesCallback={() => {
          setAlertActive(false);
          deleteItem({
            variables: {
              token: cookies["userAuthToken"],
              fileId: item.id,
            },
          })
            .then((res: any) => {
              if (res?.data?.deleteFile.succeeded) {
                refetch();
                toast.success(`${type} delete successfully`);
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        }}
      />

      <div
        className={clsx(
          Styles.inputContainer,
          editable ? Styles.inputActive : Styles.inputDeactive
        )}
      >
        <label>Filename</label>
        <input
          ref={inputRef}
          disabled={!editable}
          defaultValue={item.name}
          type="text"
        />
      </div>
      <div className={Styles.fileBtnContainer}>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            setAlertActive(true);
            toast.dismiss();
          }}
        >
          <span className={Styles.delText}>Delete</span>
          <span className={Styles.icon}>
            <img src="/assets/delete-bin-2-line.svg" alt="Icons delete" />
          </span>
        </button>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            setEditable(true);
            if (editable) {
              renameItem({
                variables: {
                  token: cookies["userAuthToken"],
                  newName: inputRef?.current?.value,
                  fileId: item.id,
                },
              })
                .then((res) => {
                  if (res?.data?.editFileName.succeeded) {
                    refetch();
                    toast.success(`${type} File Rename Successfully`);
                  }
                })
                .catch((error) => {
                  toast.error(error.message);
                });
              setEditable(false);
            }
          }}
        >
          <span className={Styles.delText}>Rename</span>
          <span className={Styles.icon}>
            <img src="/assets/ball-pen-line.svg" alt="Icons rename" />
          </span>
        </button>
        <button
          className={Styles.iconButtons}
          onClick={() => {
            dispatch(showPreviewActions({ type: type, payload: item.url }));
            dispatch(showMobilePreview(true));
          }}
        >
          {type === "audio" ? (
            <BsHeadphones className={Styles.viewIcon} />
          ) : (
            <AiOutlineEye className={Styles.viewIcon} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FileInput;
