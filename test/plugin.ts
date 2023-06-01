import { Plugin, PluginBase, UseFile } from "../src/scripts/plugin";

import { renderFileStatus, renderItemList } from "../src/scripts/templates";

document.addEventListener("DOMContentLoaded", () => {
  renderFileStatus("folder", false, "", false, false);

  renderItemList({
    creatures: ["cow", "duck", "zebra", "crab"],
    items: ["sword", "notsword"]
  }, true, "creatures", "crab", () => void 0)
});

export class MyPlugin implements PluginBase, UseFile {
  kind: "file" = "file";
  openFile(handle: FileSystemFileHandle): Promise<void> {
    throw new Error("Method not implemented.");
  }
  saveChanges(handle: FileSystemFileHandle): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAssetTypes(): string[] {
    throw new Error("Method not implemented.");
  }
  getAssetsOfType(type: string): string[] {
    throw new Error("Method not implemented.");
  }
  createAsset(type: string): string {
    throw new Error("Method not implemented.");
  }
  deleteAsset(type: string, id: string): void {
    throw new Error("Method not implemented.");
  }
  selectAsset(type: string, id: string): void {
    throw new Error("Method not implemented.");
  }
  deselectAsset(type: string, id: string): void {
    throw new Error("Method not implemented.");
  }
  onChange(): void {
    throw new Error("Method not implemented.");
  }
}