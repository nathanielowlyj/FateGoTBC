# Back End Developement CA2 Overview
This repository contains the source code and assets for Nathaniel's Back End Developement CA2. 

## Folder Structure

BED-CA2-P2323428-DIT/FT/1B/05
├─ node_modules
├─ Public
│  ├─ css 
│  │  └─ color.css
│  │  └─ style.css
│  ├─ images
│  │  └─ background.jpg
│  ├─ js  
│  │  ├─ bossFightMenu.js
│  │  ├─ getCurrentURL.js
│  │  ├─ loginTextToggle.js
│  │  ├─ loginUser.js
│  │  ├─ messages.js
│  │  ├─ profile.js
│  │  ├─ queryCmds.js
│  │  ├─ questMenu.js
│  │  ├─ registerUser.js
│  │  ├─ showAllBosses.js
│  │  ├─ showAllPlayers.js
│  │  ├─ showAllServants.js
│  │  ├─ summon.js
│  │  └─ userNavbarToggle.js
│  ├─ allBosses.html
│  ├─ allServants.html
│  ├─ bossFight.html
│  ├─ index.html
│  ├─ login.html
│  ├─ messages.html
│  ├─ players.html
│  ├─ profile.html
│  ├─ quest.html
│  ├─ register.html
│  └─ summon.html
├─ src
│  ├─ configs
│  │  ├─ createSchema.js
│  │  └─ initTables.js
│  ├─ controllers
│  │  ├─ bossesController.js
│  │  ├─ messageController.js
│  │  ├─ questController.js
│  │  ├─ questProgressController.js
│  │  ├─ servantsController.js
│  │  ├─ summoningController.js
│  │  └─ userController.js
│  ├─ middlewares     
│  │  ├─ bcryptMiddleware.js
│  │  └─ jwtMiddleware.js
│  ├─ models      
│  │  ├─ bossesModel.js
│  │  ├─ messageModel.js
│  │  ├─ questModel.js
│  │  ├─ questProgressModel.js
│  │  ├─ servantsModel.js
│  │  ├─ summoningModel.js
│  │  └─ userModel.js
│  ├─ routes 
│  │  ├─ bossesRoutes.js
│  │  ├─ mainRoutes.js
│  │  ├─ messageRoutes.js
│  │  ├─ questRoutes.js
│  │  ├─ questProgressRoutes.js
│  │  ├─ servantsRoutes.js
│  │  ├─ summoningRoutes.js
│  │  └─ userRoutes.js
│  ├─ services
│  │  └─ db.js
│  └─ app.js
├─ .env
├─ .gitignore
├─ index.js
├─ package-lock.json
├─ package.json
└─ README.md


## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter https://github.com/ST0503-BED/bed-ca2-nathanielowlyj.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Set Up the Environment

1. In the project root directory, create a new file named .env.

2. Open the .env file in a text editor.

3. Copy the following example environment variables into the .env file:

   plaintext
   DB_HOST="localhost"
   DB_USER="root"
   DB_PASSWORD="N4t30911"
   DB_DATABASE="ca2"

   JWT_SECRET_KEY=sf89uwe89&fr1231c
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256

   Update the values of the environment variables according to your MySQL database configuration.

## Install Dependencies

1. Open the terminal in VSCode by going to View > Terminal or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:
   
   npm install
   npm i mysql2 express nodemon dotenv bcrypt jsonwebtoken
   
## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the .env file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   npm run init_tables

### Breakdown of the Code 


### Routes

# Main Routes
- Entry point for routing, redirects requests to specific entity routes.
- Located in src/routes/mainRoutes.js.

# Bosses Routes
- Defines routes related to bosses, covering GET, GET by ID, POST, PUT, and DELETE.
- Uses the bossesController for handling these routes.
- Located in src/routes/bossesRoutes.js.

# Messages Routes
- Defines routes related to messages, covering GET, GET by ID, POST, PUT, and DELETE.
- Uses the messageController for managing these routes.
- Located in src/routes/messagesRoutes.js.

