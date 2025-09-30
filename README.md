# CService - Restaurant Management App

A complete restaurant management application with React Native frontend and Node.js backend.

## Features

### Backend (Node.js + Express + MongoDB)
- User authentication (JWT)
- Hotel registration and management
- Menu item management (single items and thalis)
- API endpoints for all operations
- CORS enabled for frontend communication

### Frontend (React Native + Expo)
- User registration and login
- Role-based navigation (User/Hotel)
- Hotel registration with image upload
- Menu management for hotel owners
- Hotel browsing and menu viewing for users
- Modern UI with dark theme

## Setup Instructions

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Make sure MongoDB is running on your system

4. Start the backend server:
   ```bash
   npm run dev
   ```
   Server will run on http://localhost:8000

### Frontend Setup
1. Navigate to MyApp directory:
   ```bash
   cd MyApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Scan the QR code with Expo Go app on your phone or use an emulator

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Hotels
- `GET /api/hotel` - Get all hotels
- `GET /api/hotel/:id` - Get single hotel
- `POST /api/hotel` - Create hotel (requires auth)
- `POST /api/hotel/:id/menu` - Add menu item (requires auth)

### Filter
- `GET /api/filter?type=veg` - Filter hotels by type

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/restaurant-app
JWT_SECRET=your-super-secret-jwt-key-here
PORT=8000
```

### Frontend
Set `EXPO_PUBLIC_API_BASE_URL` in your environment or modify `services/api.js`

## User Roles
- **User**: Can browse hotels and view menus
- **Hotel**: Can register hotel and manage menu items

## Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Frontend**: React Native, Expo, React Navigation, AsyncStorage, Axios
- **UI**: Custom dark theme with gold accents

## Current Status
✅ Backend server running on port 8000
✅ Frontend Expo server running
✅ All API endpoints tested and working
✅ Database connection established
✅ Authentication system implemented
✅ Hotel and menu management complete
