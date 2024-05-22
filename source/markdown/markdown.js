class markdownEditor extends HTMLElement {
  constructor() {
    super();
    this.wysimark = null;
  }

  connectedCallback() {
    // Create a shadow dom
    const shadow = this.attachShadow({ mode: "open" });

    // Define the HTML part
    const container = document.createElement('div');
    const editor = document.createElement('div');
    editor.id = 'editor';
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Save';
    const loadButton = document.createElement('button');
    loadButton.id = 'loadButton';
    loadButton.textContent = 'Load';

    // Append elements to the container
    container.appendChild(editor);
    container.appendChild(saveButton);
    container.appendChild(loadButton);

    // Append the container to the shadow root
    shadow.appendChild(container);

    const foundEditor = shadow.getElementById('editor');
    // Initialize wysimark
    this.wysimark = createWysimark(foundEditor, { initialMarkdown: "# Hello World" });

    // Add event listeners
    saveButton.addEventListener('click', () => this.save());
    loadButton.addEventListener('click', () => this.load());

  /*  // Create a style element
  const style = document.createElement('style');
  style.textContent = `
    #content {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    #display-markdown {
      margin-top: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    `;
  shadow.appendChild(style);*/
  }

  save() {
    if (this.wysimark) {
      const markdown = this.wysimark.getMarkdown();
      window.localStorage.setItem("markdown", markdown.toString());
    }
  }
  
  
  load() {
    const savedMarkdownContent = window.localStorage.getItem("markdown");
    if (this.wysimark && savedMarkdownContent) {
      this.wysimark.setMarkdown(savedMarkdownContent);
      console.log(savedMarkdownContent);
    }
  }  
}

customElements.define('markdown-editor', markdownEditor);