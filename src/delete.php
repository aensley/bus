<?php

$short = getShort();

// Make sure the short-code was supplied.
if (empty($short)) {
  http_response_code(400);
  echo json_encode(
    ['action' => 'delete', 'status' => 'error', 'message' => 'Insufficient data supplied'],
    JSON_FORCE_OBJECT,
  );
  exit();
}

// Make sure the short-code exists.
if (!array_key_exists($short, $data)) {
  http_response_code(400);
  echo json_encode(
    ['action' => 'delete', 'status' => 'error', 'message' => 'Short URL not found', 'short' => $short],
    JSON_FORCE_OBJECT,
  );
  exit();
}

// All checks complete. Delete the URL.
try {
  unset($data[$short]);
  setData($data);
  echo json_encode(
    ['action' => 'delete', 'status' => 'success', 'message' => 'Short URL deleted', 'short' => $short],
    JSON_FORCE_OBJECT,
  );
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(
    ['action' => 'delete', 'status' => 'error', 'message' => 'Unable to delete Short URL', 'short' => $short],
    JSON_FORCE_OBJECT,
  );
}
