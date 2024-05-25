class NoteWebComponent extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    // Hardcode notes data
    const notesData = {
      "123": {
        "noteID": "123",
        "text": "This is the content of note 1.",
        "date": "2024-05-01",
        "lastEdited": "2024-05-10",
        "title": "Note 1",
        "projectList": ["project1", "project2"],
        "favorited": false,
        "tags": ["tag1", "tag2"]
      },
      "456": {
        "noteID": "456",
        "text": "This is the content of note 2.",
        "date": "2024-05-05",
        "lastEdited": "2024-05-15",
        "title": "Note 2",
        "projectList": ["project3"],
        "favorited": true,
        "tags": ["tag3", "tag4"]
      }
    };

    const notesArray = Object.values(notesData);

    // Iterate over each note object
    for (let i = 0; i < notesArray.length; i++) {
      // Get the note
      const note = notesArray[i];

      // Create a container for the note
      const noteContainer = document.createElement('div');
      noteContainer.classList.add('note-container');

      // Add the title
      const titleElement = document.createElement('h2');
      titleElement.textContent = note.title;
      noteContainer.appendChild(titleElement);

      // Add text
      const textElement = document.createElement('p');
      textElement.textContent = note.text;
      noteContainer.appendChild(textElement);

      // Add date
      const dateElement = document.createElement('span');
      dateElement.textContent = `Started ${note.date}`;
      noteContainer.appendChild(dateElement);

      // Add last edited
      const lastEditedElement = document.createElement('span');
      lastEditedElement.textContent = `Last Worked on: ${note.lastEdited}`;
      noteContainer.appendChild(lastEditedElement);

      // Create tags container
      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('tags');
      noteContainer.appendChild(tagsContainer);

      // Add each tag separately
      note.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagsContainer.appendChild(tagElement);
      });

      // Create project container
      const projectContainer = document.createElement('div');
      projectContainer.classList.add('projects');
      noteContainer.appendChild(projectContainer);

      // Add each project separately
      note.projectList.forEach(project => {
        const projectElement = document.createElement('span');
        projectElement.textContent = project;
        projectContainer.appendChild(projectElement);
      });

      // Add favorited button 

      this.appendChild(noteContainer);
    }
  }

}
customElements.define('note-web-component', NoteWebComponent);