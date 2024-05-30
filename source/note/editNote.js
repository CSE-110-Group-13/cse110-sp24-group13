// editNote.js
import { 
    createNewNoteObject, 
    modifyNoteText, 
    modifyNoteDate, 
    modifyNoteTitle, 
    appendTagToNoteTags, 
    removeTagFromNoteTags,
    getNoteFromTable
  } from '../backend/NoteTable.js';

let NOTE_ID = "";

window.addEventListener("DOMContentLoaded", init);

/**
 * Initializes the note editing process.
 * If a note ID is not set, creates a new note object.
 * If a note ID is set, populates the note with existing data.
 * Attaches an event listener to the save button.
 */
function init() {
    
    NOTE_ID = window.location.hash.substring(1);
    if (!NOTE_ID) {
        //Remove these 2 lines once everything is linked better
        localStorage.setItem("NoteTable", JSON.stringify({}));
        localStorage.setItem("IDContainer", JSON.stringify([]));
        const newNote = createNewNoteObject();
        NOTE_ID = newNote.noteID;
    } else {
        populateNote();
    }
    attachSaveButtonListener();
    attachCancelButtonListener();
}

/**
 * Attaches an event listener to the save button.
 */
function attachSaveButtonListener() {
    document.querySelector('save-button button').addEventListener('click', saveNote);
}

function attachCancelButtonListener() {
    document.querySelector('cancel-button button').addEventListener('click', cancelEdit);
}

/**
 * Saves the current state of the note to the local storage.
 * Retrieves the note title, markdown content, and date from the DOM.
 * Modifies the note in the backend using the note ID.
 */
function saveNote() {
    const noteTitle = document.querySelector('.noteTitle h1').innerText;
    const noteMarkdown = document.querySelector('markdown-editor').wysimark.getMarkdown();
    const noteDate = document.querySelector('.date input').value;
    // Modify the note
    modifyNoteTitle(NOTE_ID, noteTitle);
    modifyNoteText(NOTE_ID, noteMarkdown);
    modifyNoteDate(NOTE_ID, noteDate);
    window.location.href = './view-note.html#' + NOTE_ID;
    
}

function cancelEdit() {
    window.location.href = "../homepage/index.html";
}
/**
 * Populates the note with existing data from the backend.
 * Retrieves the note data using the note ID.
 * Sets the note title, markdown content, and date in the DOM.
 */
function populateNote() {
    const note = getNoteFromTable(NOTE_ID);
    console.log(note.title)
    document.querySelector('.noteTitle h1').innerText = note.title;
    document.querySelector('markdown-editor').wysimark.setMarkdown(note.text);
    document.querySelector('.date input').value = note.date;
}