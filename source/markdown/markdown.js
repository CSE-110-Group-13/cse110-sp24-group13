class markdownEditor extends HTMLElement {
  /**
 * Creates an instance of markdownEditor.
 *
 * @constructor
 */
constructor() {
    super();
    this.wysimark = null;
  }

  /**
 * The real constructor. Makes all the sub elemenrs and appends them to the main element.
 * It also initializes the wysimark editor.
 * It also adds event listeners to the save and load buttons.
 */
connectedCallback() {
    // Create a div element
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
    /*
    container.appendChild(saveButton);
    container.appendChild(loadButton);
    */
    // Append the container to the element itself
    this.appendChild(container);

    const foundEditor = document.getElementById('editor');
    // Initialize wysimark
    this.wysimark = createWysimark(foundEditor, { placeholder: 
    "# Hello World \n" +
    "lorem ipsum dolor sit amet. Goo goo g'joob\n" +
    "more example text\n" +
    "filling this up"
    });

    // Add event listeners
    saveButton.addEventListener('click', () => this.save());
    loadButton.addEventListener('click', () => this.load());
  }


  
/*
 * Uses the built in wysimark method to save the markdown content to local storage.

save() {
    if (this.wysimark) {
      const markdown = this.wysimark.getMarkdown();
      window.localStorage.setItem("markdown", markdown.toString());
    }
  }
  
  
  /**
 * Uses built im wysimark method to load the markdown content from local storage.
 
load() {
    const savedMarkdownContent = window.localStorage.getItem("markdown");
    if (this.wysimark && savedMarkdownContent) {
      this.wysimark.setMarkdown(savedMarkdownContent);
      console.log(savedMarkdownContent);
    }
  }  
  */
}

customElements.define('markdown-editor', markdownEditor);