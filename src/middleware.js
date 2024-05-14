import { auth } from "express-oauth2-jwt-bearer";
import appConfig from "../appConfig.js";

const jwtCheck = auth({
  audience: appConfig.audience,
  issuerBaseURL: appConfig.issuerBaseURL,
});

export default { jwtCheck };
