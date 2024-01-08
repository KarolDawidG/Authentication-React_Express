# Wybierz bazowy obraz Node.js
FROM node:alpine

# Ustaw katalog roboczy wewnątrz obrazu
WORKDIR /app

# Skopiuj pliki zależności projektu
COPY package.json package-lock.json* ./

# Zainstaluj zależności projektu
RUN npm install

# Skopiuj pozostałe pliki projektu
COPY . .

# Kompiluj aplikację TypeScript do JavaScript
RUN npm run build

# Ustaw zmienną środowiskową na produkcję
ENV NODE_ENV production

# Ustaw port, na którym będzie działać aplikacja
EXPOSE 4000

# Uruchom serwer produkcyjny
CMD ["npx", "serve", "-s", "build", "-l", "4000"]
