// For event listeners
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById('display-markdown');
  const form = document.getElementById('markdownForm');
  const input = document.getElementById('markdownInput');
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = input.value;
    const html = marked.parse(value);
    display.innerHTML = `${html}<br/>`;  
  });
});
