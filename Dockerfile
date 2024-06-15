# Стадия сборки клиентской части на Node.js
FROM node:21-alpine3.18 as build-stage
WORKDIR /client1

# Установка pnpm
RUN npm install -g pnpm

# Копирование package.json и установка зависимостей
COPY package.json .
RUN pnpm install

# Копирование остальных файлов проекта и сборка
COPY . .
RUN pnpm "build:prod"

# Финальная стадия с Nginx
FROM nginx:1.17.0-alpine

# Копирование собранных файлов в папку, откуда Nginx будет раздавать статические файлы
COPY --from=build-stage /client1/build /usr/share/nginx/html

# Копирование измененного конфигурационного файла nginx.conf в контейнер
COPY --from=build-stage /client1/nginx/nginx.conf /etc/nginx/nginx.conf

# Копирование конфигурационного файла сервера по умолчанию в /etc/nginx/conf.d/
COPY --from=build-stage /client1/nginx/default.conf /etc/nginx/conf.d/default.conf

# Копирование SSL сертификатов и ключей
COPY ssl/certificate.crt /etc/nginx/ssl/certificate.crt
COPY ssl/private.key /etc/nginx/ssl/private.key
COPY ssl/ca_bundle.crt /etc/nginx/ssl/ca_bundle.crt

# Открытие портов 80 и 443
EXPOSE 80 443

# Запуск Nginx в режиме foreground
CMD ["nginx", "-g", "daemon off;"]
