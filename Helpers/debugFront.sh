#!/bin/bash

# ============
# = Frontend =
# ============

# Install dependencies
npm install --prefix ../Front/
# Kill previous instance
lsof -i :8081 -sTCP:LISTEN |awk 'NR > 1 {print $2}'|xargs kill -15
# Build app using Parcel
npm run dev --prefix ../Front/