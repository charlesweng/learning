docker build . -t cweng/nodejs:latest
            # -p <outside_container>:<inside_container>
docker run -p 8080:8080 cweng/nodejs

