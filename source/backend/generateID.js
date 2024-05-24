// generateID.js

// Hard coded length of the ID and characters in ID
const ID_LENGTH = 50;
const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Get the ID container from local storage, if there is none, return an empty object
 * @returns {Array[String]} the IDContainer object in localStorage
 */
function getIDContainerFromStorage() {
  const IDContainer = window.localStorage.getItem("IDContainer");
  if (IDContainer === null) {
    alert("ID Container does not exist to get from storage");
    return null;
  }
  else {
    return JSON.parse(IDContainer);
  }
}

/**
 * Takes in an array of strings that reprent the ID Container and save it in local storage
 * @param {Array<String>} an IDContainer object
 */
function saveIDContainerToStorage(IDContainer) {
  window.localStorage.setItem('IDContainer', JSON.stringify(IDContainer));
}

/**
 * Generate a random ID that is not in the ID container
 * @returns {String} a randomly generated ID
 */
function generateID() {
  const IDContainer = getIDContainerFromStorage();
  let newID = '';

  // Generate a new ID until it is unique
  do {
    newID = '';
    for (let i = 0; i < ID_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
      newID += CHARACTERS[randomIndex];
    }
  } while (IDContainer.includes(newID));

  // Add the new ID to the ID container and save it
  IDContainer.push(newID);
  saveIDContainerToStorage(IDContainer);
  return newID;
}

// Export the generateID function
export { generateID };