import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/api/login/password", async (req, res, next) => {
    console.log(req.body);
    const userEmail = req.body.email;
    let userinfo;
    try {
        if (userEmail) {
            userinfo = await myDB.getUserByEmail(userEmail);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) return res.status(400).json({ ok: false, msg: "Login failed" });

            req.logIn(user, function(err) {
                if (err) throw err;
                console.log("in api", user);
                return res.status(200).json({id:userinfo._id,email:userinfo.email, username:userinfo.username});
            });
        })(req, res, next);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
router.post("/api/logout", async (req, res) => {
    try {
        req.logout(function (err) {
            if (err) throw err;
            res.status(200).json({ email: null, msg: "Logged out", ok: true });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/api/getUser", async (req, res) => {
    try {
        if (req.isAuthenticated() && req.user) {
            const userId = await myDB.getUserByEmail(req.user.email);
            res.status(200).json({id:userId._id,email:req.user.email, username:userId.username});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/api/deals/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const userDeals = await myDB.getDealsByUserId(userId);
  
        if (!userDeals) {
            return res.status(404).json({ msg: "No deals found for this user." });
        }
  
        res.status(200).json(userDeals);
    } catch (error) {
        console.error("Error fetching user's deals:", error);
        res.status(500).json({ error: error.message });
    }
  });
  
  
router.post("/api/signup", async (req, res) => {
    try {
        const user = await myDB.getUserByEmail(req.body.email);
        if (user) {
            return res.status(400).json({ ok: false, msg: "Email already exists" });
        }

        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", async (err, hashedPassword) => {
            if (err) throw err;

            await myDB.insertUser({
                username: req.body.username,
                email: req.body.email,
                hashedPassword: hashedPassword.toString("hex"),
                salt: salt.toString("hex"),
            });

            res.status(200).json({ ok: true, msg: "Signed up" });
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;