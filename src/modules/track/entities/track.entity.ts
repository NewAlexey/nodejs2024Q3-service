import { v4 } from 'uuid';

export class TrackEntity {
  public id: string;
  public name: string;
  public duration: number;
  public artistId: string | null;
  public albumId: string | null;

  constructor(name: string, duration: number, artistId = null, albumId = null) {
    this.id = v4();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
