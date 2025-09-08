
#Install dependencies
RUN npm ci

#Copy the rest of the source code
COPY . .

#Build angular app
RUN npm run build --configuration=production

#Stage 2 Serve app with nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]