#!/bin/sh

# Script adapted from https://gist.github.com/danahartweg/72600e0d30ae54290bf4deb197400ee9

echo "$(java -version)"

PWD=$(pwd)
EMULATOR="cloud-firestore-emulator"
EMULATOR_TARGET=$(find "$PWD" -type f -name "$EMULATOR*.jar" | sort -r | head -n1)
EMULATOR_PORT=3000

if [ -z "$EMULATOR_TARGET" ]; then
  echo "Could not find the firestore emulator. Ending test run."
  exit 1
fi

# I've found that the java process is not always killed properly,
# causing issues on subsequent runs... so let's clean things up when we're done (or have errored)
killEmulatorPid()
{
  EMULATOR_PID=$(pgrep -f "$EMULATOR")

  if ! [ -z "$EMULATOR_PID" ]; then
    kill -9 "$EMULATOR_PID"
  fi
}

java -jar "$EMULATOR_TARGET" --host=127.0.0.1 --port=$EMULATOR_PORT > /dev/null 2> firestore-emulator.log &
RETRIES=0
RETRY_LIMIT=10

while [ $RETRIES -lt $RETRY_LIMIT ]; do
  sleep 1
  echo "Pinging firestore emulator"
  echo "$RETRIES of $RETRY_LIMIT"

  if nc -z localhost $EMULATOR_PORT; then
    break
  fi

  let RETRIES+=1

  if [ $RETRIES -ge $RETRY_LIMIT ]; then
    echo "Could not find the firestore emulator. Ending test run."
    killEmulatorPid
    exit 1
  fi
done

# Now run the tests
jest

echo "End of test run. Cleaning up the firestore emulator."
killEmulatorPid
