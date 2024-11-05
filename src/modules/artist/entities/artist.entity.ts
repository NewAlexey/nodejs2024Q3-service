import { randomUUID } from 'crypto';

export class ArtistEntity {
  public id: string;
  public name: string;
  public grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = grammy;
  }
}
