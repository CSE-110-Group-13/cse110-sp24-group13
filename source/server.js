// Not using this file anymore




// const express = require('express');
// const { helloWorld, sum } = require('./helper-functions.js');

// const app = express();

// // Middleware
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Routes
// app.get('/', function (req, res) {
//   res.sendFile(process.cwd() + '/public/index.html');
// });

// app.get('/calendar', function (req, res) {
//   res.sendFile(process.cwd() + '/public/calendar/calendar.html');
// });

// // API 
// app.get('/api/helloWorld', function (req, res) {
//   res.send(helloWorld());
// });

// // Either runs the server or export app for testing
// if( require.main === module ) {
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => console.log(`Listening to: http://localhost:${port}/`));
// } else {
//   module.exports = app;
// }