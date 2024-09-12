import { UploadStatus } from "@/enums/UploadStatus";

export interface Instagram {
    title: string;         // El título del video
    tags: string[];        // Etiquetas (tags) asociadas al video
    schedule: boolean;     // Si el video está programado para una fecha futura
    scheduleDate?: string; // Fecha de programación del video (opcional)
    status: UploadStatus;

}

export const InstagramData: Instagram = {
    title: "",
    tags: [],
    schedule: false,
    status: UploadStatus.Pendiente

}