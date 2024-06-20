# Wybierz bazowy obraz Node
FROM node:alpine

# Utwórz katalog roboczy w kontenerze
WORKDIR /usr/src/app

# Zainstaluj bash
RUN apk add --no-cache bash

# Skopiuj i ustaw uprawnienia do skryptu wait-for-it.sh
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod 777 /usr/src/app/wait-for-it.sh

# Kopiuj pliki package.json i package-lock.json (jeśli istnieje)
COPY package*.json ./

# Zainstaluj zależności projektu
RUN npm install

# Kopiuj wszystkie pliki projektu do katalogu roboczego w kontenerze
COPY . .

# Ustaw port, na którym będzie nasłuchiwał serwer
EXPOSE 3001

# Uruchom aplikację używając wait-for-it.sh do sprawdzenia dostępności usługi
CMD ["bash", "-c", "/usr/src/app/wait-for-it.sh mysql:3306 -- node app.js"]
