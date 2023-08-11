import { ArtistModel } from "../artist.mode";

export interface TrackModel{
    name: string;
    album: string;
    cover: string;
    url:string;
    _id: string|number;
    artis?: ArtistModel;
    uid:string;
    artist: string
}