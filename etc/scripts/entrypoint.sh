#!/bin/bash

npm i --production
npm i -g supervisor

supervisor ./src/index.js
