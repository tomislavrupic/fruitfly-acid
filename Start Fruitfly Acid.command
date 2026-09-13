#!/bin/zsh
cd "${0:A:h}" || exit 1
print 'Fruitfly Acid: open http://127.0.0.1:8787 in your browser. Control-C stops the server.'
python3 -m http.server 8787 --bind 127.0.0.1
