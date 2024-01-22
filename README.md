
# Promass blog test

Aplicación web que simula un blog, dos proyectos, una res api y una front end spa.


## Authors

- [@LeonardoCg](https://github.com/leonardocg94)


## Features

- Creación de usuario
- Login/logout y registro (se implemento en lugar de un campo de autor)
- Creación de entradas de blog
- Búsqueda de entradas de blog
- Detalles de una entrada de blog
- Manejo de likes para las entradas de blog


## Appendix

Para usar la aplicación es necesario tener instalado y corriendo postgresql.
Es necesario correr primero el proyecto blog-api antes de correr el proyecto blog-app.
- Versiones
    - postgresql 15.2
    - node 18.16.1
    - npm 9.7.2


## Environment Variables

Para la parte del proyecto blog-app no es necesario el uso de variables de entorno, al no usar mucho decidí poner la url del api directamente en código solo por ser una prueba y no un proyecto real ya que esta es una mala practica.

Para la parte del proyecto blog-api es necesario revisar las variables de entorno referentes a la conexión con la base de datos, dependiendo el nombre, contrasña y usuario que se creen en el entorno local.

`DB_USER` usuario con accesos a la base de datos

`DB_PASSWORD` contraseña del usuario con acceso a la base de datos

`DB_NAME` nombre de la base de datos

`DB_HOST` host de la base de datos, localhost por defecto

`JWT_SECRET_WORD` palabra con la que se firman los tokens, de preferencia no modificar

`PORT` puerto en el que corre el sevidor, de preferencia no modificar


## Installation

Para el proyecto blog-api

```bash
  cd [alguna ruta]/[carpeta con los proyectos]/blog-api
  npm i

```

Para el proyecto blog-app
```bash
  cd [alguna ruta]/[carpeta con los proyectos]/blog-app
  npm i
```
## Run Locally

Clonar el proyecto

```bash
  git clone https://github.com/leonardocg94/promass_test.git
```

Entrar al proyecto blog-api

```bash
  cd promass_test/blog-api
```

Instalar las dependencias

```bash
  npm install
```
NOTA: Asegurarse de tener postgresql corriendo

Si es la primera vez que se corre el proyecto utilizar el comando build ya que al no exitir la carpeta build al inicio puede dar un error

```bash
  npm run build
```

Iniciar el servidor en modo dev

```bash
  npm run dev
```

Asegurarse que la consola muestre la siguiente linea

```bash
  [SERVER]: server is running on port: 8000
```

Entrar al proyecto blog-app

```bash
  cd promass_test/blog-app
```

Instalar las dependencias

```bash
  npm install
```

Correr la aplicación en modo dev

```bash
  npm run dev
```

Vite por defecto despliega la aplicación en la siguiente dirección

```bash
  http://localhost:5173/
```

En caso de que el puerto 5173 este ocupado vite asignará otro y lo mostrara en consola, ingresar a la dirección.
