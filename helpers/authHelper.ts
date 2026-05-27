import { readFileSync } from 'fs';

export class AuthHelper {
  static isTokenExpired(filePath: string): boolean {
    const fileData = readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileData);
    const token = parsedData.origins[0].localStorage[0].value;
    if (!token) {
      return true;
    }
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const nowTime = new Date().getTime() / 1000;
    return payload.exp < nowTime;
  }

  static readExistingToken() {
    const filePath = '.auth/loggedin-user-state.json';
    const fileData = readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(fileData);
    const token = parsedData.origins[0].localStorage[0].value;
    return token;
  }
}
