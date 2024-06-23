# Despliegue

Para desplegar Bloom se necesitan certificados, un archivo `.env` y una cuenta de correo con su correspondiente contraseña.


# Certificados

Para usar Bloom se necesita crear los certificados necesarios para el servidor HTTP, el servidor Socket y la autenticación.

## Directorio

El directorio certs tiene esta estructura:

```
certs
│
└───auth
│   ├───auth_private.key
│   └───auth_public.key
│
└───ca
│   ├───ca_cert.crt
│   ├───ca.srl
│   └───ca_private.key
│
└───server
│   ├───server_cert.crt
│   ├───server_private.key
│   └───server.csr
│
└───socket
    ├───socket_cert.crt
    ├───socket_private.key
    └───socket.csr
```

## Generación de certificados

Para generar los certificados se ha usado el OpenSSL que viene integrado con Git.

### auth
```
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out auth_public.key
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out auth_private.key
```

### server
```
openssl genpkey -algorithm RSA -out server_private.key -aes256
openssl req -new -key server_private.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server_private.key -out server_cert.crt
```

### socket
```
openssl genpkey -algorithm RSA -out socket_private.key -aes256
openssl req -new -key socket_private.key -out socket.csr
openssl x509 -req -days 365 -in socket.csr -signkey socket_private.key -out socket_cert.crt
```

### Certificate Authority (CA)
```
openssl genpkey -algorithm RSA -out ca_private.key -aes256
openssl req -x509 -new -key ca_private.key -out ca_cert.crt -days 365
```

### Firma como CA
```
openssl genpkey -algorithm RSA -out server_private.key -aes256
openssl req -new -key server_private.key -out server.csr
openssl x509 -req -in server.csr -CA ca_cert.crt -CAkey ca_private.key -CA createserial -out server_cert.crt -days 365
```


# Comandos de package.json

## Análisis de estilo

- `lint`: analiza el estilo del proyecto.
- `lint:fix`: corrige los estilos.

## Servidor

- `ssr`: levanta el servidor HTTPS del archivo https.ts
- `wss`: levanta el servidor WSS del archivo socket.ts

## Compilación

### Compilación individual

- `build:client`: compila el código del lado del cliente.
- `build:server`: compila el código de https.ts.
- `build:socket`: compila el código de socket.ts

### Compilación combinada

- `build`: build:client + build:server + build:socket

### Compilación + ejecución

- `build:ssr`: build:server + ssr
- `build:wss`: build:socket + wss


# Archivo .env

El archivo `.env` tiene configuraciones para el proyecto. Se recomienda cambiar la `PASSPHRASE` para los certificados, un correo en `SENDER_MAIL` y una contraseña de certificación de aplicaciones en `SENDER_PASS`. 

```
# Config
# NODE_TLS_REJECT_UNAUTHORIZED=0    # Se descomenta si Node da error de certificados 
GENERATE_SOURCEMAP=false
NODE_ENV="development"

# Certs
PASSPHRASE=''

# Server
HOST='localhost'
HTTP_PROTOCOL='https'
WS_PROTOCOL='wss'
HTTPS_PORT=3001
WSS_PORT=4001

# Nodemailer
SENDER_MAIL=''
SENDER_PASS=''

# MongoDB > mongodb+srv://<user>:<pass>@<host>/<default_db>?<options>
ATLAS_URI="mongodb+srv://admin:Adivinala1.@clustertfg.prjqmrx.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTFG"
```


# Información adicional
Actualmente el proyecto está alojado en https://github.com/xstianDev/pry_tfg bajo el nombre de pry_tfg, pero en el futuro será archivado y el código se migrará a un repositorio llamado Bloom en una cuenta dedicada a proyectos similares.