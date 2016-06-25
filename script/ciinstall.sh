#!/usr/bin/env bash
set -e # halt script on error

nvm install 0.10
npm install
bower install
bundle install
