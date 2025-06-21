/**
 * Creates a standardized API response
 */
export function createApiResponse(success, data, error) {
    const response = {
        success,
        timestamp: new Date().toISOString(),
    };
    if (data !== undefined) {
        response.data = data;
    }
    if (error !== undefined) {
        response.error = error;
    }
    return response;
}
/**
 * Creates a success API response
 */
export function createSuccessResponse(data) {
    return createApiResponse(true, data);
}
/**
 * Creates an error API response
 */
export function createErrorResponse(error) {
    return createApiResponse(false, undefined, error);
}
/**
 * Creates a validation error response
 */
export function createValidationErrorResponse(errors) {
    const errorMessage = errors.map((e) => `${e.field}: ${e.message}`).join(", ");
    return createApiResponse(false, { validationErrors: errors }, `Validation failed: ${errorMessage}`);
}
/**
 * Validates email format
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Validates task creation request
 */
export function validateCreateTaskRequest(data) {
    const errors = [];
    if (!data.title ||
        typeof data.title !== "string" ||
        data.title.trim().length === 0) {
        errors.push({
            field: "title",
            message: "Title is required and must be a non-empty string",
        });
    }
    if (data.title && data.title.length > 200) {
        errors.push({
            field: "title",
            message: "Title must be less than 200 characters",
        });
    }
    if (data.description && typeof data.description !== "string") {
        errors.push({
            field: "description",
            message: "Description must be a string",
        });
    }
    if (data.description && data.description.length > 1000) {
        errors.push({
            field: "description",
            message: "Description must be less than 1000 characters",
        });
    }
    if (data.priority && !["low", "medium", "high"].includes(data.priority)) {
        errors.push({
            field: "priority",
            message: "Priority must be one of: low, medium, high",
        });
    }
    if (data.dueDate && !isValidDate(data.dueDate)) {
        errors.push({
            field: "dueDate",
            message: "Due date must be a valid ISO date string",
        });
    }
    return errors;
}
/**
 * Validates task update request
 */
export function validateUpdateTaskRequest(data) {
    const errors = [];
    if (data.title !== undefined) {
        if (typeof data.title !== "string" || data.title.trim().length === 0) {
            errors.push({
                field: "title",
                message: "Title must be a non-empty string",
            });
        }
        if (data.title && data.title.length > 200) {
            errors.push({
                field: "title",
                message: "Title must be less than 200 characters",
            });
        }
    }
    if (data.description !== undefined && typeof data.description !== "string") {
        errors.push({
            field: "description",
            message: "Description must be a string",
        });
    }
    if (data.description && data.description.length > 1000) {
        errors.push({
            field: "description",
            message: "Description must be less than 1000 characters",
        });
    }
    if (data.completed !== undefined && typeof data.completed !== "boolean") {
        errors.push({ field: "completed", message: "Completed must be a boolean" });
    }
    if (data.priority !== undefined &&
        !["low", "medium", "high"].includes(data.priority)) {
        errors.push({
            field: "priority",
            message: "Priority must be one of: low, medium, high",
        });
    }
    if (data.dueDate !== undefined &&
        data.dueDate !== null &&
        !isValidDate(data.dueDate)) {
        errors.push({
            field: "dueDate",
            message: "Due date must be a valid ISO date string or null",
        });
    }
    return errors;
}
/**
 * Validates if a string is a valid ISO date
 */
export function isValidDate(dateString) {
    const date = new Date(dateString);
    return (date instanceof Date &&
        !isNaN(date.getTime()) &&
        date.toISOString() === dateString);
}
/**
 * Generates a random ID
 */
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
/**
 * Formats a date to ISO string
 */
export function formatDate(date = new Date()) {
    return date.toISOString();
}
/**
 * Delays execution for specified milliseconds
 */
export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/**
 * Sanitizes task data for response
 */
export function sanitizeTask(task) {
    const sanitized = {
        ...task,
        title: task.title.trim(),
    };
    if (task.description !== undefined) {
        const trimmed = task.description.trim();
        if (trimmed) {
            sanitized.description = trimmed;
        }
    }
    return sanitized;
}
/**
 * Validates pagination parameters
 */
export function validatePaginationParams(page, limit) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return {
        page: Math.max(1, isNaN(pageNum) ? 1 : pageNum),
        limit: Math.min(100, Math.max(1, isNaN(limitNum) ? 10 : limitNum)),
    };
}
/**
 * Creates pagination metadata
 */
export function createPaginationMeta(page, limit, total) {
    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
}
//# sourceMappingURL=utils.js.map