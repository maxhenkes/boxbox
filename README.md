### boxBox or box²

POC Diagram to Proxmox App

Uses React-Flow Diagrams to draw server architecture which is then created on a proxmox backend.

How to build and run:
Requirements: Docker and Docker compose, yarn or npm

npm install or yarn install
npm run docker

Wait for it to build.

cd docker

then

docker-compose up

You can now reach the app at localhost:3000

To create the Useraccount Test do the following API call:

localhost:3000/api/user/create?user=Test

Afterwards you are able to login and use all the non Proxmox features.
