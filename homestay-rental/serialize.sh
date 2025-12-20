#!/bin/bash

OUTPUT_FILE="serialized_files.json"
> "$OUTPUT_FILE"

serialize_file() {
    local file="$1"
    local target_path="/testbed/homestay-rental/$file"
    
    if [ -f "$file" ]; then
        echo "$target_path" >> "$OUTPUT_FILE"
        
        # Read file content and escape it for JSON
        python3 -c "
import json
import sys
with open('$file', 'r', encoding='utf-8') as f:
    content = f.read()
obj = {'content': content, 'file_path': '$target_path'}
print(json.dumps(obj, ensure_ascii=False))
" >> "$OUTPUT_FILE"
        
        echo "" >> "$OUTPUT_FILE"
    fi
}

serialize_file "index.html"
serialize_file "src/App.vue"
serialize_file "src/main.js"
serialize_file "src/style.css"
serialize_file "src/router/index.js"
serialize_file "src/data/rooms.js"
serialize_file "src/components/Navbar.vue"
serialize_file "src/components/SearchBar.vue"
serialize_file "src/components/RoomCard.vue"
serialize_file "src/components/Footer.vue"
serialize_file "src/views/Home.vue"
serialize_file "src/views/RoomDetail.vue"
serialize_file "src/views/Search.vue"

echo "Serialization complete! File saved to: $OUTPUT_FILE"
