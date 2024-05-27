class NoteWebComponent extends HTMLElement {
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.render();
  }

  render() {
    const styles = document.createElement("style");
    styles.innerHTML = `
    .note-container {
      background-color: #F8F8F8;
      padding-right: 10px;
      padding-left: 20px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
      position: relative; 
    }

      h2 {
        font-weight: bold;
      }

      header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: -10px;
      }

      .tags-project {
        display: flex;
        position: absolute;
        left: 22%;
        align-items: center;
      }

      .tags-project span {
        background-color: #e2e2e2;
        padding: 0px 10px;
        margin-right: 5px;
        border-radius: 5px;
        height: 20px;
      }

      #vertical-line {
        border-left: 2px solid #000;
        height: 25px;
        margin-right: 9px;
        margin-left: 9px;
      }

      .content-container {
        display: flex;
        flex-direction: row;
        margin-top: -10px;
        
      }

      .dates {
        display: flex;
        flex-direction: column;
      }

      .dates p {
        font-size: 10px;
        color: #7C7C7C;
        margin-top: -5px;    
      }

      #note-text {
        position: absolute;
        left: 22%;
        margin-top: -5px;
        margin-right: 10px;
        font-size: 12px;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        display: -webkit-box;
      }

      

    `;
    document.head.appendChild(styles);
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
        "text": "This is the content of note 2",
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

      // Create a header
      const headerElement = document.createElement('header');
      noteContainer.appendChild(headerElement);

      // Create a container for the content (text, date, and lastEdited)
      const contentContainer = document.createElement('div');
      contentContainer.classList.add('content-container');
      noteContainer.appendChild(contentContainer);

      // Create a date container
      const dateContainer = document.createElement('div');
      dateContainer.classList.add('dates');
      contentContainer.appendChild(dateContainer);

      // Add the title
      const titleElement = document.createElement('h2');
      titleElement.textContent = note.title;
      headerElement.appendChild(titleElement);

      // Call the function getFormattedDate()
      const date = this.getFormattedDate(note.date);
      const lastEdited = this.getFormattedDate(note.lastEdited);

      // Add date
      const dateElement = document.createElement('p');
      dateElement.textContent = `Started ${date}`;
      dateContainer.appendChild(dateElement);

      // Add last edited
      const lastEditedElement = document.createElement('p');
      lastEditedElement.textContent = `Last Worked on: ${lastEdited}`;
      dateContainer.appendChild(lastEditedElement);

      // Add text
      const textElement = document.createElement('p');
      textElement.id = 'note-text';
      textElement.textContent = note.text;
      contentContainer.appendChild(textElement);

      // Create a tags-project container
      const tagsProjectContainer = document.createElement('div');
      tagsProjectContainer.classList.add('tags-project');
      headerElement.appendChild(tagsProjectContainer);

      // Add each tag separately
      note.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        tagsProjectContainer.appendChild(tagElement);
      });

      // Add line separating the tags and projects
      const verticalLine = document.createElement('div');
      verticalLine.id = 'vertical-line';
      tagsProjectContainer.appendChild(verticalLine);

      // Add each project separately
      note.projectList.forEach(project => {
        const projectElement = document.createElement('span');
        projectElement.textContent = project;
        tagsProjectContainer.appendChild(projectElement);
      });


      // Add favorited button 
    
      this.appendChild(noteContainer);
    }
  }

  /**
  * Takes in a date string and converts it to the format Month Day with the corresponding suffix
  * @param {string}  dateString string in the format YYYY-MM-DD
  * @return {string} a string in the correct format
  */
  getFormattedDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    let suffix = "";

    // Determine the suffix based on the day
    if (day === 1 || day === 21 || day === 31) {
      suffix = "st";
    }
    else if (day === 2 || day === 22) {
      suffix = "nd";
    }
    else if (day === 3 || day === 23) {
      suffix = "rd";
    }
    else {
      suffix = "th";
    }

    // Format the string
    const options = { month: 'long' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

    return `${formattedDate} ${day}${suffix}`;
  }


}
customElements.define('note-web-component', NoteWebComponent);