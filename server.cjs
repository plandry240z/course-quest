const express = require("express");
const cors = require("cors");
const { db, admin } = require("./firebase-admin.cjs");


// Creating the app
const app = express();


app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// ← verifyToken goes here, after setup but before routes
async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });


  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.userID = decoded.uid;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}


app.post("/profile", verifyToken, async (req, res) => {
  try {
    const {name, major, year, school} = req.body;
    const userID = req.userID;
    await db.collection("profile").doc(userID).set({name, major, year, school});
    res.status(201).json({success:true});
  }
  catch (error) {
    res.status(500).json({error:error.message});
  }
});


app.get("/profile/:userID", verifyToken, async (req, res) => {
  try {
    const doc = await db.collection("profile").doc(req.params.userID).get();
    if (!doc.exists) return res.status(404).json({ error: "Profile not found" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Starting the server


app.listen(8080, () => console.log("Server running on port 8080"));





