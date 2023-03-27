import React from "react";
import Styles from "./Search.module.scss";

const Search: React.FC<{
  logo1: string;
  placeholder: string;
  field: any;
  rest: any;
}> = ({ logo1, placeholder, field, rest }) => {
  return (
    <div className={Styles.searchWrapper}>
      {logo1 && <img src={logo1} alt={`user Icon`} />}
      <input type="search" placeholder={placeholder} {...field} {...rest} />
    </div>
  );
};

export default Search;
