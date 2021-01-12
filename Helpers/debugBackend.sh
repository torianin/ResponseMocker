#!/bin/bash

# ===========
# = Backend =
# ===========

# Kill previous instance
lsof -i :8080 -sTCP:LISTEN |awk 'NR > 1 {print $2}'|xargs kill -15
# Run ResponseMocker
swift run ResponseMocker migrate
# Run ResponseMocker
swift run ResponseMocker serve --hostname 0.0.0.0 --port 8080
