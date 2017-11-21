#!/bin/sh

JQ_PATH=`which jq`
HOST="http://api.pilochki.demostage.ru"

if [ "$JQ_PATH" != "/usr/local/bin/jq" ]; then
    echo "install jq (https://stedolan.github.io/jq/)"
    exit 1
fi

cd src/data

curl -X GET "$HOST/category-service" | jq 'del(.data[].links) | del(.data[].attributes.description)' > categories.json
curl -X GET "$HOST/service" | jq 'del(.data[].links) | del(.data[].attributes.description)' > services.json
