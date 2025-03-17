import jwt from "jsonwebtoken";

export const cookieJwtAuth = (req, res, next) => {
  console.log("Checking authentication...");

  // Ensure cookies exist
  if (!req.cookies || !req.cookies.accesToken) {
    console.log("No token provided!");
    return res
      .status(401)
      .json({ errorToken: "Access Denied. No Token Provided!" });
  }

  const token = req.cookies.accesToken;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified successfully:", user);

    req.user = user;
    next();
  } catch (error) {
    console.log("Invalid or expired token:", error.message);

    res.clearCookie("accesToken");
    return res.status(401).json({ errorToken: "Session Expired" });
  }
};
