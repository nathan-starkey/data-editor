window["addNote"] = addNote;
window["removeNote"] = removeNote;

/**
 * Update DOM components with the current project state.
 */
export function updateProject(name: undefined, isBusy: boolean): void;
export function updateProject(name: string | undefined, isBusy: boolean, isSaved: boolean): void;
export function updateProject(name: string | undefined, isBusy: boolean, isSaved?: boolean) {
  let btnOpenProject = document.getElementById("btnOpenProject") as HTMLButtonElement;
  let btnNewProject = document.getElementById("btnNewProject") as HTMLButtonElement;
  let btnSaveProject = document.getElementById("btnSaveProject") as HTMLButtonElement;
  let lblProjectName = document.getElementById("lblProjectName") as HTMLElement;
  let txtFilter = document.getElementById("txtFilter") as HTMLInputElement;
  let ddlNewObject = document.getElementById("ddlNewObject") as HTMLDivElement;

  let hasProject = name != undefined;

  isSaved = Boolean(isSaved);

  btnOpenProject.hidden = hasProject;
  btnNewProject.hidden = hasProject;
  btnSaveProject.hidden = !hasProject;
  lblProjectName.hidden = !hasProject;
  txtFilter.hidden = !hasProject;
  ddlNewObject.hidden = !hasProject;

  btnOpenProject.disabled = isBusy;
  btnNewProject.disabled = isBusy;
  btnSaveProject.disabled = isBusy || isSaved;

  lblProjectName.innerText = name || "";
}

/**
 * Update the object list with a map of object IDs.
 * @param objectsByType Map of object IDs by their associated type.
 */
export function updateObjectList(objectsByType: { [type: string]: string[] }) {
  let sidebar = document.getElementById("sidebar") as HTMLDivElement;
  let objectList = document.getElementById("objectList") as HTMLDivElement;

  let scrollTop = sidebar.scrollTop;

  objectList.innerHTML = "";

  for (let type in objectsByType) {
    let objects = objectsByType[type];

    let head = document.createElement("div");
    let list = document.createElement("div");

    head.innerText = type;
    head.setAttribute("class", "list-group-header");
    list.setAttribute("class", "list-group list-group-flush mb-1");
    objectList.append(head, list);

    for (let id of objects) {
      // TODO: Implement 'isSelected' again.
      // let isSelected = hasSelectedItem && type == selectedItemType && id == selectedItemId;
      let item = document.createElement("button");

      item.innerText = id;
      item.setAttribute("class", "list-group-item list-group-item-action");
      list.append(item);

      // TODO: Implement object list item click callback
      // to "State" class, then from there to "Provider"
      // class.
      /*
      if (!isSelected) {
        elem.addEventListener("click", () => selectItemCb(type, id));
      }
      */
    }
  }

  sidebar.scrollTop = scrollTop;
}

/**
 * Get a string used to filter object IDs, or undefined.
 */
export function getFilterString(): string | undefined {
  let txtFilter = document.getElementById("txtFilter") as HTMLInputElement;

  return txtFilter.value || undefined;
}

/**
 * Remove a notification.
 */
export function removeNote(id: string) {
  let notes = document.getElementsByClassName("note");
  
  for (let note of notes as HTMLCollectionOf<HTMLElement>) {
    if (note.dataset.id == id) {
      note.remove();
      return;
    }
  }
}

/**
 * Display a notification.
 * @param id Unique ID for this note.
 * @param content Text content to display.
 * @param style Style used to convey it's purpose.
 * @param subtle Whether to show the note subtly or not.
 */
export function addNote(id: string, content: string, style?: "default" | "success" | "warning" | "error" | "info" | "debug", subtle?: boolean) {
  removeNote(id);

  let note = document.createElement("div");

  note.dataset.id = id;
  note.innerText = content;
  note.classList.add("note", "text", "text-center", "d-block");

  switch (style) {
  case "success":
    note.classList.add("bg-success", "text-light");
    break;
  case "warning":
    note.classList.add("bg-warning", "text-dark");
    break;
  case "error":
    note.classList.add("bg-danger", "text-light");
    break;
  case "info":
    note.classList.add("bg-info", "text-dark");
    break;
  case "debug":
    note.classList.add("bg-debug", "text-light");
    break;
  default:
    note.classList.add("bg-secondary", "text-light");
  }
  
  if (subtle) {
    note.classList.add("m-1", "mb-0");
    document.getElementById("notesSubtle")!.append(note);
  } else {
    note.classList.add("mb-1");
    document.getElementById("notes")!.append(note);
  }
}