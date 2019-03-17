# Use an existing docker image as a base
FROM ubuntu:18.04

# Download and install a dependency
RUN apt-get update

# Redis dependencies
RUN apt-get install redis -y && \
    apt-get install redis-tools -y
    
RUN apt-get install gcc -y

# Editor
RUN apt-get install vim -y

# Tell the image what to do when it starts
# as a container
CMD ["redis-server"]
