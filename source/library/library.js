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

    //assign attributes for sorting/display purposes. Some of these may be unnecessary or would be more clean to obtain from the child divs.
    newNote.setAttribute("class", "note");
    newNote.setAttribute("noteID", entry["noteID"]);
    newNote.setAttribute("text", entry["text"]);
    newNote.setAttribute("date", entry["date"]);
    newNote.setAttribute("lastEdited", entry["lastEdited"]);
    newNote.setAttribute("title", entry["title"]);
    newNote.setAttribute("projectList", entry["projectList"]);
    newNote.setAttribute("favorited", entry["favorited"]);

    //elements that must be displayed: title, date, lastEdited, tags, project, text
    //Everything else can be attributes
    const titleText = document.createElement("div");
    titleText.setAttribute("class", "title");
    titleText.innerText = entry["title"];
    newNote.insertBefore(titleText, null);

    const dateText = document.createElement("div");
    dateText.setAttribute("class", "date");
    dateText.innerText = "Created on: " + entry["date"];
    newNote.insertBefore(dateText, null);

    const lastEdited = document.createElement("div");
    lastEdited.setAttribute("class", "date");
    lastEdited.innerText = "Last worked on: " + entry["date"];
    newNote.insertBefore(lastEdited, null);

    const noteText = document.createElement("div");
    noteText.setAttribute("class", "body-text");
    noteText.innerText = entry['text'];
    newNote.insertBefore(noteText, null);

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
    const IDContainer = JSON.parse(window.localStorage.getItem("IDContainer"));

    let loadedNotes = [];

    //get and store all notes in an array
    if(IDContainer.length > 0)
        for(let i = 0; i < IDContainer.length; i++)
        {
            loadedNotes.push(loadEntry(getNoteFromTable(IDContainer[i])));
        }

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
    function titleSort (noteA, noteB) {
        const titleA = noteA.getAttribute('title'),
        titleB = noteB.getAttribute('title');
        if(titleA > titleB)
            return 1;
        else if(titleA < titleB)
            return -1;
        return 0;
    }

    function dateSort(noteA, noteB) {
        let da = new Date(noteA.getAttribute('date')),
            db = new Date(noteB.getAttribute('date'));
        return da - db;
    }

    function recencySort(noteA, noteB) {
        let da = new Date(noteA.getAttribute('lastEdited')),
            db = new Date(noteB.getAttribute('lastEdited'));
        return da - db;
    }
    //sort notes by title to start
    //NOTE: would not be opposed to saving the last sort-type used in local storage so we can use that.
    loadedNotes.sort(titleSort);
    const sortBox = document.querySelector("select");

    //display notes
    //NOTE: would like to add pagination
    const entriesHolder = document.querySelector("#entries-holder");
    function displayNotes()
    {
        //clear current display 
        const children = entriesHolder.children;
        while(children.length != 0)
            entriesHolder.removeChild(children[0]);

        //put all the notes in the html
        for(let i = 0; i < loadedNotes.length; i++)
        {
            entriesHolder.insertBefore(loadedNotes[i], null);
        }
    }
    displayNotes();

    sortBox.addEventListener("input", function sortAndDisplay(event)
    {
        if(event.target.value == "title")
            loadedNotes.sort(titleSort);
        else if(event.target.value == "date")
            loadedNotes.sort(dateSort);
        else if(event.target.value == "lastEdited")
            loadedNotes.sort(recencySort);
        displayNotes();
    });
}