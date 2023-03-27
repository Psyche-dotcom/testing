import axios from "axios";
import { SectionTypes } from "../types";

const MEDIA_TELEMETRY_URL = `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL}/usage`

interface DownloadTelemetryPacket {
    sectionId: string
    sectionType: SectionTypes
    time: number;
}

export default class UsageTelementryController {
    account: { username: string, pageId: string };
    que: DownloadTelemetryPacket[];
    resolutionTimeout: NodeJS.Timeout;
    resolutionTimeoutDelay: number;
    requestController: AbortController;
    cachedSectionIds: string[];

    constructor({ username, pageId }, delay: number) {
        this.account = { username, pageId };
        this.resolutionTimeout = null;
        this.resolutionTimeoutDelay = delay;
        this.que = [];
        this.cachedSectionIds = [];
        this.requestController = new AbortController();
    }

    recordDownload(packet: DownloadTelemetryPacket) {
        if (this.cachedSectionIds.includes(packet.sectionId)) return;
        clearTimeout(this.resolutionTimeout);
        this.que.push(packet);
        this.resolutionTimeout = setTimeout(() => {
            this.resolvePacketQue()
        }, this.resolutionTimeoutDelay);
    }

    private resolvePacketQue() {
        this.requestController.abort();
        const packets = this.que;
        console.log("resolving telem: ", packets)
        //empty que after request resolves
        axios
            .post(`${MEDIA_TELEMETRY_URL}/record`,
                { account: this.account, packets },
                { signal: this.requestController.signal })
            .then(res => this.que = []);
    }
}