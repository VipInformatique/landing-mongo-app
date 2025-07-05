# 📬 Landing Page with MongoDB & CI/CD

A lightweight, scalable web application designed as a landing page for collecting user contact data. It features a complete CI/CD pipeline for fully automated deployments.

## 🔍 Overview

This project provides a functional landing page with a contact form that captures user emails. The data is securely stored in a cloud-hosted **MongoDB Atlas** database. The application sends an automated confirmation email to the user and supports a full DevOps workflow, including containerization with **Docker** and automated deployment via **GitHub Actions** and webhooks.

It is an ideal template for small businesses, marketing campaigns, or as a hands-on project for DevOps practices.

## ✨ Key Features

- ✅ Responsive HTML5/CSS3 landing page with an integrated contact form.
- ✅ Secure email collection with server-side validation and duplicate prevention.
- ✅ Cloud-hosted database integration with **MongoDB Atlas**.
- ✅ Automated email confirmation workflow using **Nodemailer** and Gmail SMTP.
- ✅ Secure management of secrets and environment variables.
- ✅ Fully containerized with **Docker** for consistent, portable deployments.
- ✅ **Continuous Integration (CI)** pipeline with GitHub Actions to build and push Docker images.
- ✅ **Continuous Deployment (CD)** enabled by webhook-triggered updates on the production server.

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3 (static page) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Email** | Nodemailer (with Gmail SMTP) |
| **DevOps** | Docker, Docker Hub, GitHub Actions, Webhooks |

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed locally.
- A running MongoDB instance (either local or a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)).
- A Gmail account with an "App Password" enabled for Nodemailer.

### Configuration

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/VipInformatique/landing-mongo-app.git](https://github.com/VipInformatique/landing-mongo-app.git)
    cd landing-mongo-app
    ```

2.  **Create the environment file:**
    Create a `.env` file in the root directory and add your credentials. This file is listed in `.gitignore` and will not be committed.
    ```env
    # MongoDB Connection URI
    MONGO_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/your-db
    
    # Gmail Credentials for Nodemailer
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_gmail_app_password
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the application locally:**
    ```bash
    node server.js
    ```
    The server will be available at `http://localhost:3000`.

## 🐳 Docker Support

You can also run this application as a Docker container.

1.  **Build the Docker image:**
    ```bash
    docker build -t vipinformatique/landing-app .
    ```

2.  **Run the Docker container:**
    Remember to pass your environment variables to the container.
    ```bash
    docker run -d -p 3000:3000 \
      --name landing-app \
      --env-file ./.env \
      vipinformatique/landing-app
    ```

## 🔁 CI/CD Pipeline

This project includes a fully automated CI/CD pipeline.

### Continuous Integration (CI)

-   The GitHub Actions workflow in `.github/workflows/main.yml` is triggered on every push to a tag (e.g., `v1.0.0`).
-   It automatically builds a new Docker image.
-   The new image is pushed to [Docker Hub](https://hub.docker.com/r/vipinformatique/landing-app) with both a version tag and the `latest` tag.

### Continuous Deployment (CD) - Server-Side

---

## ⚙️ Continuous Deployment (CD) - Server-Side Setup

This project is designed for fully automated deployments. While the CI pipeline builds and pushes the Docker image, the CD part is handled on the production server for maximum security.

Below is the recommended setup for the deployment server.

### 1. Secure Secret Management (Crucial Step)

Sensitive data (database URI, email passwords) **must never be stored in Git**. They should be placed in an environment file on the server, secured with strict permissions.

**Example: `/etc/secrets/landing-app.env`** *(This file must be created manually on the server and protected, e.g., `chmod 600`)*
Production environment variables
MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/mydb"
EMAIL_USER="your_email@gmail.com
EMAIL_PASS="your_gmail_app_password"


### 2. Deployment Script

The server needs a script that pulls the latest Docker image and restarts the container, securely loading the secrets from the `.env` file.

See the example script: **[update.sh.example](update.sh.example)**

This script should be placed on the server (e.g., in `/opt/scripts/`) and made executable.

### 3. Webhook Listener

A webhook listener (like the `adnanh/webhook` container) running on the server triggers the deployment script when it receives a notification from the CI pipeline.

See the example configuration: **[hooks.json.example](hooks.json.example)**
## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## 👨‍💻 Author

**Rafal RUTKOWSKI**
- Website: [vipinformatique.fr](https://vipinformatique.fr)
- GitHub: [@VipInformatique](https://github.com/VipInformatique)
