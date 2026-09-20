BingeBook
A home for everything you watch.

BingeBook is a full-stack movie and TV tracking platform where you can discover titles, manage your personal library, track what you're watching, and share your thoughts through reviews.

✨ Features
🔐 User authentication with JWT
🔒 Password hashing with bcrypt
🔎 Search movies and TV shows
🎬 View detailed movie and TV information
📚 Personal watchlist and media library
▶️ Track titles as:
Watching
Watched
Dropped
⭐ Write and manage reviews
🗑️ Delete library items and reviews
👤 User profiles and activity
🔔 Custom toast notifications
📱 Responsive design
⏳ Loading and empty states
🎞️ TMDB-powered movie and TV data
🛠️ Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
Backend
Node.js
Express
TypeScript
MongoDB
Mongoose
Authentication & Validation
JWT
bcrypt
Zod
External API
TMDB API
DevOps
Docker
Docker Compose
📸 Screenshots
⚙️ Environment Variables

Create a .env file in the backend:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_ACCESS_TOKEN=your_tmdb_access_token
TMDB_API_KEY=your_tmdb_api_key
🚀 Getting Started
1. Clone the repository
git clone <your-repository-url>
cd BingeBook
2. Configure environment variables

Create the required .env file in the backend and add your MongoDB, JWT, and TMDB credentials.

3. Start the application with Docker Compose

Make sure Docker Desktop is running, then run:

docker compose up --build

This will build and start the frontend, backend, and WebSocket services.

4. Open the application

The application will be available at:

http://localhost:3000
5. Stop the application
docker compose down
🧠 What I Learned

Building BingeBook helped me work with:

Full-stack application architecture
JWT-based authentication
Secure password handling with bcrypt
REST API development with Express
MongoDB data modeling with Mongoose
API integration with TMDB
Client-side authentication and protected routes
Form validation with Zod
Responsive UI development with Tailwind CSS
Managing user-specific data and reviews
Containerizing applications with Docker
Managing multi-container applications with Docker Compose

🔮 Future Improvements

Advanced filtering and sorting
Personalized recommendations
Social features and following users
Ratings and statistics
Improved media discovery
More detailed user profiles

📄 License

This project is for learning and portfolio purposes.
