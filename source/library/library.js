/**
 * A function to load the entries into the container.
 * @param {*} entry 
 */
import { 
    getNoteFromTable,
  } from "./NoteTable.js";

function loadEntry(entry) {
    // create a new div element
    const newNote = document.createElement("note");
    
    newNote.setAttribute("ID", entry["noteID"]);
    newNote.setAttribute("text", entry["text"]);
    newNote.setAttribute("date", entry["date"]);
    newNote.setAttribute("lastEdited", entry["lastEditeds"]);
    newNote.setAttribute("title", entry["title"]);
    newNote.setAttribute("projectList", entry["projectList"]);
    newNote.setAttribute("favorited", entry["favorited"]);


    // add the text node to the newly created div
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
    for(let i = 0; i < IDContainer.length; i++)
    {
        loadedNotes.push(loadEntry(getNoteFromTable(IDContainer[i])));
    }

    //init sort functions
    const sortFunctions = newMap();

    sortFunctions.set('title', (noteA, noteB) => {
        if(noteA['title'] > noteB['title'])
            return 1;
        else if(noteA['title'] < noteB['title'])
            return -1;
        return 0;
    });

    sortFunctions.set('date', (noteA, noteB) => {
        let da = new Date(noteA['date']),
            db = new Date(noteB['date']);
        return da - db;
    });

    sortFunctions.set('lastEdited', (noteA, noteB) => {
        let da = new Date(noteA['lastEdited']),
            db = new Date(noteB['lastEdited']);
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

        //put all the notes in
        for(let i = 0; i < loadedNotes.length; i++)
        {
            entriesHolder.insertBefore(loadedNotes[i], endBlock);
        }
    }
    sortBox.addEventListener("input", function sortAndDisplay(event)
    {
        loadedNotes.sort(sortFunctions[event.target.value]);
        displayNotes();
    });
}