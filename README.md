## Frontend Development Instructions
- Frontend root:
    - Remote (Azure): https://findaservicefrontend.azurewebsites.net/
    - Local: https://localhost:3000/

### To work with the frontend
1. Install Node.js
2. After you `git clone` the repository from the root folder run
```bash
npm init
```
3. The node_modules folder should appear in the root folder
4. To start the backend server locally (for testing, the app will be connected to the remote one on Azure) run:
```bash
npm start
```
5.The server should automatically restart whenever you make changes to a file
6. Check the server started by going to http://localhost:3000/

## Attributions (to add in the footer later)
<a href="https://www.flaticon.com/free-icons/tick" title="tick icons">Tick icons created by Roundicons - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/delete" title="delete icons">Delete icons created by Pixel perfect - Flaticon</a>

## Folder Structure

```
.
├── public                # The compiled index.html page and any images
├── src                   # Source files
│   ├── pages             # All the components for pages
│   ├── stores            # JS classes used to store state that 
│   │                     #  can be accessed from all pages as needed
│   ├── utils             # 
│   │    ├── components   # General components used throughout the whole app
│   │    ├── fonts        # Google fonts
│   │    ├── helpers      # Constants and other useful reusable bits of JS
│   │    └── styles       # Any styled components, the main css file and the theme
│   ├── App.js            # Where the Routing between pages happens
│   └── index.js          # Entrypoint of the app
├── .env                  # Declares environmental variables
├── .gitignore            # Declares which files not to push to github
├── package.json          # Declares Node.js scripts and libraries used
└── README.md
```

## Auto-generated React Docs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
