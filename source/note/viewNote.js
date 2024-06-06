import { 
    getNoteFromTable,
    deleteNoteFromTable
} from '../backend/NoteTable.js';

import {
    populateTag
} from '../note/editNote.js';

let NOTE_ID = "";

window.addEventListener("DOMContentLoaded", init);


function init() {
    NOTE_ID = window.location.hash.substring(1);
    makeUneditable();
    console.log(NOTE_ID);
    populateNote();   
    attachEditButtonListener();
    attachCancelButtonListener();
    populateTag();
}

function attachEditButtonListener() {
    document.querySelector('edit-button button').addEventListener('click', editNote);
}

function attachCancelButtonListener() {
    document.querySelector('delete-button button').addEventListener('click', deleteNote);
}

function editNote() {
    window.location.href = './edit-note.html#' + NOTE_ID;
}

function deleteNote() {
    console.log("delete note")
    deleteNoteFromTable(NOTE_ID);
    window.location.href = "../homepage/index.html";
}

function makeUneditable() {
    // Hide toolbar
    const toolbar = document.querySelector('.css-hnubqc');
    toolbar.style.display = 'none';
    // Make textbox uneditable
    const contentBox = document.querySelector('[role="textbox"]');
    contentBox.setAttribute('contenteditable', 'false');
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

document.addEventListener('DOMContentLoaded', () => {
    const newTagForm = document.getElementById("newTag");
    const newTagInput = document.getElementById("newTagInput");
    newTagForm.addEventListener('submit', () => {
        const tag = newTagInput.value.trim();

        if (tag) {
            appendTagToNoteTags(NOTE_ID, tag);
            newTagInput.value = '';
            const tagsContainer = document.querySelector('.tagContainer');
            tagsContainer.innerHTML = '';
            populateTag();
        }
    });
});