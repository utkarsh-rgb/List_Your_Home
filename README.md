# 🏡 List Your Home – Rental Property Listing Web Application

**List Your Home** is a dynamic web application that enables users to list, manage, and explore rental properties online. Built using **Express.js**, **MongoDB**, **Passport.js**, and **EJS**, this platform allows property owners to create listings with detailed information, images, and pricing, while users can browse, review, and interact with listed properties.

---

## 🔧 Features

### 👤 User Features
- User registration and login using **Passport.js**
- Create detailed property listings (with title, description, pricing, images, and location)
- View and search available rental properties
- Submit and view reviews on listed properties
- Manage own listings (edit/delete)

### 🛠️ Admin/Platform Features
- Secure session management
- Server-side rendering using **EJS**
- CRUD operations for listings
- Review moderation (future scope)

---

## 💻 Tech Stack

| Technology   | Purpose                        |
|--------------|--------------------------------|
| Express.js   | Backend framework              |
| MongoDB      | Database for storing listings  |
| EJS          | Templating engine for views    |
| Passport.js  | Authentication and sessions    |
| Multer       | Image upload handling          |
| Mongoose     | ODM for MongoDB                |

---

## 🧠 Architecture

- **MVC Pattern** for clean separation of concerns
- **Passport.js** for authentication (local strategy)
- **EJS templates** for rendering dynamic content
- **RESTful routing** for API endpoints
- **Multer** for file/image uploads


---

## 📦 Installation and Setup

```bash
# Clone the repository
git clone https://github.com/your-username/list-your-home.git
cd list-your-home

# Install dependencies
npm install

# Set up environment variables (create a `.env` file)
touch .env
