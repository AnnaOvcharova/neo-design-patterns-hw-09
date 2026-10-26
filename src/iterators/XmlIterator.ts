import * as fs from "fs";
import * as path from "path";
import { UserData } from "../data/UserData";

export class XmlIterator implements Iterable<UserData> {
  private users: UserData[] = [];

  constructor(filePath: string) {
    const resolvedPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(resolvedPath)) {
      return;
    }
    const content = fs.readFileSync(resolvedPath, "utf-8");
    const userBlocks = content.match(/<user>([\s\S]*?)<\/user>/g) || [];

    for (const block of userBlocks) {
      const idMatch = block.match(/<id>([\s\S]*?)<\/id>/);
      const nameMatch = block.match(/<name>([\s\S]*?)<\/name>/);
      const emailMatch = block.match(/<email>([\s\S]*?)<\/email>/);
      const phoneMatch = block.match(/<phone>([\s\S]*?)<\/phone>/);

      if (idMatch && nameMatch) {
        this.users.push({
          id: Number(idMatch[1].trim()),
          name: nameMatch[1].trim(),
          email: emailMatch ? emailMatch[1].trim() : "",
          phone: phoneMatch ? phoneMatch[1].trim() : "",
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