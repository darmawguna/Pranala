# Deployment Guide (Docker + Host Caddy)

This guide explains how to deploy the application on a VPS using Docker for the application and database, while using the Host's Caddy server as the web server.

## Prerequisites

- A VPS (Ubuntu 22.04/24.04 recommended).
- **Docker** and **Docker Compose** installed on the VPS.
- **Caddy** installed on the VPS (Host).
- A domain name pointing to your VPS IP address.

## Structure

- **App**: Laravel 12 (PHP 8.2 FPM) running in Docker, exposed on port `9011`.
- **Web Server**: Caddy running directly on the Host (Proxying to 127.0.0.1:9011).
- **Database**: MySQL 8.0 running in Docker.
- **Redis**: Redis running in Docker.

## Installation Steps

1.  **Clone the Repository**
    ```bash
    git clone <your-repo-url> /var/www/website-metatah
    cd /var/www/website-metatah
    ```

2.  **Environment Setup**
    Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
    Update `.env` with your production settings:
    ```ini
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://your-domain.com

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=website_metatah
    DB_USERNAME=metatah_user
    DB_PASSWORD=secure_password

    REDIS_HOST=redis
    ```
    *Note: Since the app is in Docker, `DB_HOST` should be `db` (service name) if they share a network. However, `docker-compose.yml` links them. Wait, if app is in container and DB is in container, `DB_HOST` should be `db`.*

    **Correction**:
    - `DB_HOST=db` (App connects to DB container).
    - `REDIS_HOST=redis` (App connects to Redis container).

3.  **Configure Host Caddy**
    - Ensure Caddy is installed: `sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https ...` (refer to Caddy docs).
    - Open your Caddyfile (usually `/etc/caddy/Caddyfile`) or import the project config.
    - Append the content of `Caddyfile.host` to `/etc/caddy/Caddyfile`, replacing `your-domain.com` with your actual domain.
    ```bash
    cat Caddyfile.host | sudo tee -a /etc/caddy/Caddyfile
    ```
    - Reload Caddy:
    ```bash
    sudo systemctl reload caddy
    ```

4.  **Build and Run Containers**
    ```bash
    docker-compose up -d --build
    ```

5.  **Post-Deployment**
    Run migrations and optimizations:
    ```bash
    docker-compose exec app php artisan migrate --force
    docker-compose exec app php artisan key:generate
    docker-compose exec app php artisan storage:link
    ```

## Maintenance

-   **View Logs**: `docker-compose logs -f`
-   **Restart App**: `docker-compose restart app`
-   **Update Application**:
    ```bash
    git pull
    docker-compose build app
    docker-compose up -d
    ```
