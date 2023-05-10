# COMP6251 Find a Service Web Application

## Team Members
- Mihaela Florea (mf2u19@soton.ac.uk)
- Leonid Goldberg (lg1n22@soton.ac.uk)
- Boyang Wang (bw10g22@soton.ac.uk)
- Jianyu Sun (js5g22@soton.ac.uk)

## Frontend Development Instructions

- Frontend root:
  - Remote (Azure): https://findaservicefrontend.azurewebsites.net/
  - Local: https://localhost:3000/

### To work with the frontend

1. Install Node.js
2. After you `git clone` the repository from the root folder run

```bash
npm install
```

3. The node_modules folder should appear in the root folder
4. To start the backend server locally (for testing, the app will be connected to the remote one on Azure) run:

```bash
npm start
```

5. The server should automatically restart whenever you make changes to a file
6. Check the server started by going to http://localhost:3000/

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


