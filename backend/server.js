require("dotenv").config();

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

const app = express();
const PORT = 5000;

// --------------------------------------------------
// MIDDLEWARE
// --------------------------------------------------

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// ENVIRONMENT CHECK
// --------------------------------------------------

if (!process.env.MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is missing from .env file.");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET is missing from .env file.");
  process.exit(1);
}

if (!process.env.GROQ_API_KEY) {
  console.error("ERROR: GROQ_API_KEY is missing from .env file.");
  process.exit(1);
}

// --------------------------------------------------
// MONGODB CONNECTION
// --------------------------------------------------

const client = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000
});

// --------------------------------------------------
// CONNECT DATABASE
// --------------------------------------------------

async function connectDB() {
  try {
    await client.connect();

    console.log("MongoDB connected successfully!");

    const db = client.db("interviewai");

    const questionsCollection = db.collection("questions");
    const usersCollection = db.collection("users");
    const interviewsCollection = db.collection("interviews");

    // --------------------------------------------------
    // AUTHENTICATION MIDDLEWARE
    // --------------------------------------------------

    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authentication required."
        });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "Invalid or expired token."
          });
        }

        req.userId = user.userId;
        next();
      });
    };

    // --------------------------------------------------
    // HOME ROUTE
    // --------------------------------------------------

    app.get("/", (req, res) => {
      res.send("InterviewAI Backend is running!");
    });

    // --------------------------------------------------
    // SIGN UP
    // --------------------------------------------------

    app.post("/api/auth/signup", async (req, res) => {
      try {
        const { name, email, password } = req.body;

        // Validate fields
        if (!name || !email || !password) {
          return res.status(400).json({
            message: "Please fill in all fields."
          });
        }

        const cleanName = name.trim();
        const cleanEmail = email.toLowerCase().trim();

        if (!cleanName || !cleanEmail) {
          return res.status(400).json({
            message: "Please enter valid details."
          });
        }

        // Check if email already exists
        const existingUser = await usersCollection.findOne({
          email: cleanEmail
        });

        if (existingUser) {
          return res.status(409).json({
            message: "Email already registered."
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
          name: cleanName,
          email: cleanEmail,
          password: hashedPassword,
          createdAt: new Date()
        };

        // Save user to MongoDB
        await usersCollection.insertOne(newUser);

        // --------------------------------------------------
        // CREATE JWT TOKEN
        // --------------------------------------------------

        const token = jwt.sign(
          {
            userId: newUser._id.toString(),
            email: newUser.email
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

        // --------------------------------------------------
        // SEND SUCCESS RESPONSE
        // --------------------------------------------------

        res.status(201).json({
          success: true,
          message: "Account created successfully.",
          token,
          user: {
            id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email
          }
        });
      } catch (error) {
        console.error("Signup error:", error);

        res.status(500).json({
          message: "Unable to create account."
        });
      }
    });

    // --------------------------------------------------
    // SIGN IN
    // --------------------------------------------------

    app.post("/api/auth/signin", async (req, res) => {
      try {
        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
          return res.status(400).json({
            message: "Please enter email and password."
          });
        }

        const cleanEmail = email.toLowerCase().trim();

        // Find user
        const user = await usersCollection.findOne({
          email: cleanEmail
        });

        if (!user) {
          return res.status(401).json({
            message: "Invalid email or password."
          });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) {
          return res.status(401).json({
            message: "Invalid email or password."
          });
        }

        // Create JWT
        const token = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.email
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d"
          }
        );

        // Send response
        res.json({
          success: true,
          message: "Login successful.",
          token,
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email
          }
        });
      } catch (error) {
        console.error("Signin error:", error);

        res.status(500).json({
          message: "Unable to sign in."
        });
      }
    });

    // --------------------------------------------------
    // GET QUESTIONS
    // --------------------------------------------------

    app.get("/api/questions", async (req, res) => {
      try {
        const questions = await questionsCollection
          .find({})
          .project({
            correctAnswer: 0
          })
          .toArray();

        res.json(questions);
      } catch (error) {
        console.error("Error fetching questions:", error);

        res.status(500).json({
          message: "Failed to fetch questions."
        });
      }
    });

    // --------------------------------------------------
    // GET QUESTION BANK WITH ANSWERS
    // --------------------------------------------------

    app.get(
      "/api/question-bank",
      authenticateToken,
      async (req, res) => {
        try {
          const questions = await questionsCollection
            .find({})
            .sort({
              category: 1,
              subcategory: 1
            })
            .toArray();

          res.json({
            success: true,
            questions
          });
        } catch (error) {
          console.error(
            "Error fetching question bank:",
            error
          );

          res.status(500).json({
            success: false,
            message: "Failed to fetch question bank."
          });
        }
      }
    );

    // --------------------------------------------------
    // SUBMIT INTERVIEW
    // --------------------------------------------------

    app.post(
      "/api/interview/submit",
      authenticateToken,
      async (req, res) => {
        try {
          const {
            category,
            subcategory,
            mode,
            difficulty,
            totalQuestions,
            answers,
            timeTaken
          } = req.body;

          // --------------------------------------------------
          // VALIDATE ANSWERS
          // --------------------------------------------------

          if (!Array.isArray(answers)) {
            return res.status(400).json({
              message: "Invalid answers data."
            });
          }

          if (answers.length === 0) {
            return res.status(400).json({
              message: "No answers submitted."
            });
          }

          // --------------------------------------------------
          // CONVERT QUESTION IDS TO OBJECT IDS
          // --------------------------------------------------

          const questionIds = answers
            .map((answer) => {
              try {
                return new ObjectId(answer.questionId);
              } catch (error) {
                return null;
              }
            })
            .filter(Boolean);

          if (questionIds.length === 0) {
            return res.status(400).json({
              message: "No valid question IDs found."
            });
          }

          // --------------------------------------------------
          // GET QUESTIONS + CORRECT ANSWERS
          // --------------------------------------------------

          const questions = await questionsCollection
            .find({
              _id: {
                $in: questionIds
              }
            })
            .project({
              question: 1,
              options: 1,
              correctAnswer: 1
            })
            .toArray();

          if (questions.length === 0) {
            return res.status(404).json({
              message: "Questions not found in database."
            });
          }

          // --------------------------------------------------
          // CREATE QUESTION LOOKUP MAP
          // --------------------------------------------------

          const questionMap = {};

          questions.forEach((question) => {
            questionMap[question._id.toString()] = question;
          });

          // --------------------------------------------------
          // CALCULATE SCORE + CREATE REVIEW
          // --------------------------------------------------

          let score = 0;

          const review = answers.map((answer) => {
            const question = questionMap[answer.questionId];

            // Question not found
            if (!question) {
              return {
                questionId: answer.questionId,
                question: "Question not found",
                options: [],
                selectedAnswer:
                  answer.selectedAnswer || null,
                correctAnswer: null,
                isCorrect: false
              };
            }

            const selectedAnswer =
              answer.selectedAnswer || null;

            const correctAnswer =
              question.correctAnswer;

            const isCorrect =
              selectedAnswer !== null &&
              selectedAnswer === correctAnswer;

            if (isCorrect) {
              score++;
            }

            return {
              questionId: answer.questionId,
              question: question.question,
              options: question.options || [],
              selectedAnswer,
              correctAnswer,
              isCorrect
            };
          });

          // --------------------------------------------------
          // RESULT CALCULATION
          // --------------------------------------------------

          const total = answers.length;

          const percentage =
            total > 0
              ? Math.round((score / total) * 100)
              : 0;

          const correct = score;

          const incorrect = total - score;

          // --------------------------------------------------
          // SAVE INTERVIEW ACTIVITY
          // --------------------------------------------------

          await interviewsCollection.insertOne({
            userId: req.userId,

            category: category || "",

            subcategory: subcategory || "",

            mode: mode || "",

            difficulty: difficulty || "",

            totalQuestions:
              totalQuestions || total,

            score,

            percentage,

            timeTaken: timeTaken || 0,

            createdAt: new Date()
          });

          // --------------------------------------------------
          // SEND RESULT TO FRONTEND
          // --------------------------------------------------

          res.json({
            success: true,

            score,

            totalQuestions:
              totalQuestions || total,

            percentage,

            correct,

            incorrect,

            category: category || "",

            subcategory: subcategory || "",

            mode: mode || "",

            difficulty: difficulty || "",

            timeTaken: timeTaken || 0,

            review
          });
        } catch (error) {
          console.error(
            "Error submitting interview:",
            error
          );

          res.status(500).json({
            message:
              "Failed to calculate interview result."
          });
        }
      }
    );

    // --------------------------------------------------
