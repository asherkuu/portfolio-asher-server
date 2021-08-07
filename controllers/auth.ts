import { NextFunction, Request, Response } from "express";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

// Authentication middleware
// This middleware will check access token
// in authorization headers of a request
// Also it will verify access token against
// Auth0 JSON web key set
export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-xb22956w.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://dev-xb22956w.us.auth0.com/api/v2/",
  issur: "https://dev-xb22956w.us.auth0.com/",
  algorithms: ["RS256"],
});

export const checkRole =
  (role) => (req: any, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && user[process.env.AUTH0_NAMESPACE + "/roles"].includes(role))
      next();
    else
      return res
        .status(401)
        .send("You are not authorized to access this resoucres !");
  };
