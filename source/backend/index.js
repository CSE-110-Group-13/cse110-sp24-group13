// Initialize local storage
window.addEventListener("DOMContentLoaded", initializeLocalStorage);

/**
 * Initializes the note, project, task table, and IDContainer in local storage
 */
function initializeLocalStorage() {
  // Create the tables in local storage if they do not exist
  const tables = ["NoteTable", "ProjectTable", "TaskTable"];
  tables.forEach(table => {
    if (window.localStorage.getItem(table) === null) {
      localStorage.setItem(table, JSON.stringify({}));
    }
  })

  // Create the ID container to check whether an ID is used
  if (window.localStorage.getItem("IDContainer") === null) {
    localStorage.setItem("IDContainer", JSON.stringify([]));
  }
}