import {
  UnautheticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) throw new UnautheticatedError("Authentication invalid");

  try {
    const payload = verifyToken(jwt);
    const testUser = payload.userId === "6516834edc85be27158b0e56";
    req.user = { userId: payload.userId, role: payload.role, testUser };
    next();
  } catch (error) {
    throw new UnautheticatedError("Authentication jwt invalid");
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new UnauthorizedError(
      "This account is a test account, you can't perform this action"
    );
  } else {
    next();
  }
};

export const authorizePermissions = (...roles) => {
  // Roles is an array of roles that are allowed to access the route

  return (req, res, next) => {
    const isAuthorized = req.user.role.some((role) => roles.includes(role));
    console.log(roles);
    if (!isAuthorized) {
      throw new UnautheticatedError("Unauthorized");
    }
    next();
  };
};
