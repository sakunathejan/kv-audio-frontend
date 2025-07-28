# KV Audio - Full Stack Audio Equipment Management System

A modern full-stack web application for managing audio equipment inventory, customer inquiries, and reviews.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Management**: Browse, search, and filter audio equipment
- **User Authentication**: Secure login/register system with role-based access
- **Admin Dashboard**: Comprehensive admin panel for managing products, reviews, and inquiries
- **Contact System**: Customer inquiry submission and management
- **Review System**: Product reviews with approval workflow

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete API for all frontend operations
- **Authentication**: JWT-based authentication system
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Image upload functionality for products
- **CORS Support**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
kv-audio-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── context/            # React context for state management
│   ├── pages/              # Page components
│   │   ├── admin/          # Admin panel pages
│   │   ├── home/           # Public pages
│   │   ├── login/          # Authentication pages
│   │   └── register/
│   └── utils/              # Utility functions and API
└── kv-audio-backend/
    ├── controllers/         # API controllers
    ├── models/             # MongoDB models
    ├── routes/             # API routes
    └── index.js            # Server entry point
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd kv-audio-frontend
npm install

# Install backend dependencies
cd ../kv-audio-backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `kv-audio-backend` directory:

```env
MONGO_URL=mongodb://localhost:27017/kv-audio
JWT_SECRET=your-secret-key-here
```

### 3. Start the Application

#### Option 1: Start Both Together (Recommended)
```bash
# From the frontend directory
npm run start-full
```

#### Option 2: Start Separately
```bash
# Terminal 1 - Start Backend
cd kv-audio-backend
npm start

# Terminal 2 - Start Frontend
cd kv-audio-frontend
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 👥 Default Users

### Admin User
- Email: `sakuna2005@gmail.com`
- Password: `123`

### Test User
- Email: `testuser@example.com`
- Password: `securepassword123`

## 🔧 API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users` - User registration

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:key` - Get product by key
- `POST /api/products` - Create new product
- `PUT /api/products/:key` - Update product
- `DELETE /api/products/:key` - Delete product

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/approve/:email` - Approve review
- `DELETE /api/reviews/:email` - Delete review

### Inquiries
- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `PUT /api/inquiries/:id` - Update inquiry
- `DELETE /api/inquiries/:id` - Delete inquiry

## 🎨 Features Overview

### Public Features
- **Home Page**: Landing page with featured products
- **Product Gallery**: Browse all products with search and filters
- **Product Details**: Detailed product view with images and specifications
- **Contact Form**: Submit inquiries to the business
- **User Registration/Login**: Account creation and authentication

### Admin Features
- **Dashboard**: Overview of products, reviews, and inquiries
- **Product Management**: Add, edit, and delete products
- **Review Management**: Approve or reject customer reviews
- **Inquiry Management**: Respond to customer inquiries
- **User Management**: Manage user accounts and permissions

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (Admin/User)
- Protected routes for admin functions
- Input validation and sanitization
- CORS protection
- Secure password handling

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
MONGO_URL=your-mongodb-url
JWT_SECRET=your-secret-key
PORT=3000
```

## 🛠️ Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run start-full` - Start both frontend and backend

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please contact the development team.
