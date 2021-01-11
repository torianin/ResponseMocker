#!/bin/bash

# ============
# = Frontend =
# ============

# Install dependencies
npm install --prefix ./Front/
# Remove previously generatedw js files
rm ./Resources/Views/*.js*
# Build app using Parcel
npm run dist --prefix ./Front/

# ===========
# = Backend =
# ===========

# Build Vapor project
swift build -c release
# Migrate database
.build/release/ResponseMocker migrate
# Run ResponseMocker
.build/release/ResponseMocker serve --hostname 0.0.0.0 --port 8080
