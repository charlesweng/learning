# Use an existing docker image as a base
FROM ubuntu:18.04

# Download and install a dependency
RUN apt-get update && apt-get install -y apt-transport-https curl gnupg gnupg1 gnupg2
RUN curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
RUN echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" >> /etc/apt/sources.list.d/kubernetes.list

# Kubernetes dependencies
RUN apt-get update
RUN apt-get install kubelet kubeadm kubectl -y
