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

- **Prerequisites**: Ensure you have the following installed:

  - Node.js (v20.x or higher)
  - npm (v10.x or higher)
  - docker (v26.x or higher)

- **Steps**:
  - **Clone the repository**
    ```
      git clone https://github.com/Access-Denied-001/PistaGram.git
      cd PistaGram
    ```
  - **Environment Variables**
    ```
      PORT=8000 (default)
      ENVIRONMENT=developement or production
      MONGO_DB_USERNAME=<MONGODB_USERNAME>
      MONGO_DB_PASSWORD=<MONOGODB_PASSWORD>
      MONGO_DB_URI=<MONGODB_URI>
      JWT_SECRET_KEY=<JWT_SECRET>
      IP=<PRIVATE_IP_ADDRESS>
    ```
  - **Docker Containers Initialization**
    - **Prometheus**
        ```
         cd Prometheus
        ```
        Open the prometheuse-config.yml and change the targets according to your ip. For example, <YOUR_PRIVATE_IP>:8000
        ```
          docker compose up
        ```
        **Output**
          ![image](https://github.com/Access-Denied-001/PistaGram/assets/65714586/4551eb77-f851-4fc7-a9f1-3fdab142c170)

    - **Loki**
      ```
        docker run -d --name=loki -p 3100:3100 grafana/loki
      ```
      **Output**
        ![image](https://github.com/Access-Denied-001/PistaGram/assets/65714586/e0b5c508-6820-4ffe-98fd-1979ab2c5024)

    - **Grafana**
      ```
        docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
      ```
      **Output**
      ![image](https://github.com/Access-Denied-001/PistaGram/assets/65714586/ab742781-c987-4a94-b5fb-cbd25984b8e6)
  
  - **Run the Application**

    - **Development**

      Backend-
        ```
        npm install
        cd Backend
        npm run dev
        ```
      Frontend-
        ```
        cd Frontend
        npm install
        npm run dev
        ```

    - **Production**
      ```
        npm run build
        npm run prod
      ```

# Usage
- Open your browser and navigate to http://localhost:8000(for production) and to http://localhot:5000(for development).
- Sign up for a new account or log in with an existing one.
- Explore the discover section to add friends.
- Start chatting in real-time!
- To visualize on grafana dashboard, navigate to http://localhost:3000.
- To see prometheus metrics, navigate to http://localhost:9090/metrics and for grafana related things navigate to http://localhost:3100/metrics.

# Contributing
We welcome contributions to PistaGram! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -m 'Add your feature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a pull request.

# Acknowledgements
Thank you to all the contributors who have made this project possible.