# Quest Progress Routes
- Defines routes related to quest progress, covering GET, GET by ID, POST, PUT, and DELETE.
- Uses the questProgressController to handle these routes.
- Located in src/routes/questProgressRoutes.js.

# Quest Routes
- Defines routes related to quest, covering GET, GET by ID, POST, PUT, and DELETE.
- Uses the questController for handling these routes.
- Located in src/routes/questRoutes.js.

# Servants Routes
- Defines routes related to servants, covering GET, GET by ID, POST, PUT, and DELETE.
- Uses the servantsController for handling these routes.
- Located in src/routes/servantsRoutes.js.

# Summoning Routes
- Defines routes related to summoning, covering GET, GET by ID, POST, PUT, and DELETE.
- Uses the summoningController for handling these routes.
- Located in src/routes/summoningRoutes.js.

# User Routes
- Defines routes related to user data, covering GET, POST, PUT, and DELETE.
- Uses the userController to handle these routes.
- Located in src/routes/userRoutes.js.


### Controllers

# Bosses Controller
- Manages handling HTTP requests related to bosses.
- Implements CRUD operations (Create, Read, Update, Delete) for bosses.
- Located in src/controllers/bossesController.js.

# messages Controller
- Manages HTTP requests related to messages data.
- Implements CRUD operations for messages.
- Located in src/controllers/messagesController.js.

# questProgress Controller
- Manages HTTP requests associated with questProgress data.
- Implements CRUD operations for questProgress.
- Located in src/controllers/questProgressController.js.

# quest Controller
- Manages handling HTTP requests related to quest data.
- Implements CRUD operations for quest.
- Located in src/controllers/questController.js.

# servants Controller
- Manages HTTP requests related to servants.
- Implements CRUD operations for servants.
- Located in src/controllers/servantsController.js.

# summoning Controller
- Manages handling HTTP requests related to summoning.
- Implements CRUD operations (Create, Read, Update, Delete) for summoning.
- Located in src/controllers/summoningController.js.

# User Controller
- Manages HTTP requests associated with user data.
- Implements CRUD operations for users.
- Located in src/controllers/userController.js.


### Models

# bosses Model
- Defines the data structure and communicates with the database for boss-related tasks.
- Used by the bossesController to perform CRUD operations.
- Located in src/models/bossesModel.js.

# messages Model
- Defines the data structure and communicates with the database for messaging-related tasks.
- Used by the messageController to perform CRUD operations.
- Located in src/models/messageModel.js.

# questProgress Model
- Defines the data structure and communicates with the database for quest-related tasks.
- Used by the questProgressController to perform CRUD operations.
- Located in src/models/questProgressModel.js.

# quest Model
- Defines the data structure and communicates with the database for quest-related tasks.
- Used by the questController to perform CRUD operations.
- Located in src/models/questModel.js.

# summoning Model
- Defines the data structure and communicates with the database for summoning-related tasks.
- Used by the summoningController to perform CRUD operations.
- Located in src/models/summoningModel.js.

# servants Model
- Defines the data structure and communicates with the database for servants-related tasks.
- Used by the servantsController to perform CRUD operations.
- Located in src/models/servantsModel.js.

# User Model
- Defines the data structure and communicates with the database for user-related tasks.
- Used by the User Controller to perform CRUD operations.
- Located in src/models/userModel.js.


### Database Configuration

# Database Initialization
- Ensures the creation of tables and initial data for the application.
- Located in src/configs/initTables.js.

### Services

# Database Service
- Manages database connectivity and queries.
- Located in src/services/db.js.

### app.js

- Main entry point of the application.
- Sets up the Express application.
- Handles HTTP requests.
- Located in the project root as app.js.

### index.js

- Initiates and starts the server for the application.
- Requires and executes the app.js file.
- Listens for incoming requests on port 3000.
- Responsible for starting the application.
- Located in the project root as index.js