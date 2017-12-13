#!/usr/bin/env bash

SWAGGER_CODEGEN="swagger-codegen.jar"
SWAGGER_CODEGEN_SNAPSHOTS="https://oss.sonatype.org/content/repositories/snapshots/io/swagger/swagger-codegen-cli/2.3.0-SNAPSHOT/"

dir=$(dirname "$0")

[ -f "$dir/$SWAGGER_CODEGEN" ] || curl -fL "$SWAGGER_CODEGEN_SNAPSHOTS/swagger-codegen-cli-$(curl "$SWAGGER_CODEGEN_SNAPSHOTS/maven-metadata.xml" | xsltproc "$dir/swagger-codegen-snapshot.xslt" -).jar" -o "$dir/$SWAGGER_CODEGEN"

java -jar $SWAGGER_CODEGEN generate -i https://atiw-sportfest.github.io/backend/swagger.json -l typescript-angular -o api-client
