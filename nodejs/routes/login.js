import express from "express";
import User from "../db/users.js";

const router = express.Router();

// Create Account
router.post("/", async (req, res) => {
    try {
        const user = await new User({
            username: req.body.username,
            password: req.body.password,
        });
        user.save();
    } catch (err) {
        console.log("NOOOOO")
    }
});

export default router;