# MovieApp - Based on top 250 IMDb movies 

A full-stack, responsive web application that displays the Top 250 movies listed on IMDb. The application allows admins to add, update, and delete movie records, while users can explore movies with details such as title, plot, poster, duration, rating, and release date. Users can also search movies by title or description and apply filters like sorting and ordering to view movies based on their preferences.

---
## Live URL
https://imdbmoviesapp.vercel.app/

## ✨ Key Features

- **Top 250 IMDb Movies**
  - Displays the Top 250 movies using IMDb IDs and OMDb API.
  - Movie data is stored in MongoDB for fast and reliable access.
  
- **One-Time Seeding Architecture**
  - IMDb movie IDs are seeded once into the database.
  - A backend worker fetches complete movie details using OMDb API.
  
- **Search Functionality**
  - Search movies by title or description.
  - Case-insensitive and optimized database queries.
  
- **Sorting & Filtering**
  - Sort movies by title, rating, release date, or duration.
  - Supports both ascending and descending order.
  
- **Pagination**
  - Client-side pagination for smooth navigation through movie lists.
    
- **Admin Dashboard**
  - Admin-only access secured with JWT authentication.
  - Admins can add, edit, and delete movies.
  - View movies added by the logged-in admin.
    
- **Secure Authentication**
  - JWT-based authentication using HTTP-only cookies.
  - Role-based access control (Admin / User).
    
- **Image Upload Support**
  - Movie posters uploaded and stored using Cloudinary.
  - Optimized image delivery.
    
- **Responsive UI**
  - Fully responsive interface built with Tailwind CSS.
  - Works seamlessly across mobile, tablet, and desktop devices.

---

## Screenshots

### Home Page
<img width="1906" height="964" alt="Movieapp Home page" src="https://github.com/user-attachments/assets/83692951-e6a6-4a8e-86fb-95ef71454876" />

### Login page
<img width="1906" height="964" alt="movieapp login page" src="https://github.com/user-attachments/assets/131a1c1c-9811-4891-8b58-ef364fb928ff" />

### Registration page
<img width="1906" height="964" alt="movie app register page" src="https://github.com/user-attachments/assets/09217edd-02c0-4af1-b554-95fbea8c74bb" />

### Admin Page
<img width="1906" height="964" alt="movieapp admin page" src="https://github.com/user-attachments/assets/7bb08672-8495-43f1-8cff-385111540115" />

### Add New movie Page
<img width="1906" height="964" alt="movieapp add movie page" src="https://github.com/user-attachments/assets/c593f0aa-9d21-49a3-9f25-24db7e4bd70b" />

### Update Movie Page
<img width="1906" height="964" alt="movieapp update movie page" src="https://github.com/user-attachments/assets/00dc708f-8645-4589-b187-e6c8e9b14331" />

---

## Prerequisites

* Node.js (16+ recommended)
* npm or yarn
* OMDB API key
* Cloudinary Account

---

## Project structure

```
/frontend      # Frontend (React UI)
/backend      # Backend (API endpoints, authentication, authorization, Database)
/README.md
```

---

## Environment variables

Create `.env` files for `frontend` and `backend` as needed. Example variables you may need:

**backend `.env`**

```
MONGODB_URI = your_mongodb_connection_string
PORT = eg.8000
JWT_SECRET = your_jwt_secret
FRONTEND_URL = your_front_app_url (eg. http://localhost:5173)

OMDB_API_KEY = your_omdb_api_key

CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret

NODE_ENVIRONMENT = "development"

```

**client `.env`**

```
VITE_BACKEND_URL = http://localhost:your_running_port (eg. http://localhost:8000)
```

---

## Seed Top 250 IMDb IDs into Database (Before starting the backend)

### To seed IMDb movie IDs into MongoDB, run:

```bash
node .\scripts\seedImdbQueue.js
```

- This script stores the Top 250 IMDb movie IDs in the database.
- After seeding, start the backend server.
- The backend runs a background worker that:
    - Fetches full movie details from the OMDb API
    - Uses the stored IMDb IDs
    - Saves the complete movie data into MongoDB

---

## Installation & Local Development

```bash
# Clone the repo
git clone https://github.com/mohammadazhar01/imdbmoviesapp
cd imdbmoviesapp

# backend (Open a terminal)
cd backend
npm install
# create .env and add the required variables
npm run dev   # or npm start depending on the package.json

# frontend (open a new terminal)
cd ../frontend
npm install
# create .env and add the required variables
npm run dev
```
---

## Testing the flow

1. Open the web application and explore the movies on the home page using pagination feature.
2. Search the movies based on title or descrition(movie plot).
3. Try filters like sortby and orderby.
4. Register as user or admin and then login.
5. If registered as admin, visit admin page using "admin" button on the home page.
6. Add a new movie using "add a new movie" button on admin page.
7. Update the movie details added by you.
8. Delete the movies added by you.

---


