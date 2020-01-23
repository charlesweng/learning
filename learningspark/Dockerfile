FROM ubuntu:disco
RUN apt-get update -y
RUN apt-get install vim -y
RUN apt-get install git -y
RUN mkdir /home/sparkuser
WORKDIR /home/sparkuser
RUN git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
COPY .vimrc ~/.vimrc

