class linkedProject extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // Styling 
        const styles = document.createElement('style');
        styles.innerHTML = `
        #lButton {
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

        #lButton:hover {
            background-color: #e0e0e0; /* Change background color on hover */
        }

        .addProjectContainer.close {
            display: none;
        }

        .addProjectContainer.open {
            display: block;
            position: relative;
            height: 50vh;
            width: 50vw;
            margin: 20vh auto;
            background-color: #FFFFFF;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 3px 4px 8px rgba(0, 0, 0, 0.08);
        }

        h1 {
            text-align: center;
            margin-bottom: 10px;
            font-weight: 525;
        }

        hr {
            border: 1px solid #000;
            border-width: 0 0 1.5px 0;
            width: 90%;
        }

        .addProjectContainer #back-button {
            border: none;
            background-color: transparent;
            cursor: pointer;
            outline: none;
            box-shadow: none;
            position: absolute;
            top: 10px;
            left: -25px;
        }

        .addProjectContainer p {
            text-align: center;
            color: #7C7C7C;
        }

        #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            background-color: rgba(0, 0, 0, 0.5);;
            justify-content: center;
            align-items: center;
        }

        #overlay.open {
            display: flex;
        }

        #confirm-button {
            position: absolute;
            bottom: 10px;
            right: 10px;
            cursor: pointer;
            border: none;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0em 0em 0.5em rgba(0, 0, 0, 0.2);
            font-size: 15px;
            width: 75px;
        }

        `;

        // Create the main container
        const container = document.createElement('div');
        container.id = 'container';

        // Create a button to link a project
        const lButton = document.createElement('button');
        lButton.id = 'lButton';
        lButton.textContent = 'Add Project';
        container.appendChild(lButton);
        
        // Create overlay 
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        container.appendChild(overlay);

        // Create project container 
        const projectContainer = document.createElement('div');
        projectContainer.classList = 'addProjectContainer';
        projectContainer.classList.toggle("close");
        overlay.appendChild(projectContainer);

        // Create back button
        const backButton = document.createElement('button');
        backButton.id = "back-button";
        backButton.innerHTML = `<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.34363 6.98486L6.98426 0.344238C7.44324 -0.114746 8.18543 -0.114746 8.63953 0.344238L9.74304 1.44775C10.202 1.90674 10.202 2.64893 9.74304 3.10303L5.0409 7.81494L9.74793 12.522C10.2069 12.981 10.2069 13.7231 9.74793 14.1772L8.64441 15.2856C8.18543 15.7446 7.44324 15.7446 6.98914 15.2856L0.348513 8.64502C-0.115354 8.18604 -0.115354 7.44385 0.34363 6.98486Z" fill="black"/></svg>`;
        projectContainer.appendChild(backButton);

        // Create title
        const selectProject = document.createElement('h1');
        selectProject.textContent = "Select Project";
        projectContainer.appendChild(selectProject);

        // Create horizontal line
        const line = document.createElement('hr');
        projectContainer.appendChild(line);

        // Create instructions
        const instructions = document.createElement('p');
        instructions.textContent = 'Select the project that you worked on in this log';
        projectContainer.appendChild(instructions);

        // Add confirm button
        const confirmButton = document.createElement('button');
        confirmButton.id = 'confirm-button';
        confirmButton.textContent = 'Confirm';
        projectContainer.appendChild(confirmButton);

        // Add event listener for when add project button is pressed
        lButton.addEventListener('click', () => {
            projectContainer.classList.toggle("open"); 
            overlay.classList.toggle("open");
        });

        // Add event listener for when back button is pressed
        backButton.addEventListener('click', () => {
            projectContainer.classList.toggle("open");
            overlay.classList.toggle("open");
        });


        this.appendChild(styles);
        this.appendChild(container);

    }

    removeLButton() {
        const lButton = document.getElementById('lButton');
        lButton.remove();
    }
}

customElements.define('linked-project', linkedProject);