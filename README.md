# 💸 Expense Tracker App

A full-stack expense tracking application built with **React**, **Node.js**, **Express**, and **MongoDB**.

Users can:
- 🔐 Sign up and log in securely using JWT
- 💰 Set a monthly budget
- 🧾 Add, edit, delete, and view categorized expenses
- 📊 Visualize expenses using charts
- 🔒 Access dashboard only when authenticated

---

## 🚀 Features

- JWT-based authentication
- Protected routes for authorized users
- Fully functional expense CRUD
- Monthly budget and balance logic
- Category-wise pie chart via Recharts
- Elegant UI with TailwindCSS and toast notifications

---

## 🛠️ Tech Stack

| Frontend         | Backend          | Database       |
|------------------|------------------|----------------|
| React.js         | Node.js + Express| MongoDB        |
| Tailwind CSS     | JWT + bcrypt.js  | Mongoose       |
| Axios + React Hot Toast | dotenv   |                |

---

## 📦 Installation & Setup

### Prerequisites:
- Node.js & npm
- MongoDB
- Git

---

🧩Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

⚙️ 2. Backend Setup
cd backend
npm install

✅ Create a .env file in backend/ and add:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Then start the backend server:
node server.js

💻 3. Frontend Setup
Open a new terminal tab:
cd frontend
npm install
npm run dev

🙋‍♂️ Author
Rahul Singh Bisht
📧 rahul.singh@nestorbird.com


