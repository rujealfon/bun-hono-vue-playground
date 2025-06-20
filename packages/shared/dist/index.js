// src/types.ts
var API_ENDPOINTS = {
  HEALTH: "/api/health",
  USERS: "/api/users",
  USER: (id) => `/api/users/${id}`
};
var HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};
// src/utils.ts
function createApiResponse(success, data, error) {
  return {
    success,
    data,
    error,
    timestamp: new Date().toISOString()
  };
}
function createSuccessResponse(data) {
  return createApiResponse(true, data);
}
function createErrorResponse(error) {
  return createApiResponse(false, undefined, error);
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
function formatDate(date = new Date) {
  return date.toISOString();
}
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export {
  isValidEmail,
  generateId,
  formatDate,
  delay,
  createSuccessResponse,
  createErrorResponse,
  createApiResponse,
  HTTP_STATUS,
  API_ENDPOINTS
};
