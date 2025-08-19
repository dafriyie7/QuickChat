# QuickChat

QuickChat is a full-stack real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It supports user authentication, real-time messaging, image sharing, and user profile management.

## Features

- User authentication (signup, login, JWT-based auth)
- Real-time messaging with Socket.IO
- Online user status
- Profile management (update name, bio, profile picture)
- Image sharing in chat
- Responsive UI with React and Tailwind CSS

## Project Structure

```
QuickChat/
├── client/         # React frontend
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # React components (Sidebar, Chatcontainer, etc.)
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components (HomePage, LoginPage, ProfilePage)
│   │   ├── App.jsx         # Main app component with routes
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind and global styles
│   ├── context/    # React Context for Auth and Chat
│   ├── public/     # Static assets
│   ├── package.json
│   └── vite.config.js
├── server/         # Node.js/Express backend
│   ├── controllers/    # Route controllers (user, message)
│   ├── lib/            # DB connection, Cloudinary, utils
│   ├── middleware/     # Auth middleware
│   ├── models/         # Mongoose models (User, Message)
│   ├── routes/         # Express routers
│   ├── server.js       # Main server file (Express + Socket.IO)
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database
- Cloudinary account (for image uploads)
- Vercel CLI (optional, for deployment)

### Environment Variables

Create `.env` files in both `client/` and `server/` directories.

#### server/.env

```
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

#### client/.env

```
VITE_BACKEND_URL=http://localhost:10000
```

### Installation

#### Backend

```sh
cd server
npm install
npm start
```

#### Frontend

```sh
cd client
npm install
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

## Usage

- Visit the frontend URL.
- Sign up for a new account or log in.
- Start chatting with other users in real time.
- Update your profile and upload a profile picture.
- Share images in chat.

## Deployment

The project is configured for deployment on Vercel. See [`client/vercel.json`](client/vercel.json) and [`server/vercel.json`](server/vercel.json) for routing and build settings.

## Key Files and Components

- **Backend**
  - [`server/server.js`](server/server.js): Express server with Socket.IO integration.
  - [`server/controllers/userController.js`](server/controllers/userController.js): User authentication and profile logic.
  - [`server/controllers/messageController.js`](server/controllers/messageController.js): Messaging logic.
  - [`server/models/User.js`](server/models/User.js), [`server/models/Message.js`](server/models/Message.js): Mongoose models.

- **Frontend**
  - [`client/src/App.jsx`](client/src/App.jsx): Main app with routing.
  - [`client/context/AuthContext.jsx`](client/context/AuthContext.jsx): Auth state and logic.
  - [`client/context/ChatContext.jsx`](client/context/ChatContext.jsx): Chat state and logic.
  - [`client/src/components/Sidebar.jsx`](client/src/components/Sidebar.jsx): User list and navigation.
  - [`client/src/components/Chatcontainer.jsx`](client/src/components/Chatcontainer.jsx): Main chat UI.

## License

This project is licensed under the ISC License.

---
