import axios from "axios";

const MediaServerEndpoint = process.env.NEXT_PUBLIC_MEDIA_BASE_URL
export async function GetAudioFiles(term: string, token: string) {

    const { data } = await axios.get(`${MediaServerEndpoint}/data/files/audio?term=${term}&token=${token}`);

    return data
}

export async function getFileNameByUri(uri: string) {
    const { data } = await axios.get(`${MediaServerEndpoint}/data/files/filename/byUri?uri=${uri}`);
    return data;
}

export async function GetMediaFiles(term: string, token: string) {
    const { data } = await axios.get(`${MediaServerEndpoint}/data/files/media?term=${term}&token=${token}`);
    return data;
}