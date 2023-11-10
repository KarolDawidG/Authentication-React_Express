# Mega-Test
This is a full-stack web application built using Express (JavaScript) for the backend and React with TypeScript for the frontend. This application is a user-friendly tool for creating, editing, saving, and loading multiple-choice tests, facilitating test management and customization. The app also includes a fully functional user registration and login panel. Registration is secured with reCAPTCHA and requires email confirmation. Login is secured with JSON Web Tokens (JWT), and it also includes a password reset feature. Mega-test also includes a small contact form.

The application boasts full responsiveness, achieved in part through the utilization of Bootstrap, among other elements.

## Demo
You can check out the demo in the link below
- [Mega Test](https://mega-test.netlify.app/)

## ScreenShot
<img src="/demo_dataset/main2.png" width="auto" height="auto"  alt="screenshot1">
<img src="/demo_dataset/create2.png" width="auto" height="auto"  alt="screenshot2">
<img src="/demo_dataset/quiz2.png" width="auto" height="auto" alt="screenshot3">

## Getting Started
### `To run the application locally, follow these steps:`

1. Clone this repository to your local machine.

2. Install the required dependencies for both the backend and frontend by navigating to the following directories and running the command:

### `npm install` 
 - Authentication-React Express/log-reg_back-end
 - Authentication-React Express/log-reg_front-end

3. Set up the necessary database configurations by providing the required data. 
You can do this by:
Creating a .env file in the backend directory (Authentication-React Express/log-reg_back-end) and adding your database connection details.

#### Once the dependencies are installed and the database is configured, you can start the application by running the following commands in separate terminal windows (CMD):

# For the backend:
 - ### `npm run backend`

# For the frontend:
 - ###  `npm run frontend`

## Other usefull scripts:
 - ###  `npm run prettier`
   -- npx prettier --write \"**/*.{js,ts,tsx}\" --ignore-path .prettierignore
 #### This script uses the Prettier tool to automatically format files in the project.

# Features
 - Creating, editing, saving, and deleting multiple-choice tests
 - Ability to export and import data to a txt file
 - Performing A, B, and C multiple-choice tests
 - User Authentication
 - User Registration
 - Password Reset
 - Admin Panel
 - Authorization via JWT
   
# Technologies Used
## backend
 - Express (Node.js)
 - MySQL database
 - Axios
 - Bcrypt
 - Cors
 - Crypto
 - Dotenv
 - Express-rate-limit
 - Helmet
 - JsonWebToken
 - Nodemailer
 - Modemon
 - Uuid
 - Winston
 - Jest

 ## frontend
 - React (TypeScript)
 - Bootstrap

   
If you encounter any issues or have questions, please refer to the project's documentation or reach out to the project maintainers.
