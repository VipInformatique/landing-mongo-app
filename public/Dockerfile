# 1. Bazowy obraz Node.js
FROM node:18-alpine

# 2. Ustaw katalog roboczy
WORKDIR /app

# 3. Skopiuj pliki package.json i package-lock.json
COPY package*.json ./

# 4. Zainstaluj zależności
RUN npm install

# 5. Skopiuj resztę kodu
COPY . .

# 6. Otwórz port 3000 (dla aplikacji Node.js)
EXPOSE 3000

# 7. Uruchom aplikację
CMD ["node", "server.js"]