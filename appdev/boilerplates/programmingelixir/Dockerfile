from ubuntu:disco

RUN apt-get update -y
RUN DEBIAN_FRONTEND=noninteractive apt-get install tzdata -y
RUN apt-get install \
      gcc-8-base gcc-9-base libgcc1 libstdc++6 libsystemd0 libudev1 perl-base -y
RUN apt-get install erlang -y
RUN apt-get install elixir -y


