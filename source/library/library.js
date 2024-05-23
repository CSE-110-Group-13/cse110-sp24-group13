import { 
    getNoteFromTable,
  } from "./NoteTable.js";

/**
 * Create html note elements from information in local stoarge
 * @param {*} entry an entry of the note table in local storage
 * @returns the created element
 */
function loadEntry(entry) {
    // create a new div element
    const newNote = document.createElement("div");
    newNote.setAttribute("class", "note");
    newNote.setAttribute("noteID", entry["noteID"]);
    newNote.setAttribute("text", entry["text"]);
    newNote.setAttribute("date", entry["date"]);
    newNote.setAttribute("lastEdited", entry["lastEdited"]);
    newNote.setAttribute("title", entry["title"]);
    newNote.setAttribute("projectList", entry["projectList"]);
    newNote.setAttribute("favorited", entry["favorited"]);
    //elements that must be displayed: title, date, lastEdited, tags, project
    //Everything else can be attributes
    newNote.innerText = entry['title'] + entry['date'];

    return newNote;
}

/**
 * TODO: make it load, display, and sort entries from local storage.
 */

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
  // Initialize the tables in local storage if they do not exist
    const tables = ["NoteTable", "ProjectTable", "TaskTable"];
    tables.forEach(table => {
        if (window.localStorage.getItem(table) === null) {
            localStorage.setItem(table, JSON.stringify({}));
        }
    })

  // Initialize the ID container to check whether an ID is used
    if (window.localStorage.getItem("IDContainer") === null) {
        localStorage.setItem("IDContainer", JSON.stringify([]));
    }
    const IDContainer = window.localStorage.getItem("IDContainer");

    let loadedNotes = [];

    //get and store all notes in an array
    /*for(let i = 0; i < IDContainer.length; i++)
    {
        loadedNotes.push(loadEntry(getNoteFromTable(IDContainer[i])));
    }*/

    //Adding my own notes for testing. Remove later.
    const testNote1 = {
        "noteID" : "ABC",
        "text" : "buy eggs",
        "date" : "2024-5-21",
        "lastEdited" : "2024-5-23",
        "title" : "to do at grocery store",
        "projectList" : [],
        "favorited" : false,
        "tags" : []
    };

    const testNote2 = {
        "noteID" : "21kfasde",
        "text" : "mow lawn",
        "date" : "2024-5-22",
        "lastEdited" : "2024-5-22",
        "title" : "chores",
        "projectList" : [],
        "favorited" : false,
        "tags" : []
    };
    loadedNotes.push(loadEntry(testNote1));
    loadedNotes.push(loadEntry(testNote2));

    //init sort functions
    const sortFunctions = new Map();

    sortFunctions.set('title', (noteA, noteB) => {
        const titleA = noteA.getAttribute('title'),
        titleB = noteB.getAttribute('title');

        if(titleA > titleB)
            return 1;
        else if(titleA < titleB)
            return -1;
        return 0;
    });

    sortFunctions.set('date', (noteA, noteB) => {
        let da = new Date(noteA.getAttribute('date')),
            db = new Date(noteB.getAttribute('date'));
        return da - db;
    });

    sortFunctions.set('lastEdited', (noteA, noteB) => {
        let da = new Date(noteA.getAttribute('lastEdited')),
            db = new Date(noteB.getAttribute('lastEdited'));
        return da - db;
    })
    //sort notes by title to start
    //NOTE: would not be opposed to saving the last sort-type used in local storage so we can use that.
    loadedNotes.sort(sortFunctions['title']);
    const sortBox = document.querySelector("select");

    //display notes
    //NOTE: would like to add pagination
    const entriesHolder = document.querySelector("#entries-holder");
    const endBlock = document.querySelector("#end-block");
    function displayNotes()
    {
        //clear current display 
        const children = entriesHolder.children;
        while(children[0] != endBlock)
            entriesHolder.removeChild(children[0]);

        //put all the notes in the html
        for(let i = 0; i < loadedNotes.length; i++)
        {
            entriesHolder.insertBefore(loadedNotes[i], endBlock);
        }
    }
    displayNotes();

    sortBox.addEventListener("input", function sortAndDisplay(event)
    {
        loadedNotes.sort(sortFunctions[event.target.value]);
        displayNotes();
    });
}