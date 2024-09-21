# Omnifront

Este repositório contém a aplicação frontend desenvolvida com React.js.

## 🚀 Instruções de Instalação

### 1. Clone o repositório

Clone o repositório em sua máquina local com o seguinte comando:

git clone https://github.com/rafaelwollace/ominifront.git


### 2. Configuração do arquivo `.env`

Após clonar o projeto, edite o arquivo `.env`, localizado na raiz do projeto, e insira a url do seu banco:

VITE_BASE_URL=


### 3. Rodar o Docker

Com o Docker já instalado na sua máquina, execute o seguinte comando na raiz do projeto para iniciar a aplicação:

docker-compose up -d --build

Este comando irá construir e iniciar o container em segundo plano.

### 4. Acessar o Backend

Após a execução do Docker, o backend estará disponível em:

- [http://localhost:3000](http://localhost:3000) ou através do IP da sua máquina.

---

## 🌐 Frontend

O frontend da aplicação está disponível publicamente em:

- [http://ommininfront.s3.us-east-2.amazonaws.com/index.html](http://ommininfront.s3.us-east-2.amazonaws.com/index.html)

---

## 📦 Processo de Deploy Automatizado

Este projeto utiliza um processo de deploy automatizado para o frontend e backend com base em branches de desenvolvimento.

### Fluxo de Deploy:

1. **Criar branch de feature**: Nenhuma ação automática é executada neste momento.
2. **Merge para a branch `dev`**: Após o merge, o pipeline roda o comando `npm audit`. Se o `npm audit` passar sem vulnerabilidades, uma Pull Request (PR) é criada automaticamente para a branch `main`, que deve ser revisada e aceita manualmente.
3. **Merge na branch `main`**: Após a PR ser aceita na `main`, o deploy é realizado automaticamente, enviando os arquivos para o bucket S3 configurado para o frontend.
