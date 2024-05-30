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
    NOTE_ID = window.location.NOTE_ID;
    populateNote();   
}

/**
 * Populates the note with existing data from the backend.
 * Retrieves the note data using the note ID.
 * Sets the note title, markdown content, and date in the DOM.
 */
function populateNote() {
    const note = getNoteFromTable(NOTE_ID);
    document.querySelector('.noteTitle h1').innerText = note.title;
    document.querySelector('markdown-editor').wysimark.setMarkdown(note.text);
    document.querySelector('.date input').value = note.date;
}