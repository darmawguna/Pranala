# Stage 1: Build Backend Dependencies
FROM composer:2 AS composer_build
WORKDIR /app
COPY composer.json composer.lock ./
# Install no-dev dependencies, optimize, and ignore platform mainly to avoid extension mismatch during dependency resolution (optional but safe)
RUN composer install --no-dev --optimize-autoloader --no-scripts --ignore-platform-reqs

# Stage 2: Build Frontend Assets
FROM node:20 AS node_build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 3: Production Image
FROM php:8.2-fpm

# Arguments defined in docker-compose.yml
ARG user=www-data
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd opcache

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www

# Copy application files (respecting .dockerignore)
COPY . .

# Copy backend vendors from stage 1
COPY --from=composer_build /app/vendor/ ./vendor/

# Copy frontend assets from stage 2
COPY --from=node_build /app/public/build/ ./public/build/

# Setup permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Copy entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Change current user to www
USER www-data

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
