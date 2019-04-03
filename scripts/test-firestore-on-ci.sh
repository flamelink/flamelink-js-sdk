#!/bin/sh

# Script adapted from https://gist.github.com/danahartweg/72600e0d30ae54290bf4deb197400ee9

EMULATOR="cloud-firestore-emulator"
EMULATOR_TARGET=$(find ~/.cache/firebase/emulators/ -type f -name "$EMULATOR*.jar" | sort -r | head -n1)

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

java -jar "$EMULATOR_TARGET" --host=127.0.0.1 --port=8080 > /dev/null 2> firestore-emulator.log &
RETRIES=0
RETRY_LIMIT=10

while [ $RETRIES -lt $RETRY_LIMIT ]; do
  sleep 1
  echo "Pinging firestore emulator"

  if nc -z localhost 8080; then
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
