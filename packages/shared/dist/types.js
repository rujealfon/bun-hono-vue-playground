// API endpoints constants
export const API_ENDPOINTS = {
    HEALTH: "/api/health",
    TASKS: "/api/tasks",
    TASK: (id) => `/api/tasks/${id}`,
    USERS: "/api/users",
    USER: (id) => `/api/users/${id}`,
};
// HTTP status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
};
//# sourceMappingURL=types.js.map