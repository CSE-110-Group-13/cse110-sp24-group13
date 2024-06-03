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
        `;
        container.appendChild(dButton);
        this.appendChild(styles);
        this.appendChild(container);

        dButton.innerHTML = `
        <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0938 1.56251H15.2344L14.7754 0.649423C14.6782 0.454215 14.5284 0.29001 14.3429 0.175281C14.1575 0.0605526 13.9437 -0.00014785 13.7256 8.5609e-06H8.14453C7.92694 -0.000827891 7.71352 0.0596463 7.52871 0.174503C7.34391 0.289359 7.19519 0.453951 7.09961 0.649423L6.64062 1.56251H0.78125C0.57405 1.56251 0.375336 1.64482 0.228823 1.79133C0.08231 1.93784 0 2.13656 0 2.34376L0 3.90626C0 4.11346 0.08231 4.31217 0.228823 4.45869C0.375336 4.6052 0.57405 4.68751 0.78125 4.68751H21.0938C21.301 4.68751 21.4997 4.6052 21.6462 4.45869C21.7927 4.31217 21.875 4.11346 21.875 3.90626V2.34376C21.875 2.13656 21.7927 1.93784 21.6462 1.79133C21.4997 1.64482 21.301 1.56251 21.0938 1.56251ZM2.59766 22.8027C2.63492 23.3978 2.89754 23.9562 3.33206 24.3644C3.76658 24.7727 4.34033 24.9999 4.93652 25H16.9385C17.5347 24.9999 18.1084 24.7727 18.5429 24.3644C18.9775 23.9562 19.2401 23.3978 19.2773 22.8027L20.3125 6.25001H1.5625L2.59766 22.8027Z" fill="black"/>
        </svg>
        Delete
        `;
        console.log("initailized delete button")
    }
}    

customElements.define('delete-button',deleteButton);