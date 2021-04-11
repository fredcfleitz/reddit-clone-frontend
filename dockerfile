FROM node
COPY . /app
WORKDIR /app
RUN npm install
RUN npm install -g serve
CMD REACT_APP_API_URL=$REACT_APP_API_URL npm run build && serve -s build -l 80
