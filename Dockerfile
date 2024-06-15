# ������ ������ ���������� ����� �� Node.js
FROM node:21-alpine3.18 as build-stage
WORKDIR /client1

# ��������� pnpm
RUN npm install -g pnpm

# ����������� package.json � ��������� ������������
COPY package.json .
RUN pnpm install

# ����������� ��������� ������ ������� � ������
COPY . .
RUN pnpm "build:prod"

# ��������� ������ � Nginx
FROM nginx:1.17.0-alpine

# ����������� ��������� ������ � �����, ������ Nginx ����� ��������� ����������� �����
COPY --from=build-stage /client1/build /usr/share/nginx/html

# ����������� ����������� ����������������� ����� nginx.conf � ���������
COPY --from=build-stage /client1/nginx/nginx.conf /etc/nginx/nginx.conf

# ����������� ����������������� ����� ������� �� ��������� � /etc/nginx/conf.d/
COPY --from=build-stage /client1/nginx/default.conf /etc/nginx/conf.d/default.conf

# ����������� SSL ������������ � ������
COPY ssl/certificate.crt /etc/nginx/ssl/certificate.crt
COPY ssl/private.key /etc/nginx/ssl/private.key
COPY ssl/ca_bundle.crt /etc/nginx/ssl/ca_bundle.crt

# �������� ������ 80 � 443
EXPOSE 80 443

# ������ Nginx � ������ foreground
CMD ["nginx", "-g", "daemon off;"]
