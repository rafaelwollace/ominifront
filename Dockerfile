# Etapa 1: Build da aplicação
FROM node:18-alpine AS build

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalando as dependências
RUN npm install

# Copiando o restante do código da aplicação
COPY . .

# Rodando o build da aplicação
RUN npm run build

# Etapa 2: Servidor NGINX para servir o build estático
FROM nginx:alpine

# Copiando o build da aplicação gerado na etapa anterior para a pasta padrão do NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Expondo a porta padrão do NGINX
EXPOSE 80

# Rodando o NGINX
CMD ["nginx", "-g", "daemon off;"]
