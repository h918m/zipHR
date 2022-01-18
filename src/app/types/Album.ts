import { Photo } from "./Photo";

export type Album = {
    id: number;
    title: string;
    userId: number;
    photos: Photo[];
}