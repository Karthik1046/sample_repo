# Step 1: Build app
FROM node:18 AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
