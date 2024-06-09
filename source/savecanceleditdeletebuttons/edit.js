class editButton extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		this.render();
	}    

	/**
	 * Renders edit button
	 */
	render() {
		const container = document.createElement('div');
		const eButton = document.createElement('button');
		eButton.id = 'eButton';
		const styles = document.createElement('style');
		styles.innerHTML = `
			#eButton {
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

			#eButton:hover {
				background-color: #e0e0e0; /* Change background color on hover */
			}

			#eButton svg {
				margin-right: 8px; /* Add space between icon and text */
				width: 25px;
				height: 25px;
			}
		`;
		container.appendChild(eButton);
		this.appendChild(styles);
		this.appendChild(container);

		eButton.innerHTML = `
			<svg  viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M24.3135 3.62158L21.3785 0.686523C20.4629 -0.229004 18.9781 -0.229004 18.0625 0.686523L15.3013 3.44775L21.5523 9.69873L24.3135 6.9375C25.229 6.02197 25.229 4.5376 24.3135 3.62158ZM12.2627 2.61914C11.5 1.85645 10.2637 1.85645 9.50102 2.61914L3.70121 8.41943C3.39604 8.72461 3.39604 9.21924 3.70121 9.52393L4.80619 10.6289C5.11137 10.9341 5.606 10.9341 5.91117 10.6289L10.8829 5.65723L11.9878 6.76172L4.58744 14.1616C2.02413 16.725 0.409272 20.0842 0.00834279 23.687L0.00687795 23.6982C-0.0761299 24.4443 0.554241 25.0752 1.30033 24.9927C4.90782 24.5943 8.27197 22.9789 10.8384 20.4126L20.4473 10.8037L16.4058 6.76221L12.2627 2.61914Z" fill="black"/>
			</svg>

			Edit
		`;
		console.log("initailized edit button")
	}
}

customElements.define('edit-button', editButton);