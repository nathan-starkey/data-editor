import { PostInitState, PreInitState, StateManager, init } from "../src/scripts/api";

type Data = {
  books: {
    id: string,
    [s: string]: any
  }[],
  magazines: {
    id: string,
    [s: string]: any
  }[],
  cds: {
    id: string,
    [s: string]: any
  }[],
};

class DemoPreInitState implements PreInitState {
  init: false = false;

  async newProject(stateManager: StateManager): Promise<void> {
    let file: FileSystemFileHandle;

    try {
      file = await showSaveFilePicker();
    } catch (err) {
      return;
    }

    let json: Data = {
      books: [],
      magazines: [],
      cds: []
    };

    // Need to invoke save project on the new handle
    let state = new DemoPostInitState(file, json);

    state.saveProject(stateManager);

    stateManager.setState(state);
  }

  async openProject(stateManager: StateManager): Promise<void> {
    let file: FileSystemFileHandle;

    try {
      [file] = await showOpenFilePicker();
    } catch (err) {
      return;
    }

    let blob = await file.getFile();
    let text = await blob.text();
    let json = JSON.parse(text);

    // Example of parsing unknown data for stronger TypeScript understanding

    if (
      // Parse the typeof root
      typeof json != "object" || json == null ||

      // Parse the structure of root
      !Array.isArray(json.books) ||
      !Array.isArray(json.magazines) ||
      !Array.isArray(json.cds) ||

      // Parse the typeof of root.books[n]
      (json.books as any[]).some(o =>
        typeof o != "object" || o == null ||
        typeof o.id != "string") ||

      // Parse the typeof of root.magazines[n]
      (json.magazines as any[]).some(o =>
        typeof o != "object" || o == null ||
        typeof o.id != "string") ||

      // Parse the typeof of root.cds[n]
      (json.cds as any[]).some(o =>
        typeof o != "object" || o == null ||
        typeof o.id != "string")
    ) {
      throw new Error("invalid project file");
    }

    stateManager.setState(new DemoPostInitState(file, json));
  }
}

class DemoPostInitState implements PostInitState {
  init: true = true;
  data: Data;
  handle: FileSystemFileHandle;

  constructor(handle: FileSystemFileHandle, data: Data) {
    this.handle = handle;
    this.data = data;
  }

  async saveProject(stateManager: StateManager): Promise<void> {
    let text = JSON.stringify(this.data, undefined, 2);
    let writable = await this.handle.createWritable();

    await writable.write(text);
    await writable.close();
  }

  getProjectName(): string {
    return this.handle.name;
  }

  getTypes(): string[] {
    return ["Books", "Magazines", "CDs"];
  }

  getObjectIdsOfType(type: string): string[] {
    switch (type) {
      case "Books":
        return this.data.books.map(o => o.id);
      case "Magazines":
        return this.data.magazines.map(o => o.id);;
      case "CDs":
        return this.data.cds.map(o => o.id);;
      default:
        throw new Error("unknown type");
    }
  }
}

init(new DemoPreInitState());