#!/bin/bash
mongo <<EOF_MONGO
use $MONGO_DATABASE_NAME
EOF_MONGO
