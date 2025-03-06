# Elitemart - Full-Stack eCommerce Platform

## 🚀 Overview

Elitemart is a full-stack eCommerce platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides users with a seamless shopping experience, secure authentication, and efficient product management.

## 🌟 Features

- **User Authentication:** JWT-based login and registration system
- **Admin Dashboard:** Manage products, users, and orders
- **Product Management:** Add, update, and delete products with images
- **Shopping Cart:** Add products to cart and proceed to checkout
- **Order Processing:** Place and track orders
- **Payment Integration:** Stripe, Supports Cash on Delivery (COD)
- **Responsive Design:** Fully optimized for mobile and desktop

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** Context API
- **Hosting:** Vercel

## 📂 Folder Structure

```
E-commerce/  
│── admin/             # React.js admin
│── backend/           # Node.js backend
│── frontend/          # React.js frontend
```

## 🚀 Installation

### Clone the repository
```sh
git clone https://github.com/sumit12376/E-commerce.git
cd E-commerce
```

### Backend Setup
```sh
cd backend
npm install
```

### Admin Setup
```sh
cd admin
npm install
npm run dev
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## 🔗 Live Demo

[Elitemart Live](https://elitemart-frontend.vercel.app/)

## 📌 Environment Variables

Create a `.env` file in the `backend` directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License

This project is licensed under the MIT License.

---

**Developed by [Sumit Vikram Singh](https://github.com/sumit12376)** ✨

