/**
 * A function to load the entries into the container.
 * @param {*} entry 
 */
function loadEntries(entry) {

    // create a new div element
    const newDiv = document.createElement("div");

    // and give it some content
    const textContent = document.createTextNode(entry);

    // add the text node to the newly created div
    newDiv.appendChild(textContent);

    // add the newly created element and its content into the DOM
    const entriesList = document.getElementById("entries-holder");
    const currentDiv = document.getElementById("end-block");
    entriesList.insertBefore(newDiv, currentDiv);
}

document.addEventListener("DOMContentLoaded", function() {
    //used Salman's example journal entries from their own branch.
    //This code will need to be updated as we change the nature of the journal entries object.
    const journalEntries = [
      {
          title : "Journal Entry Title 1",
          date : "2021-05-25",
          bodyText : "## This is my first journal entry",
          priority : 5
      },
      {
          title : "Journal Entry Title 2",
          date : "2021-05-24",
          bodyText : "## This is my second journal entry",
          priority : 10
      },
      // Add more journal entries as needed...
    ]

    window.localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    let newObject = window.localStorage.getItem("journalEntries");
    let parsedObject = JSON.parse(newObject);

    parsedObject.forEach((entry) => loadEntries(entry['title'] + ' ' + entry['date']));

    const sortBox = document.querySelector("select");
    const entriesList = document.getElementById("entries-holder");
    

    sortBox.addEventListener("input", function reSort(event){
        //clear out the existing list.
        let currEntries = entriesList.childNodes;
        while(currEntries.length > 2)
        {
            if(currEntries[0].id != 'end-block'){
                entriesList.removeChild(currEntries[0]);
            }
        };

        //sort the list based on selected option.
        if(event.target.value == 'date')
            parsedObject.sort((a, b) => {
            let da = new Date(a['date']),
                db = new Date(b['date']);
            return da - db;
        });

        else if(event.target.value == 'title')
        parsedObject.sort((a, b) => {
            if(a['title'] > b['title'])
                return 1;
            else if(a['title'] < b['title'])
                return -1;
            return 0;
        });

        else if(event.target.value == 'priority')
        parsedObject.sort((a, b) => {
            let intA = Number(a['priority']);
            let intB = Number(b['priority']);
            return intB - intA;
            //gets ascending order of priorities.
        });

        //reload the entries.
        parsedObject.forEach((entry) => loadEntries(entry['title'] + ' ' + entry['date']));
    });
});