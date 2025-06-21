import type {
  CreateTaskRequest,
  PaginatedResponse,
  Task,
  TasksQueryParams,
  UpdateTaskRequest,
} from '@bun-hono-vue-playground/shared'
import {
  createErrorResponse,
  createPaginationMeta,
  createSuccessResponse,
  createValidationErrorResponse,
  formatDate,
  generateId,
  HTTP_STATUS,
  sanitizeTask,
  validateCreateTaskRequest,
  validatePaginationParams,
  validateUpdateTaskRequest,
} from '@bun-hono-vue-playground/shared'
import { Hono } from 'hono'

const tasks = new Hono()

// In-memory storage for demo purposes
// In a real app, this would be a database
let tasksList: Task[] = [
  {
    id: 'task-1',
    title: 'Setup project monorepo',
    description: 'Create a monorepo structure with Bun workspaces',
    completed: true,
    priority: 'high',
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T14:30:00.000Z',
    dueDate: '2024-01-20T00:00:00.000Z',
    userId: 'user-1',
  },
  {
    id: 'task-2',
    title: 'Implement Hono API server',
    description: 'Build REST API with CRUD operations for tasks',
    completed: false,
    priority: 'high',
    createdAt: '2024-01-15T11:00:00.000Z',
    updatedAt: '2024-01-15T11:00:00.000Z',
    dueDate: '2024-01-25T00:00:00.000Z',
    userId: 'user-1',
  },
  {
    id: 'task-3',
    title: 'Create Vue.js frontend',
    description: 'Build a responsive UI for task management',
    completed: false,
    priority: 'medium',
    createdAt: '2024-01-15T12:00:00.000Z',
    updatedAt: '2024-01-15T12:00:00.000Z',
    userId: 'user-1',
  },
  {
    id: 'task-4',
    title: 'Add unit tests',
    description: 'Write comprehensive test coverage',
    completed: false,
    priority: 'low',
    createdAt: '2024-01-15T13:00:00.000Z',
    updatedAt: '2024-01-15T13:00:00.000Z',
    dueDate: '2024-02-01T00:00:00.000Z',
    userId: 'user-1',
  },
]

