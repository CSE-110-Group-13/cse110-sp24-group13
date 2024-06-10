class cancelButton extends HTMLElement {
  constructor() {
    super();
  }
    
  connectedCallback() {
    this.render();
  }    

  /**
   * Renders cancel button
   */
  render() {
    const container = document.createElement('div');
    const cButton = document.createElement('button');
    cButton.id = 'cButton';
    const styles = document.createElement('style');
    styles.innerHTML = `
      #cButton {
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

      #cButton:hover {
        background-color: #e0e0e0; /* Change background color on hover */
      }

      #cButton svg {
        margin-right: 8px; /* Add space between icon and text */
        width: 25px;
        height: 25px;
      }
    `;
    container.appendChild(cButton);
    this.appendChild(styles);
    this.appendChild(container);

    cButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
      <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
      Cancel
    `;

    cButton.addEventListener('click', () => this.cancel());
  }

  cancel() {
      // Add code here to switch pages to viewnote
      // For example:
  }
}    

customElements.define('cancel-button',cancelButton);