# muso-ninjas

## init firebase cmdline
    firebase logout
    firebase login
    firebase init

## install firebase npm package
    npm i firebase@8.10

## deploy firestoer rules
    firebase deploy --only firestore:rules

## deploy storage rules
    firebase deploy --only storage:rules

## create firestore index
    https://console.firebase.google.com/project/muso-ninjas-409e9/firestore/indexes

## lock down api key refer
    https://console.cloud.google.com/apis/credentials?project=muso-ninjas-409e9

## build and deploy
    npm run build && firebase deploy