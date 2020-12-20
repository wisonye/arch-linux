#!/bin/bash

KILL_RESULT=$(killall -v screenkey 2>&1)
PROCESS_NOT_FOUND_STR="no process found"
echo "KILL_RESULT: $KILL_RESULT"

if [[ $KILL_RESULT == *"$PROCESS_NOT_FOUND_STR"* ]]; then
    echo "'screenkey' started."
    screenkey --no-systray --timeout 1 \
            --opacity 0.5 \
            --no-whitespace \
            --font "So urce Code Pro" \
            --font-size medium \
            --font-color "#FBFBF1F1C7C7" \
            --bg-color "#1C1C1C1C1C1C" &
else
    echo "Killed all 'screenkey'"
fi
