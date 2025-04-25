
# 🎯 AI-Based Career Counselling

An intelligent, two-mode career guidance platform that recommends ideal occupations based on users' **personality traits, interests, and education background** using AI and Machine Learning.

---

## 🔍 Project Overview

This system offers two interactive modes:

### 1. **With Questions Mode**  
Users answer **OCEAN (Big Five)** and **RIASEC (Holland Code)** questions, then select their education category to receive personalized career recommendations.

### 2. **Without Questions Mode**  
Users provide a **free-text input** (e.g., skills, education, experience), and the system generates career suggestions using **NLP-based analysis**.

The platform applies **cosine similarity**, **TF-IDF**, **sentence-transformers**, and **PCA** to map user profiles to relevant careers using the **O*NET** occupation database.

---

## 🎬 Demo Showcase

### 🏠 Landing Page  
![Landing Demo](assets/demo1.gif)

### 🧠 Without Questions Mode  
![Workflow 1 Demo](assets/demo2.gif)

### 💬 With Questions Mode  
![Workflow 2 Demo](assets/demo3.gif)

---

## 🧰 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Vite  
- **Backend:** Node.js, Express.js, MongoDB  
- **ML/NLP:** Python, Flask, Sentence Transformers, TF-IDF, PCA  

---

## 🚀 How to Run Locally

### 1. Clone the Repository
> **Prerequisite:** Git  
```bash
git clone https://github.com/aursalan/AI-Based-Career-Counselling.git
cd AI-Based-Career-Counselling
``` 

### 2. Setup & Run MongoDB
> **Prerequisite:** MongoDB Community Edition  
```bash
cd database
mongod --dbpath "paste copied path"
```

Then open **MongoDB Compass GUI** and import the `.csv` files according to the database structure:

![Database Structure](assets/database%20structure.png)

### 3. Start the Backend Server
> **Prerequisite:** Node.js  
```bash
cd backend
node server.js
```

### 4. Start the ML Flask Server
> **Prerequisite:** Python 3.11  
```bash
cd ml
python -m venv .venv
# Activate virtual environment (Windows)
.venv\Scripts\activate
# or (Linux/Mac)
source .venv/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm
python -m nltk.downloader wordnet

python CBF_Recommendation.py
python CBF_using_AI.py
```

### 5. Start the Frontend
> **Prerequisite:** Node.js, Vite, TailwindCSS  
```bash
cd frontend
npm install
npm run dev
```

Open your browser and visit:  
👉 [http://localhost:5173](http://localhost:5173)

---

## 💡 Features

- Dual-mode recommendation system (questionnaire & free-text)
- Personality & interest-based profiling (OCEAN + RIASEC)
- NLP-powered matching engine
- MongoDB-based persistent storage
- Modular backend & scalable architecture

---

## 🔮 Future Improvements

- 📄 Resume upload and parsing
- 📊 Real-time job market trends (LinkedIn, Glassdoor)
- 🧠 Facial emotion + mouse tracking integration
- ☁️ Docker-based or cloud deployment (Render, Railway, Heroku)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Created by **Aursalan Sayed**  
🔗 [LinkedIn](https://linkedin.com/in/aursalan)
