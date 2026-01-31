# Deployment Guide: Host Caddy + Docker App

This document outlines the deployment schema for a VPS environment where **Caddy** runs directly on the host (outside Docker) and the application stack runs inside **Docker**.

## Deployment Schema

### 1. Architecture Overview
-   **Web Server (Host)**: Caddy acts as the entry point, handling SSL and static files. It reverse-proxies PHP requests to the Docker container.
-   **Application (Docker)**: Laravel 12 with PHP 8.2 FPM.
-   **Database (Docker)**: MySQL 8.0.
-   **Cache/Queue (Docker)**: Redis.

### 2. Networking Data Flow
1.  **Request**: User hits `https://your-domain.com`.
2.  **Host Caddy**:
    -   Serves static files (`css`, `js`, `images`) directly from `/home/your-user/project/public`.
    -   Forwards PHP requests to `127.0.0.1:9011`.
3.  **Docker Port Mapping**: Port `9011` on localhost maps to port `9000` inside the `pranala-app` container.
4.  **App Container**: Processes the request. Connects to `db` (MySQL) and `redis` (Redis) using internal Docker networking.

---

## Configuration Details

### 1. `docker-compose.yml` (Critical)
Ensure your `app` service looks like this to avoid errors:

```yaml
    app:
        # ...
        environment:
            DB_HOST: db
            REDIS_HOST: redis
        volumes:
            # Mount .env explicitly (because it's usually dockerignored)
            - ./.env:/var/www/.env
            # DO NOT mount ./:/var/www in production! It overrides the built vendor folder.
            - ./storage:/var/www/storage
        ports:
            - "127.0.0.1:9011:9000"
```

### 2. Host Caddy (`/etc/caddy/Caddyfile`)
This configuration solves the "File not found" error by mapping host paths correctly:

```caddy
your-domain.com {
    # CHANGE THIS to your actual project path on the VPS
    root * /home/your-user/project-folder/public

    encode zstd gzip
    file_server

    # Forward PHP requests to Docker
    php_fastcgi 127.0.0.1:9011 {
        # Magic: Tells Docker where the file is INSIDE the container
        root /var/www/public
    }
}
```

---

## Deployment Steps

1.  **Prepare VPS**:
    -   Clone repo to e.g., `/home/username/pranala`.
    -   `cp .env.example .env` and configure `APP_ENV=production`.
    -   **Important**: Copy `docker-compose.yml` and `Dockerfile` if they aren't in the repo root.

2.  **Start Docker**:
    ```bash
    docker-compose up -d --build
    ```

3.  **Post-Deployment Setup (Run once)**:
    
    a. **Fix Permissions** (Fixes 500 Error):
    ```bash
    docker-compose exec -u root app chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
    docker-compose exec -u root app chmod -R 775 /var/www/storage /var/www/bootstrap/cache
    ```

    b. **Copy Frontend Assets** (Fixes 404 Asset Error):
    ```bash
    # Use 'docker cp' (not compose) to copy built assets from container to host
    # Replace 'pranala-app' with your actual container name (check with 'docker ps')
    docker cp pranala-app:/var/www/public/build ./public/
    ```

    c. **Generate Key & Migrate**:
    ```bash
    # If APP_KEY is missing, generate it and PASTE it manually into .env on host
    docker-compose exec app php artisan key:generate --show
    
    # Run migrations
    docker-compose exec app php artisan migrate --force
    ```

4.  **Create Admin User**:
    ```bash
    docker-compose exec app php artisan tinker
    ```
    ```php
    App\Models\User::create([
        'name' => 'Admin',
        'email' => 'admin@domain.com',
        'password' => bcrypt('your_password')
    ]);
    ```

## Troubleshooting Cheat Sheet

| Error | Cause | Solution |
| :--- | :--- | :--- |
| **500 Internal Server Error** | Permission denied | Run "Fix Permissions" step above. |
| **500 Internal Server Error** | Missing `.env` / Key | check `docker-compose.yml` mounts `.env`? Run `key:generate`. |
| **404 AutoLoad missing** | Volume mount issue | Ensure `volumes: - ./:/var/www` is COMMENTED OUT in production. |
| **404 css/js/build/*.css** | Assets not on host | Run "Copy Frontend Assets" step above. |
| **File not found (White screen)** | Caddy Path Mismatch | Update Caddyfile with correct `root` and `php_fastcgi` config. |
