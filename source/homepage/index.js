document.addEventListener("DOMContentLoaded", function() {
    const journalEntries = [
        { title: "Journal Entry Title 1", date: "2021-05-25", bodyText: "## This is my first journal entry", priority: 5 },
        { title: "Journal Entry Title 2", date: "2021-05-24", bodyText: "## This is my second journal entry", priority: 10 },
        { title: "Journal Entry Title 3", date: "2021-05-24", bodyText: "## This is my third journal entry", priority: 10 },
        // Add more journal entries as needed...
    ];


    // Function to toggle collapse/expand of all notes

    const button = document.createElement("button");
    button.id = "collapseButton1";
    button.innerText = "collapse";

    const recent = document.createElement("span");
    recent.textContent = "Recent";
    const recentContainer = document.getElementById("recents");

    recentContainer.appendChild(button);
    recentContainer.appendChild(recent);

    for (let i = 0; i < journalEntries.length; i++) {
        const entry = journalEntries[i];

        // Create a new container for each entry
        const noteContainer = document.createElement("a");
        noteContainer.href = "../library/library.html";
        noteContainer.className = "note";

        // Create and append the title
        const titleElement = document.createElement('h2');
        titleElement.textContent = entry.title;
        noteContainer.appendChild(titleElement);

        // Create and append the date
        const dateElement = document.createElement('p');
        dateElement.textContent = entry.date;
        noteContainer.appendChild(dateElement);

        // Create and append the body text
        const bodyTextElement = document.createElement('p');
        bodyTextElement.textContent = entry.bodyText;
        noteContainer.appendChild(bodyTextElement);

        // Append the note container to the recentContainer
        recentContainer.appendChild(noteContainer);
    }

    
    let isCollapsed = false;

function toggleCollapse() {
    const recentsContainer = document.getElementById('recents');
    recentsContainer.classList.toggle('collapsed');
    isCollapsed = !isCollapsed; // Toggle collapse state
}

const collapseButton = document.getElementById('collapseButton1');
collapseButton.addEventListener('click', function() {
    toggleCollapse();
});
    
});
