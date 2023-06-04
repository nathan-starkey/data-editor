import { addNote, removeNote, updateObjectList, updateProject } from "./dom";

export function init(state: State | StateManager) {
  let stateManager = state instanceof StateManager ? state : new StateManager(state);

  globalThis["stateManager"] = stateManager;
}

export interface PreInitState {
  init: false;

  /**
   * Initialize a new project.
   */
  newProject(stateManager: StateManager): Promise<void>;

  /**
   * Initialize an existing project.
   */
  openProject(stateManager: StateManager): Promise<void>;
}

export interface PostInitState {
  init: true;

  /**
   * Save all changes to the project.
   */
  saveProject(stateManager: StateManager): Promise<void>;

  /**
   * Get the project's display name.
   */
  getProjectName(): string;
  
  /**
   * Get an exhaustive list of object types.
   */
  getTypes(): string[];

  /**
   * Get all object ids of the specified type.
   * @param type Type of objects to return.
   */
  getObjectIdsOfType(type: string): string[];
}

export type State = PreInitState | PostInitState;

// TODO: Remove and implement methods into PostInitState
export interface Provider_ {
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

export class StateManager {
  state: State;
  isBusy = false;
  isSaved = true;

  constructor(state: State) {
    this.setState(state);
  }

  /**
   * Change the state and re-render the UI to reflect any changes.
   * @param state 
   */
  setState(state: State) {
    this.state = state;
    this.updateProject();
    this.updateObjectList();
  }

  /**
   * Re-render affected UI components to reflect changes to the project.
   */
  updateProject() {
    let projectName = this.state.init ? this.state.getProjectName() : undefined;
    
    updateProject(projectName, this.isBusy, this.isSaved);
  }

  /**
   * Re-render affected UI components to reflect changes to the object list.
   */
  updateObjectList() {
    let objectIdsByType = {};
    let types = this.state.init ? this.state.getTypes() : [];

    for (let type of types) {
      let objectIds = (this.state as PostInitState).getObjectIdsOfType(type);

      objectIdsByType[type] = objectIds;
    }

    updateObjectList(objectIdsByType);
  }

  /**
   * Attempt to initialize a new project.
   */
  async newProject(): Promise<void> {
    if (this.isBusy || this.state.init) return;
    
    this.isBusy = true;
    this.updateProject();

    removeNote("projectError");

    try {
      await this.state.newProject(this);
    } catch (err) {
      console.error(err);
      addNote("projectError", "Failed to create project (see console)", "error");
    }

    this.isBusy = false;
    this.updateProject();
    this.updateObjectList();
  }

  /**
   * Attempt to initialize an existing project.
   */
  async openProject(): Promise<void> {
    if (this.isBusy || this.state.init) return;
    
    this.isBusy = true;
    this.updateProject();

    removeNote("projectError");

    try {
      await this.state.openProject(this);
    } catch (err) {
      console.error(err);
      addNote("projectError", "Failed to open project (see console)", "error");
    }

    this.isBusy = false;
    this.updateProject();
    this.updateObjectList();
  }

  /**
   * Attempt to save all changes to the project.
   */
  async saveProject(): Promise<void> {
    if (this.isBusy || this.isSaved || !this.state.init) return;
    
    this.isBusy = true;
    this.updateProject();

    removeNote("projectError");

    try {
      await this.state.saveProject(this);
    } catch (err) {
      console.error(err);
      addNote("projectError", "Failed to save project (see console)", "error");
    }

    this.isBusy = false;
    this.isSaved = true;
    this.updateProject();
    this.updateObjectList();
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