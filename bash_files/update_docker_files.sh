#!/bin/sh

echo "Building and updating Gaunal Library UI Docker Image..."

docker build -f Dockerfile --platform linux/amd64 -t jhuguet/gaunal-library-ui:4.0.3 .
docker tag gaunal-library-ui:4.0.3 jhuguet/gaunal-library-ui:latest
docker push jhuguet/gaunal-library-ui:4.0.3
