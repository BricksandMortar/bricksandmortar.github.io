#!/usr/bin/env bash
set -e # halt script on error

#Builds Jekyll in the _site directory
gulp
bundle exec jekyll build ./_site
