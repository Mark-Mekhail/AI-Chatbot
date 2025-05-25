#!/usr/bin/env bash
# Script to run tests for the AI Chat application

# Set errexit, nounset, pipefail options for better error handling
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

source "$SCRIPT_DIR/utils.sh"

run_tests() {
  print_message "info" "Running all tests..."
  
  print_message "info" "Running backend tests..."
  cd "$PROJECT_ROOT/backend"
  if ! ./run_tests.sh; then
    print_message "error" "Backend tests failed."
    return 1
  fi
  
  print_message "info" "Running frontend tests..."
  cd "$PROJECT_ROOT/frontend"
  if ! ./run_tests.sh; then
    print_message "error" "Frontend tests failed."
    return 1
  fi
  
  print_message "success" "All tests passed successfully."
  return 0
}

# If script is executed directly, run the tests
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  run_tests
fi
