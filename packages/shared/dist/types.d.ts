export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}
export interface HealthResponse {
    status: "ok" | "error";
    timestamp: string;
    version?: string;
}
export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    priority: "low" | "medium" | "high";
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
    userId?: string;
}
export interface CreateTaskRequest {
    title: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    dueDate?: string;
}
export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    completed?: boolean;
    priority?: "low" | "medium" | "high";
    dueDate?: string;
}
export interface TasksQueryParams {
    completed?: boolean;
    priority?: "low" | "medium" | "high";
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "dueDate" | "priority" | "title";
    sortOrder?: "asc" | "desc";
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateUserRequest {
    email: string;
    name: string;
}
export interface UpdateUserRequest {
    name?: string;
    email?: string;
}
export declare const API_ENDPOINTS: {
    readonly HEALTH: "/api/health";
    readonly TASKS: "/api/tasks";
    readonly TASK: (id: string) => string;
    readonly USERS: "/api/users";
    readonly USER: (id: string) => string;
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
};
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
export interface ValidationError {
    field: string;
    message: string;
}
//# sourceMappingURL=types.d.ts.map