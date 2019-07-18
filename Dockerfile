FROM node:10-stretch-slim

# Let's update and install the things.
# Run apt-get quietly (-qq) and say yes to prompts (-y)
# See best practices for apt-get in Docker at https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run
# Note: we install Imagemagick in our base image so we can keep it updated in one place, and so we can add a strict security policy by default (see further down)
RUN apt-get update -qq \
    && apt-get upgrade -y \
    && apt-get install -y build-essential imagemagick \
    && apt-get upgrade -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV SERVICE_ROOT /service
ENV SERVICE_USER service

# Create our service group and user, and set the directory where we'll work from going forward
RUN groupadd $SERVICE_USER && useradd --create-home --home $SERVICE_ROOT --gid $SERVICE_USER --shell /bin/bash $SERVICE_USER
WORKDIR $SERVICE_ROOT

# Remove the 'node' user. It's available by default but we don't need it.
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
RUN userdel -r node

# Make the wait-for-it script available to all projects.
# This is sometimes used by projects to make sure that supporting containers are up before the app starts.
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod a+rx /wait-for-it.sh

# Install the latest version of npm (which apparently the node base image doesn't necessarily provide)
# At the time of writing this gives us npm 6.7.0. It won't change much since Node 8 is LTS. (EOL in December 2019)
RUN npm install npm -g

# Make node-gyp globally available (used for compiling native modules for Node.js)
# https://github.com/nodejs/node-gyp
RUN yarn global add node-gyp

## Service
USER $SERVICE_USER

COPY --chown=service:service package.json yarn.lock $SERVICE_ROOT/
RUN yarn install --pure-lockfile && yarn cache clean

COPY --chown=service:service . $SERVICE_ROOT/
ENV PATH $PATH:$SERVICE_ROOT/node_modules/.bin

RUN yarn run build

EXPOSE 3000
CMD yarn start
