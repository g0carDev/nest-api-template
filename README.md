<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```bash
yarn install
```

Tener Nest CLI instalado

```bash
npm i -g @nestjs/cli
```

Levantar la base de datos

```bash
docker-compose up -d
```

1. Clonar el archivo ```.env.template``` y renombar la copia a ```.env```

2. Llenar las variables de entorno definidas en el ```.env```

3. Ejecutar la aplicación en dev:

```bash
yarn start:dev
```

Reconstruir la base de datos con la semilla

```bash
http://localhost:3001/api/seed
```

## Stack usado

* MongoDB
* Nest

# Production Build

1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

Correr aplicacion en modo produccion

```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```

# Notas

* Api documentada con Swagger en http://localhost:3001/api/