// Get all tasks with filtering, sorting, and pagination
tasks.get('/', (c) => {
  try {
    const query = c.req.query()
    const params: TasksQueryParams = {
      completed:
        query.completed === 'true'
          ? true
          : query.completed === 'false'
            ? false
            : undefined,
      priority: query.priority as 'low' | 'medium' | 'high' | undefined,
      sortBy: query.sortBy as
      | 'createdAt'
      | 'dueDate'
      | 'priority'
      | 'title'
      | undefined,
      sortOrder: query.sortOrder as 'asc' | 'desc' | undefined,
    }

    const { page, limit } = validatePaginationParams(query.page, query.limit)

    // Filter tasks
    let filteredTasks = [...tasksList]

    if (params.completed !== undefined) {
      filteredTasks = filteredTasks.filter(
        task => task.completed === params.completed,
      )
    }

    if (params.priority) {
      filteredTasks = filteredTasks.filter(
        task => task.priority === params.priority,
      )
    }

    // Sort tasks
    const sortBy = params.sortBy || 'createdAt'
    const sortOrder = params.sortOrder || 'desc'

    filteredTasks.sort((a, b) => {
      let aValue: any = a[sortBy]
      let bValue: any = b[sortBy]

      if (sortBy === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3 }
        aValue = priorityOrder[a.priority]
        bValue = priorityOrder[b.priority]
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1
      }
      return 0
    })

    // Paginate tasks
    const total = filteredTasks.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex)

    const response: PaginatedResponse<Task> = {
      data: paginatedTasks.map(sanitizeTask),
      pagination: createPaginationMeta(page, limit, total),
    }

    return c.json(createSuccessResponse(response))
  }
  catch (error) {
    console.error('Error fetching tasks:', error)
    return c.json(
      createErrorResponse('Failed to fetch tasks'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Get task by ID
tasks.get('/:id', (c) => {
  try {
    const id = c.req.param('id')
    const task = tasksList.find(t => t.id === id)

    if (!task) {
      return c.json(
        createErrorResponse('Task not found'),
        HTTP_STATUS.NOT_FOUND,
      )
    }

    return c.json(createSuccessResponse(sanitizeTask(task)))
  }
  catch (error) {
    console.error('Error fetching task:', error)
    return c.json(
      createErrorResponse('Failed to fetch task'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Create new task
tasks.post('/', async (c) => {
  try {
    const body = await c.req.json()

    // Validate request body
    const validationErrors = validateCreateTaskRequest(body)
    if (validationErrors.length > 0) {
      return c.json(
        createValidationErrorResponse(validationErrors),
        HTTP_STATUS.BAD_REQUEST,
      )
    }

    const createTaskData: CreateTaskRequest = body
    const now = formatDate()

    const newTask: Task = {
      id: generateId(),
      title: createTaskData.title,
      description: createTaskData.description,
      completed: false,
      priority: createTaskData.priority || 'medium',
      dueDate: createTaskData.dueDate,
      createdAt: now,
      updatedAt: now,
      userId: 'user-1', // In a real app, this would come from authentication
    }

    tasksList.push(newTask)

    return c.json(
      createSuccessResponse(sanitizeTask(newTask)),
      HTTP_STATUS.CREATED,
    )
  }
  catch (error) {
    console.error('Error creating task:', error)
    return c.json(
      createErrorResponse('Failed to create task'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Update task by ID
tasks.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()

    // Find existing task
    const taskIndex = tasksList.findIndex(t => t.id === id)
    if (taskIndex === -1) {
      return c.json(
        createErrorResponse('Task not found'),
        HTTP_STATUS.NOT_FOUND,
      )
    }

    // Validate request body
    const validationErrors = validateUpdateTaskRequest(body)
    if (validationErrors.length > 0) {
      return c.json(
        createValidationErrorResponse(validationErrors),
        HTTP_STATUS.BAD_REQUEST,
      )
    }

    const updateData: UpdateTaskRequest = body
    const existingTask = tasksList[taskIndex]

    // Update task with new data
    const updatedTask: Task = {
      ...existingTask,
      title:
        updateData.title !== undefined ? updateData.title : existingTask.title,
      description:
        updateData.description !== undefined
          ? updateData.description
          : existingTask.description,
      completed:
        updateData.completed !== undefined
          ? updateData.completed
          : existingTask.completed,
      priority:
        updateData.priority !== undefined
          ? updateData.priority
          : existingTask.priority,
      dueDate:
        updateData.dueDate !== undefined
          ? updateData.dueDate
          : existingTask.dueDate,
      updatedAt: formatDate(),
    }

    tasksList[taskIndex] = updatedTask

    return c.json(createSuccessResponse(sanitizeTask(updatedTask)))
  }
  catch (error) {
    console.error('Error updating task:', error)
    return c.json(
      createErrorResponse('Failed to update task'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Delete task by ID
tasks.delete('/:id', (c) => {
  try {
    const id = c.req.param('id')
    const taskIndex = tasksList.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return c.json(
        createErrorResponse('Task not found'),
        HTTP_STATUS.NOT_FOUND,
      )
    }

    tasksList.splice(taskIndex, 1)

    return c.json(
      createSuccessResponse({ message: 'Task deleted successfully' }),
    )
  }
  catch (error) {
    console.error('Error deleting task:', error)
    return c.json(
      createErrorResponse('Failed to delete task'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Toggle task completion status
tasks.patch('/:id/toggle', (c) => {
  try {
    const id = c.req.param('id')
    const taskIndex = tasksList.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return c.json(
        createErrorResponse('Task not found'),
        HTTP_STATUS.NOT_FOUND,
      )
    }

    const task = tasksList[taskIndex]
    task.completed = !task.completed
    task.updatedAt = formatDate()

    return c.json(createSuccessResponse(sanitizeTask(task)))
  }
  catch (error) {
    console.error('Error toggling task:', error)
    return c.json(
      createErrorResponse('Failed to toggle task'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Get task statistics
tasks.get('/stats', (c) => {
  try {
    const stats = {
      total: tasksList.length,
      completed: tasksList.filter(t => t.completed).length,
      pending: tasksList.filter(t => !t.completed).length,
      overdue: tasksList.filter(
        t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date(),
      ).length,
      byPriority: {
        low: tasksList.filter(t => t.priority === 'low').length,
        medium: tasksList.filter(t => t.priority === 'medium').length,
        high: tasksList.filter(t => t.priority === 'high').length,
      },
    }

    return c.json(createSuccessResponse(stats))
  }
  catch (error) {
    console.error('Error fetching stats:', error)
    return c.json(
      createErrorResponse('Failed to fetch statistics'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

// Bulk operations
tasks.post('/bulk', async (c) => {
  try {
    const body = await c.req.json()
    const { action, taskIds } = body

    if (!action || !Array.isArray(taskIds)) {
      return c.json(
        createErrorResponse('Invalid bulk operation request'),
        HTTP_STATUS.BAD_REQUEST,
      )
    }

    let updatedCount = 0

    switch (action) {
      case 'complete':
        tasksList.forEach((task) => {
          if (taskIds.includes(task.id)) {
            task.completed = true
            task.updatedAt = formatDate()
            updatedCount++
          }
        })
        break

      case 'incomplete':
        tasksList.forEach((task) => {
          if (taskIds.includes(task.id)) {
            task.completed = false
            task.updatedAt = formatDate()
            updatedCount++
          }
        })
        break

      case 'delete':
        tasksList = tasksList.filter((task) => {
          if (taskIds.includes(task.id)) {
            updatedCount++
            return false
          }
          return true
        })
        break

      default:
        return c.json(
          createErrorResponse('Invalid bulk action'),
          HTTP_STATUS.BAD_REQUEST,
        )
    }

    return c.json(
      createSuccessResponse({
        message: `Bulk ${action} operation completed`,
        updatedCount,
      }),
    )
  }
  catch (error) {
    console.error('Error performing bulk operation:', error)
    return c.json(
      createErrorResponse('Failed to perform bulk operation'),
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    )
  }
})

export { tasks as taskRoutes }
