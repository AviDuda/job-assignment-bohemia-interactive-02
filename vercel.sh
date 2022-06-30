#!/bin/bash

# Add [skip ci] to your commit message to skip deployment
#
# borrowed from: https://gist.github.com/gramsco/39776bf72f0f354109dfd8e1971131b2
# inspired by: https://github.com/marketplace/actions/skip-based-on-commit-message
#
# you then have to set up the command that cancels the building : https://vercel.com/knowledge/how-do-i-use-the-ignored-build-step-field-on-vercel
# Vercel's ignored build step needs to call bash first for custom scripts, so put `bash ./vercel.sh` into the ignored build step input.

readonly local last_commit_log=$(git log -1 --pretty=format:"%s")

readonly local filter_skip=$(echo "$last_commit_log" | grep -Fc "[skip ci]" )

if [[ "$filter_skip" -eq 0 ]]; then
    exit 1;

else
    exit 0;
fi
