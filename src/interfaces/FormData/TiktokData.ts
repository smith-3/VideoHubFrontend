import { UploadStatus } from "@/enums/UploadStatus";

export interface Tiktok {
    title: string;
    tags: string[];
    mentions: string[];
    schedule: boolean;
    scheduleDate?: string;
    status: UploadStatus;
}

export const createInitialTiktok = (): Tiktok => ({
    title: "",
    tags: [],
    mentions: [],
    schedule: false,
    status: UploadStatus.Pendiente
});