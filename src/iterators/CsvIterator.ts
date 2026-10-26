import * as fs from "fs";
import * as path from "path";
import { UserData } from "../data/UserData";

export class CsvIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    const content = fs.readFileSync(resolvedPath, "utf-8");
    const lines = content.split("\n").map((line) => line.trim()).filter(Boolean);

    for (let i = 1; i < lines.length; i++) {
      const [id, name, email, phone] = lines[i].split(",");
      if (id && name) {
        this.users.push({
          id: Number(id),
          name: name.trim(),
          email: email ? email.trim() : "",
          phone: phone ? phone.trim() : "",
        });
      }
    }
  }

  *[Symbol.iterator](): Iterator<UserData> {
    for (const user of this.users) {
      yield user;
    }
  }
}