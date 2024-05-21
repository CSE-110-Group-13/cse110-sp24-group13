document.addEventListener("DOMContentLoaded", function() {
  const wysimark = createWysimark(document.getElementById("editor"), {
    initialMarkdown: "# Hello World",
    onChange: (markdown) => {
      //console.log(markdown)
      window.localStorage.setItem("markdown", markdown.toString());
    },
  });
  
  
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", function() {
      window.localStorage.setItem("markdown", markdown.toString());
    });
  
  const loadButton = document.getElementById("loadButton");
  loadButton.addEventListener("click", function() {
    const savedMarkdownContent = window.localStorage.getItem("markdown");
    wysimark.setMarkdown(savedMarkdownContent);
    console.log(savedMarkdownContent);
  });
});