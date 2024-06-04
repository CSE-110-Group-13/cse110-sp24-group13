class deleteButton extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.render();
    }    

    render() {
        const container = document.createElement('div');
        const dButton = document.createElement('button');
        dButton.id = 'dButton';
        const styles = document.createElement('style');
        styles.innerHTML = `
        #dButton {
            display: flex;
            width: 136px;
            justify-content: center;
            align-items: center;
            background-color: #F8F8F8;
            box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.08);
            border-radius: 10px;
            padding: 10px 15px; 
            text-decoration: none; 
            color: black; 
            font-size: 16px;
            border-width: 0px;
        }

        #dButton:hover {
            background-color: #e0e0e0; /* Change background color on hover */
        }

        #dButton svg {
            margin-right: 8px; /* Add space between icon and text */
            width: 25px;
            height: 25px;
        }

        .popup {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.4);
        }

        .popup-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 300px;
            text-align: center;
            border-radius: 10px;
        }

        .popup-content button {
            margin: 5px;
            padding: 10px 20px;
            font-size: 16px;
        }
        `;
        container.appendChild(dButton);
        this.appendChild(styles);
        this.appendChild(container);

        dButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
            Delete
        `;
        console.log("initailized delete button")

        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <p>Are you sure you want to delete this item?</p>
                <button id="confirmDelete">Yes</button>
                <button id="cancelDelete">No</button>
            </div>
        `;
        container.appendChild(popup);

        dButton.addEventListener('click', () => {
            popup.style.display = 'block';
        });

        const confirmDelete = popup.querySelector('#confirmDelete');
        const cancelDelete = popup.querySelector('#cancelDelete');

        confirmDelete.addEventListener('click', () => {
            
            // Get id of note or project
            const noteID = this.getAttribute('noteID');
            const projectID = this.getAttribute('projectID');

            if (noteID) {
                // Delete note
                deleteNoteFromTable(noteID);
            }

            if (projectID) {
                // Delete project
                deleteProjectFromTable(projectID);
            }
            
            popup.style.display = 'none';
        });

        cancelDelete.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
}

customElements.define('delete-button', deleteButton);
