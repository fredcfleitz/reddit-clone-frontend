FROM node
COPY ./build ./build
RUN npm install -g serve
CMD serve -s build -l 80
