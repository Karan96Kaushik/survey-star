mid_name=$1
out_name=$2

if [ -f "$mid_name" ]; then
    echo "File '$mid_name' exists."
else
    echo "File '$mid_name' does not exist."
    exit 1
fi

if [ -f "$out_name" ]; then
    echo "File '$out_name' exists."
    exit 1
else
    echo "File '$out_name' does not exist."
fi

echo Converting $mid_name to $out_name

timidity $mid_name -Ow -o - | ffmpeg -i - -acodec libmp3lame -ab 64k $out_name 
# && open $out_name

rm $mid_name