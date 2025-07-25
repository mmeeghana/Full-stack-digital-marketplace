# Full Stack Digital Marketplace

A full-stack web application for buying and selling digital products, built with React (frontend) and Node.js/Express (backend).

## Features
- User authentication (signup, login)
- Create, update, and delete products
- Upload product images
- Marketplace to browse and purchase products
- Dashboard for managing your own products
- Secure API endpoints

## Technologies Used
- **Frontend:** React, Vite, Axios, Tailwind CSS
- **Backend:** Node.js, Express, Multer, MongoDB

## Folder Structure
```
Gumroad/
├── backend/      # Express backend API
├── frontend/     # React frontend app
└── Resources/    # Product images and resources
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB running locally or remotely

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/mmeeghana/Full-stack-digital-marketplace.git
   ```
2. Install dependencies for both frontend and backend:
   ```
   cd Gumroad/backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in `backend` for MongoDB URI and JWT secret.

### Running the App
- Start the backend server:
  ```
  cd Gumroad/backend
  npm start
  ```
- Start the frontend app:
  ```
  cd Gumroad/frontend
  npm run dev
  ```
- Visit `http://localhost:5173` for the frontend and `http://localhost:3000` for the backend API.

## Usage
- Sign up and log in to your account.
- Create new products and upload images.
- Browse products in the marketplace.
- Manage your products in the dashboard.

## Deployment
- Use `.gitignore` to avoid uploading `node_modules` and sensitive files.
- Push only source code and configuration files to GitHub.

## License
This project is licensed under the MIT License.

## Author
- Meghana ([@mmeeghana](https://github.com/mmeeghana))