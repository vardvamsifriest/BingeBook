# BingeBook

### A home for everything you watch.

BingeBook is a full-stack movie and TV tracking platform where you can discover titles, manage your personal library, track what you're watching, and share your thoughts through reviews.

## ✨ Features

- 🔐 User authentication with JWT
- 🔒 Password hashing with bcrypt
- 🔎 Search movies and TV shows
- 🎬 View detailed movie and TV information
- 📚 Personal watchlist and media library
- ▶️ Track titles as:
  - Watching
  - Watched
  - Dropped
  - Watchlist
- ⭐ Write and manage reviews
- 🗑️ Delete library items and reviews
- 👤 User profiles and activity
- 🔔 Custom toast notifications
- 📱 Responsive design
- ⏳ Loading and empty states
- 🎞️ TMDB-powered movie and TV data

## 📸 Screenshots

<!-- Add screenshots here -->

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose

### Authentication & Validation

- JWT
- bcrypt
- Zod

### External API

- TMDB API

### DevOps

- Docker
- Docker Compose


🚀 Getting Started
1. Clone the repository

```
git clone <your-repository-url>
cd BingeBook
```

2.Install dependencies

Make sure you have Node.js, pnpm, and Docker Desktop installed.

Install the project dependencies:
```
pnpm install
```

3. ⚙️ Environment Variables

Create a `.env` file in the backend:



```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_ACCESS_TOKEN=your_tmdb_access_token
TMDB_API_KEY=your_tmdb_api_key


```
4. Start the application with Docker Compose

Make sure Docker Desktop is running, then run:
```
docker compose up --build
```
This will build and start the frontend, backend, and WebSocket services.


5. Open the application

The application will be available at:
```
http://localhost:3000
```


6. Stop the application

To stop the running containers:
```
docker compose down
```


7. Rebuild the application

If you make changes to the Docker configuration or dependencies, rebuild the containers with:
```
docker compose up --build
```


🧠 What I Learned

Building BingeBook helped me work with:

- Full-stack application architecture
- JWT-based authentication
- Secure password handling with bcrypt
- REST API development with Express
- MongoDB data modeling with Mongoose
- API integration with TMDB
- Client-side authentication and protected routes
- Form validation with Zod
- Responsive UI development with Tailwind CSS
- Managing user-specific data and reviews
- Containerizing applications with Docker
- Managing multi-container applications with Docker Compose

🔮 Future Improvements

- Advanced filtering and sorting
- Personalized recommendations
- Social features and following users
- Ratings and statistics
- Improved media discovery
- More detailed user profiles

📄 License

This project is for learning and portfolio purposes.
