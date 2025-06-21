import type { ApiResponse, ValidationError, Task } from "./types.js";
/**
 * Creates a standardized API response
 */
export declare function createApiResponse<T>(success: boolean, data?: T, error?: string): ApiResponse<T>;
/**
 * Creates a success API response
 */
export declare function createSuccessResponse<T>(data: T): ApiResponse<T>;
/**
 * Creates an error API response
 */
export declare function createErrorResponse(error: string): ApiResponse;
/**
 * Creates a validation error response
 */
export declare function createValidationErrorResponse(errors: ValidationError[]): ApiResponse;
/**
 * Validates email format
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Validates task creation request
 */
export declare function validateCreateTaskRequest(data: any): ValidationError[];
/**
 * Validates task update request
 */
export declare function validateUpdateTaskRequest(data: any): ValidationError[];
/**
 * Validates if a string is a valid ISO date
 */
export declare function isValidDate(dateString: string): boolean;
/**
 * Generates a random ID
 */
export declare function generateId(): string;
/**
 * Formats a date to ISO string
 */
export declare function formatDate(date?: Date): string;
/**
 * Delays execution for specified milliseconds
 */
export declare function delay(ms: number): Promise<void>;
/**
 * Sanitizes task data for response
 */
export declare function sanitizeTask(task: Task): Task;
/**
 * Validates pagination parameters
 */
export declare function validatePaginationParams(page?: string, limit?: string): {
    page: number;
    limit: number;
};
/**
 * Creates pagination metadata
 */
export declare function createPaginationMeta(page: number, limit: number, total: number): {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
//# sourceMappingURL=utils.d.ts.map