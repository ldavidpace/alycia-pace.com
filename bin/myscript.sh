#! /bin/bashcd "${0%/*}"

FILE="../src/images/aaImages.ts"

echo "export default [" > $FILE
for d in ../src/images/*/; do
DIR=$(echo $d | cut -d / -f 4)
  echo "  {" >> $FILE
    echo "    name: '"$DIR"'," >> $FILE
    echo "    thumbnail: require( './"$DIR"/Small.JPG')," >> $FILE
    echo "    url: require( './"$DIR"/Big.JPG')," >> $FILE
  echo "  }," >> $FILE
done
echo "];" >> $FILE

read