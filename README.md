
# Mycareer.ai 

> An intelligent, two-mode career guidance platform that uses AI and Machine Learning to recommend ideal occupations.

- It provides personalised career recommendations based on users' personality traits (OCEAN), interests (RIASEC), and educational background.
- The system features two distinct modes: a questionnaire-based mode for structured input and a free-text mode that leverages Natural Language Processing (NLP) for analysis.
- It employs advanced techniques like cosine similarity, TF-IDF, sentence-transformers, and PCA to map user profiles against the comprehensive O*NET occupation database.
- The platform is built with a modern, scalable architecture, featuring a modular backend and persistent storage with MongoDB.

## Demo

![](/assets/demo.gif)

## Table of Contents

1. [Tech Stack and Prerequisites](#1-tech-stack-and-prerequisites)
2. [How to Install and Run the Project](#2-how-to-install-and-run-the-project)
3. [How to Use the Project](#3-how-to-use-the-project)
4. [Future Improvements](#4-future-improvements)
5. [Acknowledgements](#5-acknowledgements)
6. [License](#6-license)

## 1. Tech Stack and Prerequisites

**Frontend:** React.js, Tailwind CSS, Vite\
**Backend:** Node.js, Express.js, MongoDB, Python, Flask.\
**Prerequisites:** Git, MongoDB Community Edition, Node.js, Python 3.11

## 2. How to Install and Run the Project

**1. Clone the Repository:**
```
git clone https://github.com/aursalan/mycareer.ai.git
cd mycareer.ai
```

**2. Setup and Run MongoDB:**
```
cd database
mongod --dbpath "your_database_directory_path"
```
- Open MongoDB Compass and import the provided .csv files into their respective collections as shown in the database structure.
```
Major_Project (Database)
├── CBF (Collection)
├── CBF_using_AI (Collection)
├── OCEAN_Questionnaire (Collection)
├── RAISEC_Questionnaire (Collection)
├── User_Recommendations (Collection)
└── User_Responses (Collection)

```

**3. Start the Backend Server:**
```
cd backend
node server.js
```

**4. Start the ML Flask Server:**
- Set up and activate a Python virtual environment:
```
cd ml
python -m venv .venv
# On Windows
.venv\Scripts\activate
# On Linux/Mac
source .venv/bin/activate
```

- Install the required packages and download NLP models:
```
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python -m nltk.downloader wordnet
```

- Run the recommendation scripts:
```
python CBF_Recommendation.py
python CBF_using_AI.py
```

- Start the Frontend:
```
cd frontend
npm install
npm run dev
```

You can now access the application at http://localhost:5173.

## 3. How to Use the Project

Once the application is running, open your browser and navigate to http://localhost:5173.

You will be presented with two modes:

- With Questions Mode
    - Select this option to follow a guided questionnaire.
    - Answer the series of questions based on the OCEAN (Big Five)  personality and RIASEC (Holland Code) interest models.
    - Select your education level.
    - The system will analyze your responses and generate personalized career recommendations.

- Without Questions Mode
    - Select this option for a faster, text-based analysis.
    - Enter a free-text description of your skills, educational  background, work experience, and interests.
    - The system will use NLP to process your input and suggest relevant career paths.

##  4. Future Improvements

- **Resume Parsing**: Allow users to upload their resumes for automatic data extraction.
-  **Real-time Job Market Data**: Integrate with APIs from LinkedIn or Glassdoor to show current job trends.
- **Advanced User Interaction**: Incorporate facial emotion recognition and mouse tracking for deeper behavioral insights.
- **Cloud Deployment**: Dockerize the application for easy deployment on platforms like Render, Railway, or Heroku.


## 5. Acknowledgements

 - [O*NET Database](https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.onetcenter.org/database.html&ved=2ahUKEwjqkPDf8sOPAxU_xjgGHVJJAVkQFnoECBsQAQ&usg=AOvVaw1eY0-Pbasvzk_KaZWy7XF4)
 - [MongoDB Documentation](https://www.mongodb.com/docs/)
 - [Big Five Personality Traits (OCEAN)](https://en.wikipedia.org/wiki/Big_Five_personality_traits)
 - [Holland Codes (RIASEC)](https://en.wikipedia.org/wiki/Holland_Codes)

## 6. License
This project is licensed under the [MIT](LICENSE) License.
