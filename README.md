# 📝 AWS Serverless Todo App

A simple full-stack Todo application I built to familiarize myself with a new tech stack using **React (Vite)** for the frontend and **AWS Lambda, API Gateway, and DynamoDB** for the backend.  
Deployed via **AWS Amplify** (frontend) and **AWS Lambda + API Gateway** (backend).

---

## 🚀 Live Demo
🔗 [View Live App](https://main.d1vpn8ythwfnv8.amplifyapp.com/)

---

## ⚙️ Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS for styling
- Axios / Fetch for API calls
- Deployed with AWS Amplify

**Backend**
- AWS Lambda (Node.js)
- API Gateway
- DynamoDB (NoSQL storage)
- CORS-enabled REST API

---

## 🏗️ Architecture Overview
React (Vite) → API Gateway → Lambda → DynamoDB

- **Frontend:** Handles all UI interactions and calls API endpoints.
- **API Gateway:** Exposes HTTP endpoints (`GET`, `POST`, `DELETE`).
- **Lambda Functions:** Process requests and interact with DynamoDB.
- **DynamoDB:** Stores todo items (id, title, completed status).

---

## 🔑 Environment Variables

| Variable | Description |
|-----------|-------------|
| `VITE_API_URL` | Your API Gateway endpoint (e.g. `https://2rrmzzwy8k.execute-api.us-east-2.amazonaws.com/dev`) |

To set this up locally:
```bash
echo "VITE_API_URL=https://2rrmzzwy8k.execute-api.us-east-2.amazonaws.com/dev" > .env

```

## 🧠 Features

✅ Add new todos
✅ View all todos
✅ Delete todos
✅ Responsive layout
✅ Fully serverless architecture
✅ CORS-enabled API

# Clone repo
git clone https://github.com/v4mping/AWS-Todo.git
cd AWS-Todo

# Install dependencies
npm install

# Set your API URL
echo "VITE_API_URL=https://2rrmzzwy8k.execute-api.us-east-2.amazonaws.com/dev" > .env

# Run locally
npm run dev
