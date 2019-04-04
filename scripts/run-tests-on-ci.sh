#!/bin/sh

# Script adapted from https://gist.github.com/danahartweg/72600e0d30ae54290bf4deb197400ee9

############################
# CLOUD FIRESTORE EMULATOR #
############################
CF_EMULATOR="cloud-firestore-emulator"
CF_EMULATOR_TARGET=$(find ~/.cache/firebase/emulators/ -type f -name "$CF_EMULATOR*.jar" | sort -r | head -n1)
CF_EMULATOR_PORT=8080

if [ -z "$CF_EMULATOR_TARGET" ]; then
  echo "Could not find the firestore emulator. Ending test run."
  exit 1
fi

# I've found that the java process is not always killed properly,
# causing issues on subsequent runs... so let's clean things up when we're done (or have errored)
killFirestoreEmulatorPid()
{
  CF_EMULATOR_PID=$(pgrep -f "$CF_EMULATOR")

  if ! [ -z "$CF_EMULATOR_PID" ]; then
    kill -9 "$CF_EMULATOR_PID"
  fi
}

java -jar "$CF_EMULATOR_TARGET" --host=127.0.0.1 --port=$CF_EMULATOR_PORT > /dev/null 2> firestore-emulator.log &
CF_RETRIES=0
CF_RETRY_LIMIT=10

while [ $CF_RETRIES -lt $CF_RETRY_LIMIT ]; do
  sleep 1
  echo "Pinging firestore emulator"

  if nc -z localhost $CF_EMULATOR_PORT; then
    break
  fi

  let CF_RETRIES+=1

  if [ $CF_RETRIES -ge $CF_RETRY_LIMIT ]; then
    echo "Could not find the firestore emulator. Ending test run."
    killFirestoreEmulatorPid
    exit 1
  fi
done


##############################
# REALTIME DATABASE EMULATOR #
##############################
RTDB_EMULATOR="firebase-database-emulator"
RTDB_EMULATOR_TARGET=$(find ~/.cache/firebase/emulators -type f -name "$RTDB_EMULATOR*.jar" | sort -r | head -n1)
RTDB_EMULATOR_PORT=9000

echo "$RTDB_EMULATOR_TARGET"

if [ -z "$RTDB_EMULATOR_TARGET" ]; then
  echo "Could not find the database emulator. Ending test run."
  exit 1
fi

# I've found that the java process is not always killed properly,
# causing issues on subsequent runs... so let's clean things up when we're done (or have errored)
killDatabaseEmulatorPid()
{
  RTDB_EMULATOR_PID=$(pgrep -f "$RTDB_EMULATOR")

  if ! [ -z "$RTDB_EMULATOR_PID" ]; then
    kill -9 "$RTDB_EMULATOR_PID"
  fi
}

java -jar "$RTDB_EMULATOR_TARGET" > /dev/null 2> database-emulator.log &
RTDB_RETRIES=0
RTDB_RETRY_LIMIT=10

while [ $RTDB_RETRIES -lt $RTDB_RETRY_LIMIT ]; do
  sleep 1
  echo "Pinging database emulator"

  if nc -z localhost $RTDB_EMULATOR_PORT; then
    break
  fi

  let RTDB_RETRIES+=1

  if [ $RTDB_RETRIES -ge $RTDB_RETRY_LIMIT ]; then
    echo "Could not find the database emulator. Ending test run."
    killDatabaseEmulatorPid
    exit 1
  fi
done


#####################
# RUN ALL THE TESTS #
#####################
jest


########################
# CLEAN UP AFTER TESTS #
########################
echo "End of test run. Cleaning up the emulators."
killFirestoreEmulatorPid
killDatabaseEmulatorPid
