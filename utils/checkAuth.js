import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.id;

      next();
    } catch (e) {
      res.status(403).json({
        message: "Access denied",
      });
    }
  } else {
    res.status(403).json({
      message: "Access denied",
    });
  }
};
