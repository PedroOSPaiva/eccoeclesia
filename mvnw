#!/usr/bin/env bash
set -euo pipefail

COMMAND=${1:-test}
ROOT_DIR=$(cd "$(dirname "$0")" && pwd)
TARGET_DIR="$ROOT_DIR/target"
MAIN_SOURCES_FILE="$TARGET_DIR/main-sources.txt"
TEST_SOURCES_FILE="$TARGET_DIR/test-sources.txt"
MAIN_CLASSES="$TARGET_DIR/classes"
TEST_CLASSES="$TARGET_DIR/test-classes"
CLASSPATH="$MAIN_CLASSES:$TEST_CLASSES"

compile_main() {
  mkdir -p "$MAIN_CLASSES"
  find "$ROOT_DIR/src/main/java" -name '*.java' > "$MAIN_SOURCES_FILE"
  if [[ -s "$MAIN_SOURCES_FILE" ]]; then
    javac --release 21 -d "$MAIN_CLASSES" @"$MAIN_SOURCES_FILE"
  fi
}

compile_tests() {
  mkdir -p "$TEST_CLASSES"
  find "$ROOT_DIR/src/test/java" -name '*.java' > "$TEST_SOURCES_FILE"
  if [[ -s "$TEST_SOURCES_FILE" ]]; then
    javac --release 21 -cp "$MAIN_CLASSES" -d "$TEST_CLASSES" @"$TEST_SOURCES_FILE"
  fi
}

run_tests() {
  java -cp "$CLASSPATH" com.ecoeclesia.testing.TestRunner
}

run_app() {
  java -cp "$MAIN_CLASSES" com.ecoeclesia.EcoEcclesiaApplication
}

case "$COMMAND" in
  clean)
    rm -rf "$TARGET_DIR"
    ;;
  compile)
    rm -rf "$TARGET_DIR"
    compile_main
    ;;
  test)
    rm -rf "$TARGET_DIR"
    compile_main
    compile_tests
    run_tests
    ;;
  run)
    rm -rf "$TARGET_DIR"
    compile_main
    run_app
    ;;
  *)
    echo "Usage: ./mvnw [clean|compile|test|run]" >&2
    exit 1
    ;;
 esac
