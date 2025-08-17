# Worker Dashboard

Monitor worker threads with Angular + Node.js

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/YulikK/angulat-test.git
cd angulat-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root (optional) and specify:

```
SOCKET_PORT=3000
CLIENT_URL=http://localhost:4200
SERVER_URL=http://localhost:3000
```

### 4. Start server and client

```bash
npm run build:server
npm run start
npm run client:dev
```

- Server will be available at `http://localhost:3000`
- Client at `http://localhost:4200`

### 5. Worker management and monitoring

- The client displays sessions (workers), their status, logs, and runtime.
- You can create and terminate workers via the UI.
