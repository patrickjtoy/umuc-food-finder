if [ "$NODE_ENV" = "production" ]; then
  pm2 start dist/rest/index.js -i max -s --no-pmx && pm2 logs --raw
elif [ "$DOCKER_DEV_PLATFORM" = "windows" ]; then
  concurrently --kill-others-on-fail "nodemon -L --config nodemon-rest.json" "yarn client:start"
else
  concurrently --kill-others-on-fail "nodemon --config nodemon-rest.json" "yarn client:start"
fi
