
# Mycareer.ai 

> This project is an intelligent, two-mode career guidance platform that uses AI and Machine Learning to recommend ideal occupations.

- It provides personalized career recommendations based on users' personality traits (OCEAN), interests (RIASEC), and educational background.

- The system features two distinct modes: a questionnaire-based mode for structured input and a free-text mode that leverages Natural Language Processing (NLP) for analysis.

- It employs advanced techniques like cosine similarity, TF-IDF, sentence-transformers, and PCA to map user profiles against the comprehensive O*NET occupation database.

- The platform is built with a modern, scalable architecture, featuring a modular backend and persistent storage with MongoDB.


## Demo

Insert gif or link to demo


## Table of Contents

* [Tech Stack and Prerequisites](#1-project-description)
* [How to Install and Run the Project](#3-how-to-install-and-run-the-project)
* [How to Use the Project](#4-how-to-use-the-project)
* [Future Improvements](#4-how-to-use-the-project)
* [Acknowledgements](#5-include-credits)
* [License](#6-add-a-license)
## Tech Stack and Prerequisites

**Frontend:** React.js, Tailwind CSS, Vite

**Backend:** Node.js, Express.js, MongoDB, Python, Flask.

**Prerequisites:** Git, MongoDB Community Edition, Node.js, Python 3.11



## How Install and Run the Project

1. Clone the Repository:
```
git clone https://github.com/aursalan/mycareer.ai.git
cd mycareer.ai
```

2. Setup and Run MongoDB:
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

3. Start the Backend Server:
```
cd backend
node server.js
```

4. Start the ML Flask Server
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

## How to Use the Project

Once the application is running, open your browser and navigate to http://localhost:5173.

You will be presented with two modes:

> With Questions Mode
- Select this option to follow a guided questionnaire.
- Answer the series of questions based on the OCEAN (Big Five) personality and RIASEC (Holland Code) interest models.
- Select your education level.
- The system will analyze your responses and generate personalized career recommendations.

> Without Questions Mode
- Select this option for a faster, text-based analysis.
- Enter a free-text description of your skills, educational background, work experience, and interests.
- The system will use NLP to process your input and suggest relevant career paths.
##  Future Improvements

📄 **Resume Parsing**: Allow users to upload their resumes for automatic data extraction.

📊 **Real-time Job Market Data**: Integrate with APIs from LinkedIn or Glassdoor to show current job trends.

🧠 **Advanced User Interaction**: Incorporate facial emotion recognition and mouse tracking for deeper behavioral insights.

☁️ **Cloud Deployment**: Dockerize the application for easy deployment on platforms like Render, Railway, or Heroku.
## Acknowledgements

 - [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [Awesome README](https://github.com/matiassingers/awesome-readme)
 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

## License
This project is licensed under the [MIT](LICENSE) License.
