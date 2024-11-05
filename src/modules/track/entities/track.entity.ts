import { randomUUID } from 'crypto';

export class TrackEntity {
  public id: string;
  public name: string;
  public duration: number;
  public artistId: string | null;
  public albumId: string | null;

  constructor(name: string, duration: number, artistId = null, albumId = null) {
    this.id = randomUUID();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }
}
