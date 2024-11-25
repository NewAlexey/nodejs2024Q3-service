import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly HASH_SALT = process.env.CRYPT_SALT ?? 10;

  public async hashValue(password: string): Promise<string> {
    return hash(password, Number(this.HASH_SALT));
  }

  public async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(plainPassword, hashedPassword);
  }
}
