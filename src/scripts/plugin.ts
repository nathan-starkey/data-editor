export interface UseFolder {
  kind: "folder";

  /**
   * Open the project from a folder.
   * @param handle Folder handle to open from.
   */
  openFolder(handle: FileSystemDirectoryHandle): Promise<void>;

  /**
   * Save the project to a folder.
   * @param handle Folder handle to save to.
   */
  saveChanges(handle: FileSystemDirectoryHandle): Promise<void>;
}

export interface UseFile {
  kind: "file";

  /**
   * Open the project from a file.
   * @param handle File handle to open from.
   */
  openFile(handle: FileSystemFileHandle): Promise<void>;

  /**
   * Save the project to a file.
   * @param handle File handle to save to.
   */
  saveChanges(handle: FileSystemFileHandle): Promise<void>;
}

export interface PluginBase {
  /**
   * Get a list of asset types.
   * @returns String array of types.
   */
  getAssetTypes(): string[];

  /**
   * Get a list of asset ids of a specific type.
   * @param type Asset type in question.
   * @returns String array of asset ids.
   */
  getAssetsOfType(type: string): string[];

  /**
   * Create an asset of a specific type.
   * @param type Asset type in question.
   * @returns The created asset's id.
   */
  createAsset(type: string): string;

  /**
   * Delete a specific asset.
   * @param type The asset's type.
   * @param id The asset's id.
   */
  deleteAsset(type: string, id: string): void;

  /**
   * Handle when a specific asset is selected.
   * @param type The asset's type.
   * @param id The asset's id.
   */
  selectAsset(type: string, id: string): void;

  /**
   * Handle when a specific asset is deselected.
   * @param type The asset's type.
   * @param id The asset's id.
   */
  deselectAsset(type: string, id: string): void;

  /**
   * Handle when the project is modified.
   */
  onChange(): void;
}

export type Plugin = (PluginBase & UseFolder) | (PluginBase & UseFile);