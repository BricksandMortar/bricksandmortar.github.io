#!/usr/bin/env bash
set -e # halt script on error

# Builds webpack
npm start

# Builds Jekyll in the _site directory
bundle exec jekyll build ./_site
