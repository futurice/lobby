#!/bin/sh
export NODE_ENV=production
forever stopall
forever start -c nodejs app.js --prod
