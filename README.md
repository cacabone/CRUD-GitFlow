CRUD-GitFlow — Local setup

This repository is a small full-stack CRUD example (React frontend + Express + MySQL backend). These instructions will get the project running locally for development.

## Prerequisites

- Node.js (recommended v18+) and npm
- MySQL server (or compatible, e.g. MariaDB)

## Database setup

1. Start your MySQL server and create a database named `crud` (or choose another name and update backend config).

Example SQL (run in MySQL client):

```sql
CREATE DATABASE IF NOT EXISTS crud;
USE crud;

CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL DEFAULT ''
);
```

Notes:
- The `password` column uses a default empty string here so examples that don't send a password will not fail. For production you should store hashed passwords and enforce proper constraints.

## Configure backend credentials

By default the backend reads credentials from `server.js`. Open `backend/server.js` and update the MySQL connection block with your `host`, `user`, `password`, and `database` values if needed.

Optional (recommended): change the code to use environment variables and a `.env` file — for a small demo it's OK to keep credentials in `server.js`, but never commit real passwords.

## Install dependencies

Open two terminals (one for backend, one for frontend).

Backend:
```powershell
cd backend
npm install
```

Frontend:
```powershell
cd frontend
npm install
```

## Start the app

1. Start the backend server (this example expects port 5000, but server may use `process.env.PORT` or a different port in the current branch):

```powershell
cd backend
npm start
```

You should see a message like `Server is running at http://localhost:5000` and a MySQL connection log.

2. Start the frontend dev server:

```powershell
cd frontend
npm start
```

Open your browser at `http://localhost:3000` (Create React App default). The frontend will make API calls to the backend (default backend port used by this branch is shown in code). If the frontend uses a proxy in `package.json`, API requests can be relative (e.g. `/api/users`).

## Test the API manually

From PowerShell you can run quick requests:

Create user:
```powershell
Invoke-RestMethod -Uri http://localhost:5000/create -Method Post -ContentType 'application/json' -Body ('{"name":"Alice","email":"alice@example.com"}')
```

List users:
```powershell
Invoke-RestMethod -Uri http://localhost:5000/api/users -Method Get
```

Delete user (id=1 example):
```powershell
Invoke-RestMethod -Uri http://localhost:5000/delete/1 -Method Delete
```

Adjust the port if your backend is configured to run on a different port in the active branch.

## CORS and Ports

- During development the frontend runs on `localhost:3000` and the backend on a different port (commonly `5000`). The backend should enable CORS for the frontend origin (example: `http://localhost:3000`) — this is handled in the branches we've been working on.
- Alternatively, the frontend `package.json` can include a `proxy` entry to forward unrecognized requests to the backend during `npm start`.

## Security notes

- Do not store plaintext passwords in production. Use a hashing library (e.g., `bcrypt`) and never log passwords.
- Do not commit database credentials to source control. Use environment variables in production.

## Troubleshooting

- If you see CORS errors in the browser console, verify the backend's CORS configuration and correct frontend origin.
- If a DB insert fails with `Field 'password' doesn't have a default value`, either recreate the `users` table with the `password` default shown above or include a `password` field in your create requests.
- If ports differ across branches, open the backend `server.js` to confirm the configured port and update the frontend API URLs or `proxy` accordingly.

## Contributing / Notes for maintainers

- There are several branches in this repo that exercise different flows (create, update, delete). When switching branches, double-check `backend/server.js` and `frontend/src/*` for port and route changes.
- For production deployments, serve the built frontend from a static host (or from the backend's static folder) and configure secure cookies / CORS accordingly.

Enjoy! If you want, I can also:
- Add a `.env`-based config to the backend and update README with exact `.env` keys, or
- Add a tiny script to initialize the DB automatically.

