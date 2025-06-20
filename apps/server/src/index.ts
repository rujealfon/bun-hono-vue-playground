import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import {
  createSuccessResponse,
  createErrorResponse,
  API_ENDPOINTS,
  HTTP_STATUS,
  type HealthResponse,
  type User,
  type CreateUserRequest,
} from "@monorepo/shared";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"], // Vue dev and preview ports
    credentials: true,
  })
);

// In-memory users store (for demo purposes)
const users: User[] = [];

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get(API_ENDPOINTS.HEALTH, (c) => {
  const healthData: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  };

  return c.json(createSuccessResponse(healthData), HTTP_STATUS.OK);
});

// Users API endpoints
app.get(API_ENDPOINTS.USERS, (c) => {
  return c.json(createSuccessResponse(users), HTTP_STATUS.OK);
});

app.post(API_ENDPOINTS.USERS, async (c) => {
  try {
    const body = (await c.req.json()) as CreateUserRequest;

    if (!body.email || !body.name) {
      return c.json(
        createErrorResponse("Email and name are required"),
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: body.email,
      name: body.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);

    return c.json(createSuccessResponse(newUser), HTTP_STATUS.CREATED);
  } catch (error) {
    return c.json(
      createErrorResponse("Invalid JSON body"),
      HTTP_STATUS.BAD_REQUEST
    );
  }
});

app.get("/api/users/:id", (c) => {
  const id = c.req.param("id");
  const user = users.find((u) => u.id === id);

  if (!user) {
    return c.json(createErrorResponse("User not found"), HTTP_STATUS.NOT_FOUND);
  }

  return c.json(createSuccessResponse(user), HTTP_STATUS.OK);
});

const port = process.env.PORT || 3000;

console.log(`🚀 Server running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
