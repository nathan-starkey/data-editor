export function renderProjectStatus(handle: null, isBusy: boolean): void;
export function renderProjectStatus(handle: FileSystemEntry, isBusy: boolean, isSaved: boolean): void;
export function renderProjectStatus(handle: FileSystemEntry | null, isBusy: boolean, isSaved?: boolean) {
  let btnOpenProject = document.getElementById("btnOpenProject") as HTMLButtonElement;
  let btnNewProject = document.getElementById("btnNewProject") as HTMLButtonElement;
  let btnSaveProject = document.getElementById("btnSaveProject") as HTMLButtonElement;
  let lblProjectName = document.getElementById("lblProjectName") as HTMLElement;

  btnOpenProject.hidden = handle != null;
  btnNewProject.hidden = handle != null;
  btnSaveProject.hidden = handle == null;
  lblProjectName.hidden = handle == null;

  btnOpenProject.disabled = isBusy;
  btnNewProject.disabled = isBusy;
  btnSaveProject.disabled = isBusy || Boolean(isSaved);

  lblProjectName.innerText = handle ? handle.name : "";
}

export function renderNewItemDropdown(show: boolean): void;
export function renderNewItemDropdown(show: null | FileSystemEntry): void;
export function renderNewItemDropdown(show: boolean | null | FileSystemEntry) {
  let divNewItemDropdown = document.getElementById("divNewItemDropdown") as HTMLDivElement;

  divNewItemDropdown.hidden = !Boolean(show);
}

/*
function addNote(cls: string[], content: string) {
  let div = document.getElementById()

  let note = document.createElement("div");
  
  note.setAttribute("class", "text text-center m-1 mb-0");
  note.classList.add("bg-secondary", "text-light", ...cls);
}

function addSubtleNote(content: string) {

}

/**
 * @deprecated
 * /
export function renderFileStatus(kind: "file" | "folder", hasHandle: boolean, name: string, isBusy: boolean, isSaved: boolean) {
  let btnOpenFile = document.getElementById("btnOpenFile") as HTMLButtonElement;
  let btnSaveFile = document.getElementById("btnSaveFile") as HTMLButtonElement;
  let lblFileName = document.getElementById("lblFileName") as HTMLElement;
  let btnNewFile = document.getElementById("btnNewFile") as HTMLButtonElement;

  btnOpenFile.hidden = hasHandle;
  btnSaveFile.hidden = !hasHandle;
  btnOpenFile.disabled = hasHandle || isBusy;
  btnSaveFile.disabled = !hasHandle || isBusy || isSaved
  btnOpenFile.innerText = "Open " + (kind == "file" ? "File" : "Project");
  btnSaveFile.innerText = "Save " + (kind == "file" ? "File" : "Project");
  lblFileName.innerText = hasHandle ? name : "No " + (kind == "file" ? "file" : "project") + " open.";
  btnNewFile.innerText = "New " + (kind == "file" ? "File" : "Project");
}

export function renderItemList(items: { [type: string]: string[] }, hasSelectedItem: boolean, selectedItemType: string, selectedItemId: string, selectItemCb: (type: string, id: string) => void){
  let container = document.getElementById("divItemList") as HTMLElement;
  let scrollTop = container.scrollTop;

  container.innerHTML = "";

  for (let [type, ids] of Object.entries(items)) {
    let head = document.createElement("div");
    let body = document.createElement("div");

    head.innerText = type;
    head.setAttribute("class", "list-group-header");
    body.setAttribute("class", "list-group list-group-flush mb-1");
    container.append(head, body);

    for (let id of ids) {
      let isItemSelected = hasSelectedItem && type == selectedItemType && id == selectedItemId;
      let elem = document.createElement("button");

      elem.innerText = id;
      elem.setAttribute("class", "list-group-item list-group-item-action" + (isItemSelected ? " active" : ""));
      body.append(elem);

      if (!isItemSelected) {
        elem.addEventListener("click", () => selectItemCb(type, id));
      }
    }
  }

  container.scrollTop = scrollTop;
}
*/