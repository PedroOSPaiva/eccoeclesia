#!/usr/bin/env sh

# Minimal Maven wrapper forwarding to the system Maven installation.
# This allows executing commands such as `./mvnw test` in environments
# where the full Maven Wrapper distribution is not available.
exec mvn "$@"
