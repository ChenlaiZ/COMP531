#!/bin/bash
PORT=3000


echo "POST /register"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/register -d "{ \"username\":\"chenlai\", \"password\":\"123\" }"
echo ""

echo "POST /login"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/login -d "{ \"username\":\"chenlai\", \"password\":\"123\" }" -i
echo ""

echo "POST /login"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/login -d "{ \"username\":\"chenlai\", \"password\":\"1243\" }" -i
echo ""