import { v4 } from 'uuid';

export class ArtistEntity {
  public id: string;
  public name: string;
  public grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = v4();
    this.name = name;
    this.grammy = grammy;
  }
}
