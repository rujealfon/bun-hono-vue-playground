<template>
  <div class="user-manager">
    <h2>User Management</h2>

    <!-- Add User Form -->
    <div class="add-user-form">
      <h3>Add New User</h3>
      <form @submit.prevent="addUser">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="newUser.name"
            type="text"
            required
            placeholder="Enter user name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="newUser.email"
            type="email"
            required
            placeholder="Enter user email"
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Adding...' : 'Add User' }}
        </button>
      </form>
    </div>

    <!-- Health Check -->
    <div class="health-check">
      <button @click="checkHealth" :disabled="loading">Check API Health</button>
      <div v-if="healthStatus" class="health-status">
        Status: {{ healthStatus.status }}
        <small>({{ healthStatus.timestamp }})</small>
      </div>
    </div>

    <!-- Users List -->
    <div class="users-list">
      <h3>Users ({{ users.length }})</h3>
      <button @click="fetchUsers" :disabled="loading">Refresh Users</button>

      <div v-if="loading" class="loading">Loading...</div>

      <div v-if="error" class="error">Error: {{ error }}</div>

      <div v-if="users.length === 0 && !loading" class="no-users">
        No users found. Add some users above!
      </div>

      <div v-for="user in users" :key="user.id" class="user-card">
        <h4>{{ user.name }}</h4>
        <p>{{ user.email }}</p>
        <small>Created: {{ formatDate(user.createdAt) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  type User,
  type CreateUserRequest,
  type HealthResponse,
  type ApiResponse,
  API_ENDPOINTS,
  isValidEmail,
} from '@monorepo/shared'

// Reactive state
const users = ref<User[]>([])
const healthStatus = ref<HealthResponse | null>(null)
const loading = ref(false)
const error = ref<string>('')
const newUser = ref<CreateUserRequest>({
  name: '',
  email: '',
})

// API helper function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

// Health check
async function checkHealth() {
  try {
    loading.value = true
    error.value = ''

    const response = await apiCall<HealthResponse>(API_ENDPOINTS.HEALTH)
    if (response.success && response.data) {
      healthStatus.value = response.data
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to check health'
  } finally {
    loading.value = false
  }
}

// Fetch users
async function fetchUsers() {
  try {
    loading.value = true
    error.value = ''

    const response = await apiCall<User[]>(API_ENDPOINTS.USERS)
    if (response.success && response.data) {
      users.value = response.data
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch users'
  } finally {
    loading.value = false
  }
}

// Add user
async function addUser() {
  if (!newUser.value.name.trim() || !newUser.value.email.trim()) {
    error.value = 'Name and email are required'
    return
  }

  if (!isValidEmail(newUser.value.email)) {
    error.value = 'Please enter a valid email address'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const response = await apiCall<User>(API_ENDPOINTS.USERS, {
      method: 'POST',
      body: JSON.stringify(newUser.value),
    })

    if (response.success && response.data) {
      users.value.push(response.data)
      newUser.value = { name: '', email: '' }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to add user'
  } finally {
    loading.value = false
  }
}

// Format date helper
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString()
}

// Load initial data
onMounted(() => {
  checkHealth()
  fetchUsers()
})
</script>

<style scoped>
.user-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.add-user-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.health-check {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.health-status {
  margin-top: 10px;
  padding: 10px;
  background: #d4edda;
  border-radius: 4px;
  color: #155724;
}

.users-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
}

.user-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
}

.user-card h4 {
  margin: 0 0 5px 0;
  color: #333;
}

.user-card p {
  margin: 0 0 5px 0;
  color: #666;
}

.user-card small {
  color: #999;
}

.loading {
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
}

.error {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.no-users {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}
</style>
