# 📬 landing-mongo-app

**Landing Page with Contact Form, MongoDB Backend, Docker & CI/CD Pipeline**


## 🔍 Project Overview

This project is a lightweight, scalable web application designed as a landing page for collecting user contact data. It includes a **contact form** that captures email addresses and stores them in a **cloud-hosted MongoDB Atlas** database. The project supports **automated email confirmation**, uses **Docker** for containerization, and features a complete **CI/CD pipeline with GitHub Actions and Webhook-based deployment**.

🛠️ **Designed for:** small IT businesses, startups, marketing campaigns, and DevOps practice environments.

## 🚀 Key Features

- ✅ Responsive landing page with integrated contact form  
- ✅ Secure email collection and duplicate prevention  
- ✅ Cloud database: MongoDB Atlas (NoSQL)  
- ✅ Automatic confirmation email via Gmail SMTP  
- ✅ Environment variable management with `.env`  
- ✅ Containerized with Docker  
- ✅ Automated deployment using GitHub Actions + Docker Hub  
- ✅ Webhook-triggered redeployment on push  


## 🏗️ Tech Stack

| Layer       | Technology                 |
|-------------|-----------------------------|
| Frontend    | HTML5, CSS3 (static page)   |
| Backend     | Node.js, Express.js         |
| Database    | MongoDB Atlas + Mongoose    |
| Email       | Nodemailer + Gmail SMTP     |
| DevOps      | Docker, Docker Hub, GitHub Actions, Webhook (adnanh/webhook) |


## 🧾 Folder Structure


landing-mongo-app/
│
├── public/                # Frontend (formulaire HTML)
├── models/Contact.js      # Mongoose schema for email
├── server.js              # Main application logic (Express + routes)
├── .env                   # Mongo URI, email credentials
├── Dockerfile             # Container definition
├── .github/workflows/     # GitHub Actions CI/CD pipeline
└── README.md              # Documentation


## 🧪 Environment Setup

1. **Install Node.js and MongoDB (optional if using Atlas)**
2. **Create `.env` file**:


MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydb?retryWrites=true
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password


3. **Run locally**:

npm install
node server.js


## 🐳 Docker Support

**Build the image:**

docker build -t vipinformatique/landing-app .


**Run the container:**

docker run -d -p 3000:3000 --name landing-app vipinformatique/landing-app


## 🔁 CI/CD Pipeline

This project includes a **CI/CD pipeline** with the following steps:

1. GitHub Actions triggers on push to main branch.  
2. Docker image is built and pushed to Docker Hub.  
3. A webhook notifies the production server.  
4. `adnanh/webhook` receives the webhook and executes `update.sh`, which:  
   - Pulls the latest image  
   - Removes the old container  
   - Starts the new container automatically  

> 🧠 Ensures **zero-downtime** deployment and easy rollback via image tag history.


## 📧 Email Confirmation Flow

- Email is stored in MongoDB with `confirmed: false`  
- A Gmail SMTP service sends a confirmation email  
- Clicking the link updates the document to `confirmed: true`


## 📜 License

This project is licensed under the MIT License.


## 👨‍💻 Author

**Rafal RUTKOWSKI** – [vipinformatique.fr](https://vipinformatique.fr)


## 📎 Contribution & Contact

Pull requests are welcome! For major changes, please open an issue first.

📬 You can contact me at: [contact@vipinformatique.fr](mailto:contact@vipinformatique.fr)
