import React from "react";
import Styles from './search.module.scss'

interface Props {
    setValue(v: string): void
}

export const SearchBar: React.FC<Props> = ({ setValue }) => {
    return (
        <div className={Styles.searchContainer}>
            {/* <p className={Styles.searchContainer__label}> Search Members</p> */}
            <div className={Styles.searchContainer__groupInput}>
                <img
                    src="/assets/icons/search-icon.svg"
                    alt="Back to page manager"
                    className={Styles.searchContainer__groupInput__icon}
                />
                <input placeholder="Search" onChange={e => setValue(e.target.value)} className={Styles.searchContainer__groupInput__input} />
            </div>

        </div>
    )
}