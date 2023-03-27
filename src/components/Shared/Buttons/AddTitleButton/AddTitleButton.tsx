import { MouseEventHandler } from "react";

const AddTitleButton: React.FC<{
  title: string;
  handler: MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}> = ({ title, handler, style }) => {
  return (
    <button
      type="button"
      style={style}
      onClick={handler}
      className="btn-add-image"
    >
      <span>{title}</span>
      <img src="/assets/icons/addLogo.svg" alt="Add Image Icon" />
    </button>
  );
};

export default AddTitleButton;
