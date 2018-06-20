#!/usr/bin/env bash
set -e # halt script on error

# Builds webpack
npm start

cp src/assets/images/* dist/

# Builds Jekyll in the _site directory
bundle exec jekyll build ./_site
