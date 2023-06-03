import { addNote, removeNote, updateObjectList, updateProject } from "./dom";

export function init(provider: NullProvider | Provider) {
  globalThis["state"] = new State(provider);
}

export interface NullProvider {
  init: false;

  /**
   * Initialize with a new project.
   */
  newProject(): Promise<void>;

  /**
   * Initialize with an existing project.
   */
  openProject(): Promise<void>;
}

export interface Provider {
  init: true;

  /**
   * Save all changes to the project.
   */
  saveProject(): Promise<void>;

  /**
   * Get the project's display name.
   */
  getName(): string;

  /**
   * Get an exhaustive list of object types.
   */
  getTypes(): string[];

  /**
   * Get all objects of the specified type.
   * @param type Type of objects to return.
   */
  getObjects(type: string): string[];

  /**
   * Create a new object of the specified type.
   * @param type Type of object to create.
   */
  newObject(type: string): string;

  /**
   * Delete an object of the specified type by it's ID.
   * @param type Type of object to delete.
   * @param id Object-to-remove's ID.
   */
  deleteObject(type: string, id: string): void;
}

export class State {
  provider: NullProvider | Provider;
  
  isBusy = false;
  isSaved = true;

  constructor(provider: NullProvider | Provider) {
    this.provider = provider;
  }

  // TODO: Document this.
  private updateProject() {
    updateProject(this.provider.init ? this.provider.getName() : undefined, this.isBusy, this.isSaved);
    this.updateObjectList();
  }

  // TODO: Document this.
  private updateObjectList() {
    updateObjectList(this.provider.init ? Object.fromEntries(this.provider.getTypes().map(type => [type, (this.provider as Provider).getObjects(type)])) : {});
  }

  /**
   * Safely invoke the provider's newProject method.
   */
  async newProject(): Promise<void> {
    if (this.isBusy || this.provider.init) return;
    
    this.isBusy = true;
    this.updateProject();

    removeNote("projectError");

    try {
      await this.provider.newProject();
    } catch (err) {
      console.error(err);
      addNote("projectError", "Failed to create project (see console)", "error");
    }

    this.isBusy = false;
    this.updateProject();
  }

  /**
   * Safely invoke the provider's openProject method.
   */
  async openProject(): Promise<void> {
    if (this.isBusy || this.provider.init) return;
    
    this.isBusy = true;
    this.updateProject();

    removeNote("projectError");

    try {
      await this.provider.newProject();
    } catch (err) {
      console.error(err);
      addNote("projectError", "Failed to open project (see console)", "error");
    }

    this.isBusy = false;
    this.updateProject();
  }

  /**
   * Safely invoke the provider's saveProject method.
   */
  async saveProject(): Promise<void> {
    if (this.isBusy || this.isSaved || !this.provider.init) return;
    
    this.isBusy = true;
    this.updateProject();

    removeNote("projectError");

    try {
      await this.provider.saveProject();
    } catch (err) {
      console.error(err);
      addNote("projectError", "Failed to save project (see console)", "error");
    }

    this.isBusy = false;
    this.isSaved = true;
    this.updateProject();
  }

  // TODO: Implement and document this.
  newObject(type: string): string {
    throw new Error("Method not implemented.");
  }

  // TODO: Implement and document this.
  deleteObject(type: string, id: string): void {
    throw new Error("Method not implemented.");
  }
}

/*
newProject
openProject
-
saveProject
getName
getTypes
getObjects
newObject
deleteObject
*/