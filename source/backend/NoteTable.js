// NoteTable.js

/**
 * The NoteTable in localStorage is in the format:
 * {
 *    "noteID" : noteObject
 * }
 */

/**
 * Each noteObject in the table is in the format:
 * {
 *    "noteID" : "",
 *    "text" : "",
 *    "date" : "",
 *    "lastEdited" : "",
 *    "title" : "", 
 *    "projectList" : [],
 *    "favorited" : False,
 *    "tags" : []
 * }
 */

// Import the generateID function from generateID.js
import { generateID } from "./generateID.js";

/**
 * Get the note table from local storage, if there is none, return an empty object
 * @returns {Object} the NoteTable object in localStorage
 */
function getNoteTableFromStorage() {
  const noteTable = window.localStorage.getItem("NoteTable");
  if (noteTable === undefined) {
    alert("Note table does not exist to get from storage");
    return undefined;
  }
  else {
    return JSON.parse(noteTable);
  }
}

/**
 * Takes in a note table, and save it in local storage
 * @param {Object} a NoteTable object
 */
function saveNoteTableToStorage(noteTable) {
  window.localStorage.setItem('NoteTable', JSON.stringify(noteTable));
}

/**
 * Takes in an ID, return the note object that maps to that ID
 * @param {String} noteID - the ID of the note to look up to in the table 
 * @returns {Object} the note object that map to the ID
 */
function getNoteFromTable(noteID) {
  const noteTable = getNoteTableFromStorage();
  if (noteID in noteTable) {
    return noteTable[noteID];
  }
  else {
    alert(`NoteID: ${noteID} does not exist to save to storage`);
    return undefined;
  }
}

/**
 * Takes in an ID and a note object, save the note object in the table and update the local storage
 * @param {String} noteID - the ID of the note to save
 * @param {Object} noteObject - the note object to save
 */
function saveNoteToTable(noteID, noteObject) {
  const noteTable = getNoteTableFromStorage();
  if (noteID in noteTable) {
    noteTable[noteID] = noteObject;
    saveNoteTableToStorage(noteTable);
  }
  else {
    alert(`NoteID: ${noteID} does not exist to save to storage`);
  }
}

/**
 * Takes in an ID, delete the note object that maps to that ID from the table and update the local storage
 * @param {String} noteID - the ID of the note to delete
 */
function deleteNoteFromTable(noteID) {
  const noteTable = getNoteTableFromStorage();
  delete noteTable[noteID];
  saveNoteTableToStorage(noteTable);
}

/**
 * Create a new note object with the given parameters, save it in the table and update the local storage
 * @param {String} text - the text of the note
 * @param {String} date - the date of the note
 * @param {String} lastEdited - the last edited date of the note
 * @param {String} title - the title of the note
 * @param {Array<String>} projectList - the list of project the note belongs to
 * @param {Boolean} favorited - whether the note is favorited
 * @param {Array<String>} tags - the list of tags of the note
 * @returns {Object} the note object that was created
 */
function createNewNoteObject(text="", date="", lastEdited="", title="", projectList=[], favorited="", tags=[]) {
  const newNoteObject = {
    "noteID" : `note-${generateID()}`,
    "text" : text,
    "date" : date,
    "lastEdited" : lastEdited,
    "title" : title, 
    "projectList" : projectList,
    "favorited" : favorited,
    "tags" : tags
  }

  const noteTable = getNoteTableFromStorage();
  noteTable[newNoteObject.noteID] = newNoteObject;
  saveNoteTableToStorage(noteTable);
  return newNoteObject;
}

/**
 * Modify the text of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} newText - the new text of the note
 */
function modifyNoteText(noteID, newText) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["text"] = newText;
  saveNoteToTable(noteID, noteObject);
}

/**
 * Modify the date of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} newDate - the new date of the note
 */
function modifyNoteDate(noteID, newDate) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["date"] = newDate;
  saveNoteToTable(noteID, noteObject);
}

/**
 * Modify the last edited date of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} newLastEdited - the new last edited date of the note
 */
function modifyNoteLastEdited(noteID, newLastEdited) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["lastEdited"] = newLastEdited;
  saveNoteToTable(noteID, noteObject);
}

/**
 * Modify the title of a note object that maps t othe given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} newTitle - the new title of the note
 */
function modifyNoteTitle(noteID, newTitle) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["title"] = newTitle;
  saveNoteToTable(noteID, noteObject);
}

/**
 * Append a new project to the project list of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} projectID - the ID of the project to append to
 */
function appendProjectToNoteProjectList(noteID, projectID) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["projectList"].push(projectID);
  saveNoteToTable(noteID, noteObject);
}

/**
 * Remove a project from the project list of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} projectID - the ID of the project to remove
 */
function removeProjectFromNoteProjectList(noteID, projectID) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["projectList"] = noteObject["projectList"].filter(project => project !== projectID);
  saveNoteToTable(noteID, noteObject);
}

/**
 * Modify the favorited status of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {Boolean} newFavorited - the new favorited status of the note
 */
function modifyNoteFavorited(noteID, newFavorited) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["favorited"] = newFavorited;
  saveNoteToTable(noteID, noteObject);
}

/**
 * Append a new tag to the tag list of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} tag - the tag to append
 */
function appendTagToNoteTags(noteID, tag) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["tags"].push(tag);
  saveNoteToTable(noteID, noteObject);
}

/**
 * Remove a tag from the tag list of a note object that maps to the given ID and update the local storage
 * @param {String} noteID - the ID of the note to modify
 * @param {String} tag - the tag to remove
 */
function removeTagFromNoteTags(noteID, tagID) {
  const noteObject = getNoteFromTable(noteID);
  noteObject["tags"] = noteObject["tags"].filter(tag => tag !== tagID);
  saveNoteToTable(noteID, noteObject);
}

// Export the functions
export { 
  getNoteFromTable, 
  saveNoteToTable, 
  deleteNoteFromTable, 
  createNewNoteObject, 
  modifyNoteText, 
  modifyNoteDate, 
  modifyNoteLastEdited, 
  modifyNoteTitle, 
  appendProjectToNoteProjectList, 
  removeProjectFromNoteProjectList, 
  modifyNoteFavorited, 
  appendTagToNoteTags, 
  removeTagFromNoteTags,
  getNoteTableFromStorage,
}