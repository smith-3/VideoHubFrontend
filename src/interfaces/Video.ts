import { Facebook } from "./FormData/FacebookData";
import { Instagram } from "./FormData/InstagramData";
import { Tiktok } from "./FormData/TiktokData";

export interface Video{
    id: string;
    title: string;
    videoFile: File;
    thumbnailUrl: string;
    check: boolean;

    tiktok: Tiktok;
    facebook: Facebook;
    instagram: Instagram;
}