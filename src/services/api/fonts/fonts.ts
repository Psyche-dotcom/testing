import axios from "axios";
const ApiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY;
const MediaServerEndpoint = process.env.NEXT_PUBLIC_MEDIA_BASE_URL
export async function GetFonts(family: string) {

    const { data } = await axios.get(`${MediaServerEndpoint}/fonts/font?family=${family}`);

    return data
}