import { auth } from "express-oauth2-jwt-bearer";
import formatUtils from "./utils/formatUtils.js";

const checkToken = auth({
  audience: process.env.audience,
  issuerBaseURL: process.env.issuerBaseURL,
});

const validateBodyArrayFields = (fields) => {
  return (req, res, next) => {
    if (!fields) {
      return res.status(400).json({ code: 400, message: "Missing fields" });
    }

    const missingFields = fields.filter((field) => {
      return (
        !req.body[field] ||
        !Array.isArray(req.body[field]) ||
        req.body[field].length === 0
      );
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

const validateBodyArrayIdsFields = (fields) => {
  return (req, res, next) => {
    if (!fields) {
      return res.status(400).json({ code: 400, message: "Missing fields ids" });
    }

    const missingFields = fields.filter((field) => {
      return req.body[field].some((f) => !formatUtils.isAMongoId(f));
    });

    if (missingFields.length > 0) {
      return res.status(400).json({
        code: 400,
        message: "Wrong ids",
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
          case "lowercase": {
            const lower = req.body[field].toLowerCase();
            if (typeof lower === "string") {
              req.body[field] = lower;
            }
            break;
          }
          case "uppercase": {
            const upper = req.body[field].toUpperCase();
            if (typeof upper === "string") {
              req.body[field] = upper;
            }
            break;
          }
          case "number": {
            const num = parseInt(req.body[field]);
            if (!isNaN(num)) {
              req.body[field] = num;
            }
            break;
          }
          default:
            console.log("default ");
            break;
        }
      }
    });

    return next();
  };
};

const validateParamsField = (req, res, next, param) => {
  const isValid = formatUtils.isAMongoId(param);

  if (!isValid) {
    return res.status(400).json({
      code: 400,
      message: "Invalid ID: " + param,
    });
  }

  return next();
};

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

const validateBodyIdsFields = (fields) => {
  return (req, res, next) => {
    const errorFields = fields.filter((field) => {
      const fieldToCheck = req.body[field];
      if (Array.isArray(fieldToCheck)) {
        return fieldToCheck.some((f) => !formatUtils.isAMongoId(f));
      }
      if (typeof fieldToCheck === "string") {
        return !formatUtils.isAMongoId(fieldToCheck);
      }
      return true;
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
  canAdminWrite: [checkToken, insertAuthPayload, canAdminWrite],
  canAdminDelete: [checkToken, insertAuthPayload, canAdminDelete],
  validateBodyFields,
  validateBodyIdsFields,
  validateParamsField,
  formatFields,
  insertAuthPayload,
  validateBodyArrayFields,
  validateBodyArrayIdsFields,
};