// AI INTERVIEW FEEDBACK
// --------------------------------------------------

app.post(
  "/api/interview/feedback",
  authenticateToken,
  async (req, res) => {
    try {
      const {
        category,
        subcategory,
        mode,
        difficulty,
        score,
        percentage,
        totalQuestions,
        review
      } = req.body;

      const questionCount =
        Number(totalQuestions) ||
        (Array.isArray(review) ? review.length : 0);

          // --------------------------------------------------
          // VALIDATE FEEDBACK DATA
          // --------------------------------------------------

          if (!Array.isArray(review) || review.length === 0) {
            return res.status(400).json({
              success: false,
              message: "Interview review data is required."
            });
          }

          // --------------------------------------------------
          // PREPARE PERFORMANCE DATA
          // --------------------------------------------------

          const performance = review.map(
            (item, index) => ({
              questionNumber: index + 1,
              question: item.question,
              selectedAnswer:
                item.selectedAnswer || "Not answered",
              correctAnswer:
                item.correctAnswer || "Not available",
              isCorrect: item.isCorrect
            })
          );

          // --------------------------------------------------
          // GENERATE AI FEEDBACK
          // --------------------------------------------------

          const response = await openai.responses.create({
            model: "openai/gpt-oss-120b",

            instructions: `
You are an interview performance feedback assistant for InterviewAI.

Analyze the candidate's interview result and answers.

Give concise, practical feedback based only on the provided performance.

Use exactly these 3 sections:

Overall:
Strengths: 
Improve: 

Rules:
- Keep the entire response under 100 words.
- Each section should contain 1–2 short sentences.
- Do not use Markdown.
- Do not use **, *, #, -, bullet points, numbered lists, or emojis.
- Do not repeat the score unnecessarily.
- Do not say "half" when describing percentages. Use the exact score and percentage provided.
- Focus on the most important strengths and weaknesses.
- Keep the tone professional, encouraging, and simple.
- Do not give a long study plan or multiple next steps.
- Do not add any section other than Overall, Strengths, and Improve.
`,

            input: `
Category: ${category}
Topic: ${subcategory}
Mode: ${mode}
Difficulty: ${difficulty}
Score: ${score}/${questionCount}
Percentage: ${percentage}%

Question Review:
${JSON.stringify(review)}
`
          });

          const feedback = response.output_text;

          if (!feedback) {
            return res.status(500).json({
              success: false,
              message: "AI feedback could not be generated."
            });
          }

          // --------------------------------------------------
          // SEND AI FEEDBACK
          // --------------------------------------------------

          res.json({
            success: true,
            feedback
          });
        } catch (error) {
          console.error(
            "AI feedback error:",
            error
          );

          res.status(500).json({
            success: false,
            message:
              "Unable to generate AI feedback right now."
          });
        }
      }
    );

    // --------------------------------------------------
    // GET INTERVIEW HISTORY
    // --------------------------------------------------

    app.get(
      "/api/interviews",
      authenticateToken,
      async (req, res) => {
        try {
          const interviews = await interviewsCollection
            .find({
              userId: req.userId
            })
            .sort({
              createdAt: -1
            })
            .limit(10)
            .toArray();

          res.json({
            success: true,
            interviews
          });
        } catch (error) {
          console.error(
            "Error fetching interviews:",
            error
          );

          res.status(500).json({
            success: false,
            message:
              "Failed to fetch interview history."
          });
        }
      }
    );

    // --------------------------------------------------
    // START SERVER
    // --------------------------------------------------

    app.listen(
      process.env.PORT || PORT,
      "0.0.0.0",
      () => {
        console.log(
          `Server running on http://localhost:${process.env.PORT || PORT
          }`
        );
      }
    );
  } catch (error) {
    console.error("\nMongoDB connection failed.");
    console.error("Error:", error.message);

    console.error(
      "\nCheck the following:"
    );

    console.error(
      "1. MongoDB Atlas cluster is running."
    );

    console.error(
      "2. Your current IP address is allowed in Atlas Network Access."
    );

    console.error(
      "3. MONGODB_URI in .env is correct."
    );

    console.error(
      "4. Your MongoDB username/password are correct."
    );

    console.error(
      "5. The network is allowing MongoDB traffic on port 27017."
    );

    process.exit(1);
  }
}

// --------------------------------------------------
// RUN APPLICATION
// --------------------------------------------------

connectDB();

// --------------------------------------------------
// HANDLE SHUTDOWN
// --------------------------------------------------

process.on("SIGINT", async () => {
  console.log("\nClosing MongoDB connection...");

  await client.close();

  console.log("MongoDB connection closed.");

  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nClosing MongoDB connection...");

  await client.close();

  console.log("MongoDB connection closed.");

  process.exit(0);
});