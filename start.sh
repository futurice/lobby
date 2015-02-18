#!/bin/sh

export NODE_ENV=production
cd /usr/lobby/
/usr/local/bin/forever start -c /usr/bin/nodejs app.js --prod
