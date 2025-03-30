import jwt from "jsonwebtoken";

export const cookieJwtAuth = (req, res, next) => {
  // console.log("Checking authentication...");
  // console.log("Cookies received:", req.cookies);

  const token = req.cookies.accesToken;

  if (!token) {
    // console.log(" No token provided!");
    return res.status(401).json({ error: "Access Denied. No Token Provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Token is valid:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(" Invalid token:", error.message);
    res.clearCookie("accesToken");
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
