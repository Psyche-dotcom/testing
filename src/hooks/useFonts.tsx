import React, { useEffect, useState } from "react"

interface Font {

    fontName: string
}

export default function useFonts(request: { fontFace: string, uri: string }[]) {
    const [fonts, setFonts] = useState<Font[]>();
    const [data, setData] = useState(request)
    // const
    async function fetchFonts() {
        const requestArray: Promise<FontFace>[] = [];
        data.forEach(async (request) => {
            const promise = new FontFace(request.fontFace, `url(${request.uri}`).load();
            new FontFace(request.fontFace, `url(${request.uri}`).load().catch(err => { });
            requestArray.push(promise)
        })

        const fonts = await Promise.all(requestArray);

        for (let i = 0; i < fonts.length; i++) {
            document.fonts.add(fonts[i])
        }
        setFonts(fonts.map((font) => ({ fontName: font.family })));

    }
    useEffect(() => {
        fetchFonts()
        return () => {
            // document.fonts.delete()
        }
    }, [data]);

    return { fonts, setFonts: setData };
}