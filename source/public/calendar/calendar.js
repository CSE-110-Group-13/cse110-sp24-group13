// For event listeners
document.addEventListener("DOMContentLoaded", (event) => {
  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    alert("This is the calendar page!");

    // Calls the async function and should print out Hello World!
    makeApiRequest().then(data => console.log(data));
  });
});

// Make an API request
async function makeApiRequest() {
  const response = await fetch(window.location.origin.toString() + '/api/helloWorld', {
    method: 'GET'
  })

  const data = await response.text();
  return data;
}
