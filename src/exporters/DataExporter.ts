import * as fs from "fs";
import * as path from "path";
import { UserData } from "../data/UserData";
import fetch from "node-fetch";

export abstract class DataExporter {
  protected data: UserData[] = [];
  protected result: string = "";

  public async export(): Promise<void> {
    await this.load();
    this.transform();
    this.beforeRender();
    this.result = this.render();
    this.afterRender();
    this.save();
  }

  protected async load(): Promise<void> {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    const rawUsers: any = await response.json();
    this.data = rawUsers;
  }

  protected transform(): void {
    this.data = this.data
      .map((user: any) => ({
        id: Number(user.id),
        name: String(user.name),
        email: String(user.email),
        phone: String(user.phone),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  protected beforeRender(): void {
    // hook
  }

  protected afterRender(): void {
    // hook
  }

  protected abstract render(): string;
  protected abstract save(): void;

  protected writeToFile(filename: string, content: string): void {
    const distDir = path.resolve(process.cwd(), "dist");
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distDir, filename), content, "utf-8");
  }
}
