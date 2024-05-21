document.addEventListener("DOMContentLoaded", function() {
  const wysimark = createWysimark(document.getElementById("editor"), {
    initialMarkdown: "# Hello World",
    onChange: (markdown) => {
      console.log(markdown)
      window.localStorage.setItem("markdown", markdown);
    },
  });
  
  const savedMarkdownContent = window.localStorage.getItem("markdown");
  if (savedMarkdownContent) {
    console.log(savedMarkdownContent)
    wysimark.setMarkdown(savedMarkdownContent);
  }
});