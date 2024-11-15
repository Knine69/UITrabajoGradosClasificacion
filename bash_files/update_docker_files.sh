#!/bin/sh

echo "Building and updating Gaunal Library UI Docker Image..."

docker build -f Dockerfile -t jhuguet/gaunal-library-ui:1.0.0 .
docker tag gaunal-library-ui:1.0.0 jhuguet/gaunal-library-ui:latest
docker push jhuguet/gaunal-library-ui:1.0.0
