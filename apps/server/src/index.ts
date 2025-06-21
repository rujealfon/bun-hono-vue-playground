import app from "./app.js";

const port = Bun.env.PORT || 3001;

console.warn(`🚀 Server starting on port ${port}`);
console.warn(`📋 Tasks API available at http://localhost:${port}/api/tasks`);
console.warn(`❤️  Health check at http://localhost:${port}/api/health`);

export default {
  port,
  fetch: app.fetch,
};
