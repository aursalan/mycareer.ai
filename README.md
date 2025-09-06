# Mycareer.ai 

This project provides an **AI-powered career guidance platform** that recommends ideal occupations based on users' personality traits, interests, and educational background. The system leverages state-of-the-art machine learning and natural language processing techniques to match users with relevant careers.

<p align="center">
  <img src="assets/demo1.gif" alt="Project Demo" width="600"/>
</p>

The analysis and recommendation workflow includes:
- Collecting and parsing user input, either through structured questionnaires (OCEAN, RIASEC) or free-text descriptions of skills, education, and experience.
- Processing and cleaning user profiles to prepare them for analysis.
- Applying machine learning models and NLP techniques (cosine similarity, TF-IDF, sentence-transformers, PCA) to map users to occupations from the O*NET database.
- Presenting career recommendations and interactive feedback through a modern web interface.

The goal of this platform is to demonstrate how accessible AI tools and web technologies can be combined to deliver personalized career exploration experiences.

## Table of Contents

- [How to Install and Run the Project](#how-to-install-and-run-the-project)
- [How to Use the Project](#how-to-use-the-project)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## How to Install and Run the Project

This project is designed to run locally and consists of several components.  
**Please follow these steps for a successful setup:**

### 1. Clone the Repository
  ```bash
  git clone https://github.com/aursalan/mycareer.ai.git
  cd mycareer.ai
  ```

### 2. Setup & Run MongoDB
- **Install MongoDB Community Edition** if you haven't.
- Start the MongoDB server:
  ```bash
  mongod --dbpath "your/database/path"
  ```
- Open **MongoDB Compass GUI** and import the `.csv` files into the appropriate collections as per the database structure:
  ![Database Structure](assets/database%20structure.png)

### 3. Start the Backend Server
- **Requirement:** Node.js
- From the project root:
  ```bash
  cd backend
  node server.js
  ```

### 4. Start the ML Flask Server
- **Requirement:** Python 3.11
- From the project root:
  ```bash
  cd ml
  python -m venv .venv
  # Activate virtual environment (Windows)
  .venv\Scripts\activate
  # Or (Linux/Mac)
  source .venv/bin/activate

  pip install -r requirements.txt
  python -m spacy download en_core_web_sm
  python -m nltk.downloader wordnet

  # Start the recommendation modules
  python CBF_Recommendation.py
  python CBF_using_AI.py
  ```

### 5. Start the Frontend
- **Requirement:** Node.js, Vite, TailwindCSS
- From the project root:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Open your browser and visit [http://localhost:5173](http://localhost:5173)

---

## How to Use the Project

Once you run the application, you can:

- Receive career recommendations based on personality/interest questionnaires or free-text profile input.
- Explore interactive demo workflows and visualizations.
- Review average matching scores and recommended career paths.

## Acknowledgements

 - [O*NET Database](https://www.onetcenter.org/database.html)
 - [NumPy Documentation](https://numpy.org/doc/)
 - [Matplotlib Documentation](https://matplotlib.org/stable/index.html)
 - [React Documentation](https://react.dev/)
 - [MongoDB Documentation](https://www.mongodb.com/docs/)

## License
This project is licensed under the [MIT](LICENSE) License.
