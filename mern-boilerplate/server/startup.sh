npm run build
docker build . -t companion
docker rm companion
docker run -it --name companion -p 3000:3000 companion:latest
