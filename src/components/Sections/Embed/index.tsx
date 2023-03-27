import React from "react"
import ReactHtmlParser from 'react-html-parser';

export default function EmbedSection({ embed }) {
    return (
        <div style={{ backgroundColor: embed.background_color, width: "100vw", height: "100vh" }}> {ReactHtmlParser(embed.embed_code)} </div>
    )
}