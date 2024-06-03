import { 
  getNoteTableFromStorage,
  saveNoteTableToStorage,
  getNoteFromTable, 
  saveNoteToTable, 
  deleteNoteFromTable, 
  createNewNoteObject, 
  modifyNoteText, 
  modifyNoteDate, 
  modifyNoteLastEdited, 
  modifyNoteTitle, 
  modifyLinkedProject,
  modifyNoteFavorited, 
  appendTagToNoteTags, 
  removeTagFromNoteTags
} from "../../backend/NoteTable.js";

import { mockObjects, initializeLocalStorage } from "../__mocks__/index.js";

/**
 * Tests for note table functions
 */
describe('Tests for backend: Note', () => {
  beforeAll(async () => {
    // Mock window and localStorage object, as well as the alert function
    mockObjects();

    // Clear the local storage
    window.localStorage.clear();

    // Initialize the local storage with the tables and ID container
    initializeLocalStorage();
  });

  afterAll(async () => {
    window.localStorage.clear();
  });

  it('Test get the note table from storage', async () => {
    // Get the note table from storage
    const noteTable = getNoteTableFromStorage();

    // Check if the note table is empty
    expect(Object.keys(noteTable).length).toBe(0);
  });

  it('Test save the note table to storage', async () => {
    // Create a new note table object and save
    const newNoteTable = {};
    saveNoteTableToStorage(newNoteTable);

    // Fetch the note table and check
    const noteTable = getNoteTableFromStorage();
    expect(Object.keys(noteTable).length).toBe(0);
  });

  it('Test create a new note object', async () => {
    // Create a new note object
    const newNote = createNewNoteObject();
    
    // Fetch the note and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note).toEqual(newNote);
  });

  it('Test save a note to the note table', async () => {
    // Create a new note object and modify the title
    let newNote = createNewNoteObject();
    newNote['title'] = 'New Note Title';
    saveNoteToTable(newNote.noteID, newNote);

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note).toEqual(newNote);
  });

  it('Test delete a note from the note table', async () => {
    const noteTable = getNoteTableFromStorage();
    for (let key in noteTable) {
      deleteNoteFromTable(key);
    }

    // Fetch the note table again and check
    const newNoteTable = getNoteTableFromStorage();
    expect(Object.keys(newNoteTable).length).toBe(0);
  });

  it('Test modify the text of a note', async () => {
    // Create a new note object and modify the text
    let newNote = createNewNoteObject();
    newNote['text'] = 'New Note Text';
    modifyNoteText(newNote.noteID, 'New Note Text');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.text).toEqual('New Note Text');
  });

  it('Test modify the date of a note', async () => {
    // Create a new note object and modify the date
    let newNote = createNewNoteObject();
    newNote['date'] = 'New Note Date';
    modifyNoteDate(newNote.noteID, 'New Note Date');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.date).toEqual('New Note Date');
  });

  it('Test modify the last edited date of a note', async () => {
    // Create a new note object and modify the last edited date
    let newNote = createNewNoteObject();
    newNote['lastEdited'] = 'New Note Last Edited';
    modifyNoteLastEdited(newNote.noteID, 'New Note Last Edited');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.lastEdited).toEqual('New Note Last Edited');
  });

  it('Test modify the title of a note', async () => {
    // Create a new note object and modify the title
    let newNote = createNewNoteObject();
    newNote['title'] = 'New Note Title';
    modifyNoteTitle(newNote.noteID, 'New Note Title');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.title).toEqual('New Note Title');
  });

  it('Test modify the linked project of a note', async () => {
    // Create a new note object and modify the linked project
    let newNote = createNewNoteObject();
    newNote['linkedProject'] = 'New Note Linked Project';
    modifyLinkedProject(newNote.noteID, 'New Note Linked Project');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.linkedProject).toEqual('New Note Linked Project');
  });

  it('Test modify the favorited status of a note', async () => {
    // Create a new note object and modify the favorited status
    let newNote = createNewNoteObject();
    newNote['favorited'] = true;
    modifyNoteFavorited(newNote.noteID, true);

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.favorited).toEqual(true);
  });

  it('Test append a tag to the note tags', async () => {
    // Create a new note object and append a tag
    let newNote = createNewNoteObject();
    appendTagToNoteTags(newNote.noteID, 'New Note Tag');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.tags).toEqual(['New Note Tag']);
  });

  it('Test remove a tag from the note tags', async () => {
    // Create a new note object and append a tag
    let newNote = createNewNoteObject();
    appendTagToNoteTags(newNote.noteID, 'New Note Tag');

    // Remove the tag
    removeTagFromNoteTags(newNote.noteID, 'New Note Tag');

    // Fetch the note table and check
    const note = getNoteFromTable(newNote.noteID);
    expect(note.tags).toEqual([]);
  });
});