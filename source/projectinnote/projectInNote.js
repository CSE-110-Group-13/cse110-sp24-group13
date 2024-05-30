class linkedProject extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const container = document.createElement('div');
        const lButton = document.createElement('button');
        lButton.id = 'lButton';
        lButton.textContent = 'Link a project';
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
        `;
        container.innerHTML = `
        <h3>Linked Project:</h3>
        <p>This allows you to to update a specific task. 
            Once you select a specific task, you can then check off which 
            subtask you have completed in this specific note
        </p>
        `;
        container.appendChild(lButton);
        this.appendChild(styles);
        this.appendChild(container);

        

        lButton.addEventListener('click', () => this.linkProject());
    }

    linkProject() {
        console.log('Linking a project');

            const form = document.createElement('form');
            const radioContainer = document.createElement('div');
            radioContainer.id = 'radioContainer';

            for (let i = 1; i <= 4; i++) {
                const radioLabel = document.createElement('label');
                radioLabel.textContent = `Project ${i}`;

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'projects';
                radioInput.value = `project${i}`;

                radioLabel.appendChild(radioInput);
                radioContainer.appendChild(radioLabel);
            }

            const submitButton = document.createElement('button');
            submitButton.type = 'submit';
            submitButton.textContent = 'Submit';

            form.appendChild(radioContainer);
            form.appendChild(submitButton);

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const selectedProject = document.querySelector('input[name="projects"]:checked').value;
                this.linkProject(selectedProject);
            });
            const backButton = document.createElement('button');
            backButton.id = 'backButton';
            backButton.textContent = 'Back';
            form.appendChild(backButton);
            backButton.addEventListener('click', () => this.render());

            this.removeLButton();
            this.appendChild(form);
        
    }

    removeLButton() {
        const lButton = document.getElementById('lButton');
        lButton.remove();
    }
}

customElements.define('linked-project', linkedProject);