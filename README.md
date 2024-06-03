# Introduction
PistaGram is a real-time communication web application that allows users to add friends, chat in real-time, and manage their connections effortlessly. The application is responsive and provides a seamless user experience across different devices. Built with Node.js and JavaScript for the backend and React and TypeScript using Vite for the frontend, PistaGram leverages socket technology to enable real-time interactions.

# Features
- **Real-time Communication**: Chat with friends and teams in real-time using sockets.
- **User Authentication**: Secure signup and login functionalities.
- **Friend Management**: Discover and add friends from the discover section.
- **Responsive Design**: Enjoy a seamless experience across various devices.

# Tech Stack
- Frontend:
  - React
  - TypeScript
  - Vite
- Backend:
  - Node.js
  - JavaScript
- Real-time Communication:
  - Socket.io

# Installation
To run PistaGram locally, follow these steps:

Prerequisites
Ensure you have the following installed:

Node.js (v14.x or higher)
npm (v6.x or higher)
Clone the Repository
bash
Copy code
git clone https://github.com/Access-Denied-001/PistaGram.git
cd PistaGram
Install Dependencies
Navigate to the frontend and backend directories and install the required dependencies.

Backend
bash
Copy code
cd backend
npm install
Frontend
bash
Copy code
cd ../frontend
npm install
Configure Environment Variables
Create a .env file in the backend directory and add the necessary environment variables. An example .env file might look like this:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
SOCKET_PORT=your_socket_port
Run the Application
Backend
Start the backend server:

bash
Copy code
cd backend
npm start
Frontend
Start the frontend development server:

bash
Copy code
cd ../frontend
npm run dev
Usage
Open your browser and navigate to http://localhost:3000 (or the port specified in your Vite configuration).
Sign up for a new account or log in with an existing one.
Explore the discover section to add friends.
Start chatting in real-time!
Contributing
We welcome contributions to PistaGram! To contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes.
Commit your changes (git commit -m 'Add your feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Thank you to all the contributors who have made this project possible.
