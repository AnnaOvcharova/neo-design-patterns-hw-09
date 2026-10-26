import { DataExporter } from "./DataExporter";

export class XmlExporter extends DataExporter {
  protected render(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<users>\n';

    for (const user of this.data) {
      xml += "  <user>\n";
      xml += `    <id>${user.id}</id>\n`;
      xml += `    <name>${user.name}</name>\n`;
      xml += `    <email>${user.email}</email>\n`;
      xml += `    <phone>${user.phone}</phone>\n`;
      xml += "  </user>\n";
    }

    xml += "</users>";
    return xml;
  }

  protected afterRender(): void {
    this.result += `\n<!-- Експорт згенеровано: ${new Date().toISOString()} -->`;
  }

  protected save(): void {
    this.writeToFile("users.xml", this.result);
  }
}
