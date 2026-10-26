import * as fs from "fs";
import * as path from "path";
import { UserData } from "../data/UserData";

export class JsonIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(resolvedPath, "utf-8");
    this.users = JSON.parse(content);
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}