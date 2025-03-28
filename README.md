## Folder Structure

📂 cineflow-frontend
┣ 📂 app → Next.js App Router
┃ ┣ 📂 (auth) → Authentication Pages
┃ ┃ ┣ 📜 login/page.tsx → Netflix-Style Login Page
┃ ┃ ┣ 📜 signup/page.tsx → Netflix-Style Signup Page
┃ ┃ ┣ 📜 forgotPassword/page.tsx→ Netflix-Style Signup Page
┃ ┃ ┗ 📜 layout.tsx → Auth Layout
┃ ┣ 📂 (dashboard) → Main UI (Movies, TV Shows, Genres)
┃ ┃ ┣ 📜 page.tsx → Homepage with Netflix UI
┃ ┃ ┣ 📜 movies/page.tsx → Movies Page
┃ ┃ ┣ 📜 tv-shows/page.tsx → TV Shows Page
┃ ┃ ┣ 📜 genres/page.tsx → Genres Page
┃ ┃ ┗ 📜 layout.tsx → Dashboard Layout (Navbar)
┣ 📂 components → Reusable UI Components
┃ ┣ 📜 Navbar.tsx → Netflix Navigation Bar
┃ ┣ 📜 HeroSection.tsx → Hero Section (Featured Movie Banner)
┃ ┣ 📜 MovieRow.tsx → Scrollable Movie Sections
┣ 📂 hooks → Hooks to Protect Pages
┃ ┣ 📜 userAuth.ts
┣ 📂 redux → Redux Store Setup
┃ ┣ 📂 slices → State Slices (Movies, User, etc.)
┃ ┃ ┣ 📜 authSlice.ts → Movie Fetching State (Redux Toolkit)
┃ ┃ ┣ 📜 userSlice.ts → Movie Fetching State (Redux Toolkit)
┃ ┃ ┣ 📜 videoSlice.ts → Movie Fetching State (Redux Toolkit)
┃ ┣ 📜 store.ts → Redux Store Configuration
┣ 📂 zustand → Zustand Store Setup
┃ ┣ 📜 store.ts → Zustand Store for UI State
┣ 📂 styles → Global Styles
┃ ┣ 📜 global.css → Netflix Font Family & Tailwind Styling
┣ 📜 tailwind.config.js → Tailwind Configuration
┣ 📜 next.config.js → Next.js Configuration
┣ 📜 package.json → Dependencies & Scripts
┣ 📜 .env → API Configuration

# Tech Stack

## Front End

### Next.js and Core Dependencies

Next JS (App Router + Server Actions) - For SSR, ISR and API routes
React - For building UI components
React DOM - React rendering for the DOM

### UI and Styling

ShadCn - Style UI Components
Tailwind CSS - For rapid styling and responsive design
Postcss - Required for Tailwind processing
Autoprefixer - Ensures CSS compatibility

### State Management

Redux toolkit - State management for global user/auth state
React Redux - Connection between react and redux
Zustand - Lightweight state management for UI like video control

### API data fetching and Backend Communication (Light API Handling using Next.Js)

React Query - For efficient API data fetching and caching
Next-Auth - Authentication handling (Google, Credentials, JWT etc.)
MongoDB - MongoDB driver for database connection
@Prisma/client - ORM for MongoDB

### Animations and UI Enhancements

Framer Motion - For animations, pager transitions, hover effects

### Video Playback and Streaming

Plyr - For video playback
React Player - For multiple formats like MP4 etc.

### Deployment and Performance Optimization

Vercel - Deployment platform for Next js
.env - Managing environment variables

## Back End

Node Js with Express js - For building API
Database -> Mongo DB - For flexible video meta data storage

## Authentication and Security

NextAuth.Js - For Authentication
JWT - For session management
RBAC - Role Based Access Control

## Deployment

Vercel - For Front End + Back End

## Streaming and Video Optimization

Vimeo APIs - For Video Processing and Delivery
Live Streaming - https based livestreaming for optimizing the video playbacks

## Features

### Light API Handling using Next.Js

Fetching Videos ("/api/videos")
Basic Authentication ("/api/auth")
UI related data (watch history, likes, comments)

### Heavy Backend Processing

User Profiles
AI powered video recommendations
Payment processing (Stripe)
HLS (Video encoding and streaming)
