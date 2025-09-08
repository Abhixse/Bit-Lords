import jwt from "jsonwebtoken";
import User from "../models/User.models.js"
import cookieParser from "cookie-parser";


export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      fullName: { firstName, lastName },
      email,
      password,
      role,
    });

    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        user: {
          id: user._id,
          name: `${user.fullName.firstName} ${user.fullName.lastName}`,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // normalize email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // send response
    res.json({
      user: {
        id: user._id,
        name: `${user.fullName.firstName} ${user.fullName.lastName}`.trim(),
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    // ✅ Get refresh token from cookie
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Find user with this refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired refresh token" });
      }

      // Generate new access token
      const accessToken = user.generateAccessToken();

      return res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const logout = async (req, res) => {
  try {
    const { userId } = req.user; // Extracted from authMiddleware

    // Invalidate the refresh token
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PROTECTED PROFILE (example)
export const profile = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};