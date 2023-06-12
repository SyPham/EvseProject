#!/bin/bash

# Color
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

# Global variables
ROOT=$PWD
PUBLISH="$ROOT/publish"

# Build apps
CURRENT=0
evse_api=('Evse')
APPS=(evse_api)
ARR=(APPS)

declare -n ELEMENT APP

for ELEMENT in "${ARR[@]}"; do
    echo -e "${YELLOW}===== ALL BUILDING =====${NC}"
    for APP in "${ELEMENT[@]}"; do
        ((CURRENT=CURRENT+1))
        TARGET="${!APP}"
        echo -e "${GREEN}***** BUILDING $(echo $TARGET | tr '[:lower:]' '[:upper:]') APPLICATION #$CURRENT *****${NC}"

        SRC_DIR="$ROOT/${APP[0]}"
        if [ -d "$SRC_DIR" ]; then
            cd "$SRC_DIR"
            dotnet publish -c Release -o "$PUBLISH/$TARGET"        
            cd $ROOT
        fi
    done
    echo -e "${YELLOW}===== ALL COMPLETED =====${NC}"
done