#!/bin/bash

# Loop over all .mid files in subdirectories
for mid_file in $(find . -type f -name "*.mid"); do
    # Replace the following line with the command you want to run
    new_filename="${mid_file%.mid}.mp3"
    echo "Processing: $new_filename"

    ./create_mp3.sh $mid_file $new_filename
    # example_command "$mid_file"
done
