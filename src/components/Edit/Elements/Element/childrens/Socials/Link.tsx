import FormikControl from "@formik/FormikControl"
import useDebounce from "@hooks/useDebounce";
import useDidMountEffect from "@hooks/useDidMountEffect";
import { useState } from "react"

export default function LinkInput({ social, removeLink, ui, updateLink }) {
    const [raw, setRaw] = useState(social.username);
    const debounce = useDebounce(raw);

    useDidMountEffect(() => {
        updateLink(social.id, debounce);
    }, [debounce])

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "100%" }}>
                <FormikControl
                    key={social.id}
                    control="input"
                    type="text"
                    value={raw}
                    name={`socials`}
                    onChange={e => setRaw(e.target.value)}
                    placeholder="Username"
                    required={true}
                    social={{ logo: ui?.logo, title: ui?.title }}
                />
            </div>
            <section style={{ paddingTop: "27px", marginLeft: "-30px" }}>
                <button onClick={(e) => { removeLink(social.id) }}>
                    <img
                        src="/assets/delete-bin-2-line.svg"
                        alt="Icons delete"
                    />
                </button>
            </section>
        </div>
    )
}