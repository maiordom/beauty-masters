#!/bin/sh

HOST="http://api.pilochki.demostage.ru"
OUTPUT_DIR="src/data"

command -v jq >/dev/null 2>&1 || { echo "install jq (https://stedolan.github.io/jq/)"; exit 1; }

curl -X GET "$HOST/category-service" | jq 'del(.data[].links) | del(.data[].attributes.description)' > "${OUTPUT_DIR}/categories.json"
curl -X GET "$HOST/service" | jq 'del(.data[].links) | del(.data[].attributes.description)' > "${OUTPUT_DIR}/services.json"
curl -X GET "$HOST/city" | jq 'del(.data[].links) | del(.data[].relationships)' > "${OUTPUT_DIR}/cities.json"
