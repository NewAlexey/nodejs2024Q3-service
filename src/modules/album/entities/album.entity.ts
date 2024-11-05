import { v4 } from 'uuid';

export class AlbumEntity {
  public id: string;
  public name: string;
  public year: number;
  public artistId: string | null;

  constructor(name: string, year: number, artistId = null) {
    this.id = v4();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
