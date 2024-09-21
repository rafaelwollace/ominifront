# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa 1: Servidor NGINX para servir o build estático
FROM nginx:alpine

# Copiando o build da aplicação gerado na etapa anterior para a pasta padrão do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expondo a porta padrão do NGINX
EXPOSE 80

# Rodando o NGINX
CMD ["nginx", "-g", "daemon off;"]
