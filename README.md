# Trezorit Channel
## The Task
To create an application, which able to transfer text data though a secret and secure channel to a client in real-time.
## Applied Libraries
### Node.js
Set up backend functionalities, general package management.
### Express.js
Set up **HTTPS** server.
### Socket.io
To build up a real-time communication channel between multiple clients. I choose this library, because it has great cross-browser support, even in case of an older browser that didn't support WebSocket technology.
### Crypto-js
To apply **AES** en- and decryption, and **Hmac-SHA1** integrity security on the front end. I choose this library because it is widely used (more than 2M weekly download), furthermore, it has no further dependency to avoid unwanted code or behavior. 
### Semistandard
Linter for JavaScript files. I like semicolon-ended statements in my code. 
### TestCafe
**End-to-End** testing. TC is not the fastest library, but reliable and easy-to-maintain.
### Browserify
Enabling node module import on client-side.
## How to run this application?
1. Clone or download the repository from GitHub.
2. Go to the project folder and run `npm install`.
3. Create your SSL Certificates and Keys.
    * Go to the `trezorit/server` folder and create a new folder with the name `/ssl`.
    * Create your SSL certificates and keys. I used [this script](https://gist.github.com/bjanderson/075fadfccdd12623ab935e57eff58eb4) to create mines.
    * Go to the `trezorit/server/index.js` file and make sure that in httpsOptions you import the right filenames:
  ```javascript
  const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', [your filename])),
  key: fs.readFileSync(path.join(__dirname, 'ssl', [your filename]))
  };
  ```
4. Run `npm start` to start the application.
5. Open a browser and go `https://localhost:4000`.
## Limitations
This application provides only one-way-communication between one sender and multiple receiver clients. Although it is not a hard task to scale it to a multiple-way communication channel based on the WebSocket technology.

The application doesn't require any authentication process, therefore doesn't include any database or storage.

Only plain text can be transferred, no styled texts, tables, or complete files.

The application is not deployed on a public server. I used to use for other projects Heroku, but unfortunately, Heroku supports HTTPS servers only for paid-customers. I'm not one of them. 