# Wybierz bazowy obraz Node
FROM node:alpine

# Utwórz katalog roboczy w kontenerze
WORKDIR /usr/src/app

# Kopiuj pliki package.json i package-lock.json (jeśli istnieje)
COPY package*.json ./

# Zainstaluj zależności projektu
RUN npm install

# Kopiuj wszystkie pliki projektu do katalogu roboczego w kontenerze
COPY . .

# Ustaw port, na którym będzie nasłuchiwał serwer
EXPOSE 3001

# Uruchom aplikację
CMD ["node", "app.js"]
