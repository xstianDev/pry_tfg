# Comandos de package.json
lint : analiza el estilo del proyecto.
lint:fix : corrige los estilos.

ssr : levanta el servidor HTTPS del archivo https.ts 
wss : levanta el servidor WSS del archivo socket.ts

build:client : compila el código del lado del cliente.
build:server : compila el código de https.ts.
build:socket : compila el código de socket.ts
build : build:client + build:server + build:socket

build:ssr : build:server + ssr
build:wss : build:socket + wss


# Información
Actualmente el proyecto está alojado en https://github.com/xstianDev/pry_tfg bajo el nombre de pry_tfg, pero en el futuro será archivado y el código se migrará a un repositorio llamado Bloom en una cuenta dedicada a proyectos similares.