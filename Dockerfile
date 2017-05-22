FROM ubuntu:14.04
MAINTAINER Kimmo Ahokas <kimmo.ahokas@futurice.com>

# Configure apt to automatically select mirror
RUN echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty main restricted universe\n\
deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-updates main restricted universe\n\
deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-security main restricted universe" > /etc/apt/sources.list

# Install packages
RUN apt-get update && apt-get install -y \
    git \
    mongodb \
    nodejs \
    npm \
    supervisor

# Hack to make npm and other nodejs stuff to work properly
RUN ln -s /usr/bin/nodejs /usr/bin/node

# Set timezone to Europe/Helsinki
RUN echo 'Europe/Helsinki' > /etc/timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Helsinki /etc/localtime

# Set the locale
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

COPY ./docker/supervisord.conf /etc/supervisor/supervisord.conf

# Run the node app as user "lobby"
RUN useradd -m -s /bin/bash lobby
RUN mkdir /opt/lobby
RUN chown -R lobby:lobby /opt/lobby
WORKDIR /opt/lobby

# install global dependencies
RUN npm install -g bower sails@0.10.3 grunt-cli

# Change user to lobby and install rest
USER lobby
ENV NPM_ENV=production
COPY package.json bower.json Gruntfile.js .bowerrc .sailsrc /opt/lobby/
RUN npm install

# Copy the project files
COPY . /opt/lobby

USER root
RUN chown -R lobby:lobby /opt/lobby

EXPOSE 8080

# Default startup command
# Note: supervisord will pass all environment variables to processes

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
