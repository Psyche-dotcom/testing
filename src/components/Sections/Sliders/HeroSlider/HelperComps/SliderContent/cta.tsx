import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Styles from "./SliderContent.module.scss";
import clsx from "clsx";
import controller from "src/controller";

const MediaUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL

interface Props {
    buttonFontName: string;
    ctaButtonPosition: string;
    cta: {
        link_header: string;
        link_url: string;
        link_type: string;
    },
    navigateToSlide: (id: string) => void;
    navigateToSection: (id: string) => void
}

export default function CallToActionButton({
    navigateToSection,
    navigateToSlide,
    buttonFontName,
    ctaButtonPosition,
    cta: { link_type, link_header, link_url }
}: Props): JSX.Element {
    const [textLength, setTextLength] = useState<number>(0);
    const router = useRouter();
    //const [ctaButtonPosition, setCtaButtonPosition] = useState("center"); // It could be center OR side
    // const [ctaButtonPosition, setCtaButtonPosition] = useState("center"); // It could be center OR side
    useEffect(() => {
        if (link_header.length > 10) {
            setTextLength(13);
        } else {
            setTextLength(8);
        }

    }, []);
    return (
        <>
            {(() => {
                switch (link_type.toLowerCase() || "url") {
                    case "document":
                        return (
                            <button
                                style={{ fontFamily: buttonFontName }}
                                className={ctaButtonPosition !== "center" ? "cta-button" : "btn-slide"}
                                onClick={() => {
                                    window.open(`/view/doc/${encodeURIComponent(link_url)}`)
                                }}
                            >
                                <a>{link_header}{" "}</a>
                            </button>
                        );
                    case "call":
                        return (
                            <button className={ctaButtonPosition !== "center" ? "cta-button" : ""}>
                                <a
                                    className={ctaButtonPosition !== "center" ? "" : "btn-slide"}
                                    style={{
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`tel:${link_url}`}
                                >
                                    {link_header}
                                </a>
                            </button>
                        );
                    case "text":
                        return (
                            <button className={ctaButtonPosition !== "center" ? "cta-button" : ""}>
                                <a
                                    className={ctaButtonPosition !== "center" ? "" : "btn-slide"}
                                    style={{
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`sms:${link_url}`}
                                >
                                    {link_header}
                                </a>
                            </button>
                        );
                    case "employee":
                        return (
                            <button className={ctaButtonPosition !== "center" ? "cta-button" : ""}>
                                <a
                                    className={ctaButtonPosition !== "center" ? "" : "btn-slide"}
                                    style={{
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`/api/vcard?id=${link_url}`}
                                >
                                    {link_header}
                                </a>
                            </button>
                        );
                    case "email":
                        return (
                            <button className={ctaButtonPosition !== "center" ? "cta-button" : ""}>
                                <a
                                    className={ctaButtonPosition !== "center" ? "" : "btn-slide"}
                                    style={{
                                        fontFamily: buttonFontName,
                                    }}
                                    href={`mailto:${link_url}`}
                                >
                                    {link_header}
                                </a>
                            </button>
                        );
                    case "document":
                        return (
                            <button className={ctaButtonPosition !== "center" ? "cta-button" : ""}>
                                <a
                                    target="_blank"
                                    onClick={() => alert(link_url)}
                                    className={ctaButtonPosition !== "center" ? "" : "btn-slide"}
                                    style={{
                                        fontFamily: buttonFontName,
                                    }}
                                    href={link_url}
                                >
                                    {link_header}
                                </a>
                            </button>
                        );
                    case "url":
                        return (
                            <button
                                className={ctaButtonPosition !== "center" ? "cta-button" : "btn-slide"}
                                style={{ fontFamily: buttonFontName }}
                                onClick={() => {
                                    switch (link_type) {
                                        // case "URL":
                                        case "url":
                                        case "URL":
                                        case "":

                                            if (
                                                link_url.startsWith("https://")
                                            )
                                                link_header?.trim() ===
                                                    "LOGIN"
                                                    ? window.open(
                                                        link_url,
                                                        "_self"
                                                    )
                                                    : window.open(
                                                        link_url,
                                                        "_blank"
                                                    );
                                            else router.push(link_url);
                                            break;

                                        default:
                                            break;
                                    }
                                }}
                            >
                                <a>{link_header}{" "}</a>
                            </button>
                        );
                    case "page":
                        return (
                            <button
                                className={ctaButtonPosition !== "center" ? "cta-button" : "btn-slide"}
                                style={{ fontFamily: buttonFontName }}
                                onClick={() => {
                                    window.open(link_url)
                                }}
                            >
                                <a>{link_header}{" "}</a>
                            </button>
                        )
                    case "slide":
                        return (
                            <button
                                style={{ fontFamily: buttonFontName }}
                                className={ctaButtonPosition !== "center" ? "cta-button" : "btn-slide"}
                                onClick={() => {
                                    navigateToSlide(link_url);
                                }}
                            >
                                <a>{link_header}{" "}</a>
                            </button>
                        );
                    case "sections":
                        return (
                            <button
                                onClick={() =>
                                    controller.navigateToSection(link_url)
                                }
                                className={ctaButtonPosition !== "center" ? "cta-button" : "btn-slide"
                                }
                                style={{
                                    fontFamily: buttonFontName,
                                }}
                            >
                                <a>{link_header}</a>
                            </button>
                        );
                }
            })()}
        </>
    )

}