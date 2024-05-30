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
        container.appendChild(lButton);
        this.appendChild(styles);
        this.appendChild(container);

        container.innerHTML = `
        <h3>Linked Project:</h3>
        <p>This allows you to to update a specific task. 
            Once you select a specific task, you can then check off which 
            subtask you have completed in this specific note
        </p>

        <button id="lButton">Link a project</button>
        `;

        lButton.addEventListener('click', () => this.linkProject());
    }
}

customElements.define('linked-project', linkedProject);