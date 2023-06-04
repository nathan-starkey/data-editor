import { init } from "../src/scripts/api";

init(new class {
  init: boolean = false;
  file: FileSystemFileHandle | null = null;
  json: any;

  newProject(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async openProject(): Promise<void> {
    let [file] = await showOpenFilePicker();
    let blob = await file.getFile();
    let text = await blob.text();
    let json = JSON.parse(text);

    this.file = file;
    this.json = json;
  }
  
  saveProject(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getName(): string {
    return this.file == null ? "" : this.file.name;
  }

  getTypes(): string[] {
    return ["items"];
  }

  getObjects(type: string): string[] {
    throw new Error("Method not implemented.");
  }

  newObject(type: string): string {
    throw new Error("Method not implemented.");
  }

  deleteObject(type: string, id: string): void {
    throw new Error("Method not implemented.");
  }
});