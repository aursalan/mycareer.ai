require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(cors({
  origin: "http://localhost:5173", // React frontend URL
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));

// MongoDB Connection
const MONGO_URI = "mongodb://127.0.0.1:27017/Major_Project"; // Your database name

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Define Schema & Models for OCEAN and RIASEC Questionnaires
const questionSchema = new mongoose.Schema({
  Question: String,
  Trait: String,
  "Reverse Scored": String,
});

const OceanQuestion = mongoose.model("OCEAN_Questionnaire", questionSchema, "OCEAN_Questionnaire");
const RiasecQuestion = mongoose.model("RIASEC_Questionnaire", questionSchema, "RIASEC_Questionnaire");

const responseSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true }, // Ensure userId is stored
  Openness: Number,
  Conscientiousness: Number,
  Extraversion: Number,
  Agreeableness: Number,
  Neuroticism: Number,
  Realistic: Number,
  Investigative: Number,
  Artistic: Number,
  Social: Number,
  Enterprising: Number,
  Conventional: Number,
  educationCategory: String,
  text: String,
});

const Response = mongoose.model("User_Responses", responseSchema, "User_Responses");

const recommendationSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  recommendations: Array, // Store recommendations as an array of objects
});

const Recommendation = mongoose.model("User_Recommendations", recommendationSchema, "User_Recommendations");

// API Route to Create a New User
app.post("/api/createUser", async (req, res) => {
  try {
    console.log("🟡 Received request to create user");

    const newUser = new Response({ userId: new mongoose.Types.ObjectId().toString() }); // Generate and store userId
    await newUser.save();

    console.log("✅ New user created:", newUser);
    res.json({ userId: newUser.userId });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

// API Route to Fetch OCEAN Questions
app.get("/api/ocean-questions", async (req, res) => {
  try {
    const questions = await OceanQuestion.find();
    res.json(questions);
  } catch (error) {
    console.error("❌ Error fetching OCEAN questions:", error);
    res.status(500).json({ error: "Error fetching OCEAN questions from database" });
  }
});

// API Route to Fetch RIASEC Questions
app.get("/api/riasec-questions", async (req, res) => {
  try {
    const questions = await RiasecQuestion.find();
    res.json(questions);
  } catch (error) {
    console.error("❌ Error fetching RIASEC questions:", error);
    res.status(500).json({ error: "Error fetching RIASEC questions from database" });
  }
});

// API Route to Store User Responses
app.post("/api/storeResponses", async (req, res) => {
  try {
    const { userId, educationCategory, ...responseData } = req.body;

    if (!userId) {
      console.error("❌ Error: Missing userId in request.");
      return res.status(400).json({ error: "❌ User ID is required" });
    }

    // ✅ Allow partial updates (OCEAN first, RIASEC later)
    const updateFields = {};
    if (educationCategory) updateFields.educationCategory = educationCategory;

    Object.keys(responseData).forEach((key) => {
      updateFields[key] = responseData[key];
    });

    // ✅ Update or Insert Partial User Response in MongoDB
    const updatedUser = await Response.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { upsert: true, new: true }
    );

    console.log("✅ Partial User responses saved in MongoDB!");

    // ✅ Check if all required responses exist before triggering Python
    const requiredFields = [
      "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism",
      "Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional",
      "educationCategory"
    ];

    const allFieldsPresent = requiredFields.every(field => updatedUser[field] !== undefined);
    
    if (allFieldsPresent) {
      console.log("🚀 All responses received. Triggering Python Script...");
      const pythonResponse = await axios.post("http://127.0.0.1:5001/compute-recommendations", { userId });

      return res.json({ message: "✅ Responses saved & recommendations computed!", recommendations: pythonResponse.data });
    }

    res.json({ message: "✅ Responses saved successfully! Waiting for all data." });

  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ error: "Error saving data" });
  }
});


// Save User Input and Trigger Flask Analysis
app.post("/api/saveUserResponse", async (req, res) => {
  try {
    const { userId, text } = req.body;
    if (!userId || !text) {
      return res.status(400).json({ error: "User ID and text are required" });
    }

    await Response.findOneAndUpdate(
      { userId },
      { userId, text },
      { upsert: true, new: true }
    );

    console.log("✅ User response saved in MongoDB");
    
    // Trigger Python Flask analysis
    await axios.post("http://127.0.0.1:5002/analyze-response", { userId });
    res.json({ message: "User response saved. Processing recommendations..." });
  } catch (error) {
    console.error("❌ Error saving user response:", error);
    res.status(500).json({ error: "Error saving response" });
  }
});

// Fetch User Recommendations
app.get("/api/getRecommendations/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const recommendations = await Recommendation.findOne({ userId });

    if (recommendations) {
      res.json({ recommendations: recommendations.recommendations });
    } else {
      res.status(404).json({ error: "Recommendations not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

// Debugging route to check if server is running
app.get("/", (req, res) => {
  res.send("✅ API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
