import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
  audience: "https://bonneidee.com",
  issuerBaseURL: `https://dev-6d4nvtyb1jh57rl2.us.auth0.com/`,
});

export default { jwtCheck };
