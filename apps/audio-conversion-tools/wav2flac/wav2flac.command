#!/bin/bash
# PURPOSE:  FFMPEG Audio Conversion Script (aiff -> flac)

echo "-------------------------|" $TITLE "|"

cd "$(dirname "$BASH_SOURCE")" ||
{
    echo "Error getting script directory" >&2
    exit 1
}

# VARS ###########################################################
TITLE='FFMPEG Audio Conversion Script'

for f in *.wav; do 
	ffmpeg -i "$f" -c:a flac "${f%.wav}.flac"; 
done