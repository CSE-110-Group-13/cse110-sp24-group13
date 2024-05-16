document.addEventListener("DOMContentLoaded", function() {
  const journalEntries = [
      {
          title : "Journal Entry Title 1",
          date : "2021-05-25",
          bodyText : "## This is my first journal entry",
      },
      {
          title : "Journal Entry Title 2",
          date : "2021-05-26",
          bodyText : "## This is my second journal entry",
      },
      // Add more journal entries as needed...
  ]

  window.localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
  let newObject = window.localStorage.getItem("journalEntries");
  let parsedObject = JSON.parse(newObject);
  parsedObject.forEach(entry => console.log(entry.bodyText));
});