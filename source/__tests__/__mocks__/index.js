import { LocalStorage } from "node-localstorage";

/**
 * Mock window and localStorage object, as well as the alert function
 */ 
const mockObjects = () => {
  global.localStorage = new LocalStorage('./local-storage-mock');
  global.window = { localStorage: localStorage };
  global.alert = (message) => {
    console.log(message);
  };
};

/**
 *  Initialize the local storage with the tables and ID container
 */
function initializeLocalStorage() {
  // Create the tables in local storage if they do not exist
  const tables = ["NoteTable", "ProjectTable", "TaskTable"];
  tables.forEach(table => {
    if (window.localStorage.getItem(table) === null) {
      window.localStorage.setItem(table, JSON.stringify({}));
    }
  })

  // Create the ID container to check whether an ID is used
  if (window.localStorage.getItem("IDContainer") === null) {
    window.localStorage.setItem("IDContainer", JSON.stringify([]));
  }
}

export { mockObjects, initializeLocalStorage };