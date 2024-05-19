import { auth } from "express-oauth2-jwt-bearer";
import appConfig from "../appConfig.js";
import formatUtils from "./utils/formatUtils.js";

const checkToken = auth({
  audience: appConfig.audience,
  issuerBaseURL: appConfig.issuerBaseURL,
});

const validateBodyFields = (fields) => {
  return (req, res, next) => {
    if (!fields) {
      return res
        .status(400)
        .json({ code: 400, message: "Missing required fields" });
    }

    const missingFields = fields.filter((field) => {
      return !req.body[field];
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        code: 400,
        message: "Missing required fields",
        fields: missingFields,
      });
    }

    return next();
  };
};

const formatFields = (fields) => {
  return (req, res, next) => {
    fields.forEach(([field, format]) => {
      if (req.body[field]) {
        switch (format) {
          case "lowercase":
            const lower = req.body[field].toLowerCase();
            if (typeof lower === "string") {
              req.body[field] = lower;
            }
            break;
          case "uppercase":
            const upper = req.body[field].toUpperCase();
            if (typeof upper === "string") {
              req.body[field] = upper;
            }
            break;
          case "number":
            const num = parseInt(req.body[field]);
            if (!isNaN(num)) {
              req.body[field] = num;
            }
            break;
          default:
            console.log("default ");
            break;
        }
      }
    });

    return next();
  };
};

const validateParamsField = () => {
  return (req, res, next, param) => {
    const isValid = formatUtils.isAMongoId(param);

    if (!isValid) {
      return res.status(400).json({
        code: 400,
        message: "Invalid ID: " + param,
      });
    }

    return next();
  };
};

const validateBodyIdsFields = (fields) => {
  return (req, res, next) => {
    const errorFields = fields.filter((field) => {
      return !formatUtils.isAMongoId(req.body[field]);
    });

    if (errorFields.length > 0) {
      return res.status(400).json({
        code: 400,
        message: "Invalid ID",
        fields: errorFields,
      });
    }

    return next();
  };
};

const canAdminWrite = (req, res, next) => {
  const permissions = req.auth?.payload?.permissions;

  if (!permissions) {
    return res.status(403).json({ error: "User Unauthorized" });
  }

  if (permissions.includes("write:all")) {
    return next();
  }

  return res.status(403).json({
    error: "Unauthorized",
    message: "You do not have the required permissions",
  });
};

const canAdminDelete = (req, res, next) => {
  const permissions = req.auth?.payload?.permissions;

  if (!permissions) {
    return res.status(403).json({ error: "User Unauthorized" });
  }

  if (permissions.includes("delete:all")) {
    return next();
  }

  return res.status(403).json({
    error: "Unauthorized",
    message: "You do not have the required permissions",
  });
};

const insertAuthPayload = (req, res, next) => {
  if (req.auth) {
    req.user = req.auth.payload;
    req.user.id = req.auth.payload.sub;
  }

  return next();
};

export default {
  checkToken,
  canAdminWrite,
  canAdminDelete,
  validateBodyFields,
  validateBodyIdsFields,
  validateParamsField,
  formatFields,
  insertAuthPayload,
};
