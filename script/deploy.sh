#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# clear and re-create the _site directory
./script/cibuild.sh
./script/citest.sh

#Copy CNAME Across
cp $TRAVIS_BUILD_DIR/CNAME $TRAVIS_BUILD_DIR/_site/

#Deploy to Github gh-pages
cd $TRAVIS_BUILD_DIR/_site
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "somebody@fakeinbox.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the master branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@github.com/$TRAVIS_REPO_SLUG.git" master:master > /dev/null 2>&1
