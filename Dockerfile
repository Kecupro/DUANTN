# Sử dụng image Node.js chính thức
FROM node:18-alpine AS builder

# Tạo thư mục app
WORKDIR /app

# Copy toàn bộ code vào container
COPY . .

# Cài đặt pm2 để quản lý nhiều process
RUN npm install -g pm2

# Cài đặt dependencies cho backend
WORKDIR /app/serverNode_datn
RUN npm install

# Cài đặt dependencies cho frontend
WORKDIR /app/duantn
RUN npm install
RUN npm run build

# ---
# Tạo image production
FROM node:18-alpine AS prod
# Tạo thư mục app
WORKDIR /app
# Copy toàn bộ code vào container
COPY --from=builder /app /app
# Cài đặt pm2 để quản lý nhiều process
RUN npm install -g pm2

# Cài đặt nginx
RUN apk add --no-cache nginx
# Copy file nginx.conf vào container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy ecosystem file
COPY ecosystem.config.js /app/ecosystem.config.js

# Expose port 3000 (nginx sẽ listen ở đây)
EXPOSE 3000

# Start services using ecosystem file and nginx
CMD pm2 start /app/ecosystem.config.js && nginx -g 'daemon off;' 