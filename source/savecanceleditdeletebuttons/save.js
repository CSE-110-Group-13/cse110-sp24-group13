class saveButton extends HTMLElement {
	constructor() {
		super();
	}
	
	connectedCallback() {
		this.render();
	}    

	/**
	 * Renders save button
	 */
	render() {
		const container = document.createElement('div');
		const sButton = document.createElement('button');
		sButton.id = 'sButton';
		const styles = document.createElement('style');
		styles.innerHTML = `
			#sButton {
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
				transition: background-color .5s;
			}

			#sButton.saved{
				background-color: #dae3cc;
				transition: background-color .5s;
			}

			#sButton:hover {
				background-color: #e0e0e0; /* Change background color on hover */
			}

			#sButton.saved:hover{
				background-color: #ced6c1;
			}

			#sButton svg {
				margin-right: 8px; /* Add space between icon and text */
				width: 25px;
				height: 25px;
			}
		`;
		container.appendChild(sButton);
		this.appendChild(styles);
		this.appendChild(container);

		const saveIcon = `
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
				<!--! Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
				<path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
		</svg>`
		sButton.innerHTML = `${saveIcon}Save`;
		console.log("initailized save button")

		sButton.addEventListener('click', () => {
			if (sButton.textContent.trim() === "Save") {
				sButton.innerHTML = `${saveIcon}Saved!`;
				sButton.classList.add("saved");
				clearTimeout(this.confirmationTimeout);
				this.confirmationTimeout = setTimeout(() => {
					sButton.classList.remove("saved");
					sButton.innerHTML = `${saveIcon}Save`;
				}, 2000); // allow 3 seconds to confirm deletion
			}
		});
	}
}

customElements.define('save-button', saveButton);