<?php

$short = getShort();
$long = getLong();

// Make sure at least the long URL was supplied.
if (empty($long)) {
  http_response_code(400);
  echo json_encode(
    ['action' => 'create', 'status' => 'error', 'message' => 'Insufficient data supplied'],
    JSON_FORCE_OBJECT,
  );
  exit();
}

// Validate long URL input
if (!filter_var($long, FILTER_VALIDATE_URL)) {
  // We weren't given a URL. Fail.
  http_response_code(400);
  echo json_encode(
    ['action' => 'create', 'status' => 'error', 'message' => 'Invalid URL supplied. Correct the URL and try again.'],
    JSON_FORCE_OBJECT,
  );
  exit();
}

$longs = array_column($data, 'l');
$found = array_search($long, $longs);

// Make sure the long URL isn't already shortened.
if ($found !== false) {
  $shorts = array_keys($data);
  echo json_encode(
    [
      'action' => 'create',
      'status' => 'success',
      'message' => 'URL is already shortened',
      'short' => $shorts[$found],
      'long' => $long,
    ],
    JSON_FORCE_OBJECT,
  );
  exit();
}

// Make sure the short URL isn't already taken.
if (!empty($short) && array_key_exists($short, $data)) {
  http_response_code(400);
  echo json_encode(
    [
      'action' => 'create',
      'status' => 'error',
      'message' => 'Short URL already exists',
      'short' => $short,
      'long' => $data[$short]['l'],
    ],
    JSON_FORCE_OBJECT,
  );
  exit();
}

$algo = getHashAlgo();
$shortCodeLength = getShortCodeLength();

// Generate short code
if (empty($short)) {
  $count = 0;
  do {
    $short = substr(hash($algo, $long . $count++), 0, $shortCodeLength);
  } while (array_key_exists($short, $data));
}

// All checks complete. Add the URL.
$data[$short] = ['l' => $long, 'c' => time()];
try {
  setData($data);
  echo json_encode(
    ['action' => 'create', 'status' => 'success', 'message' => 'Short URL added', 'short' => $short, 'long' => $long],
    JSON_FORCE_OBJECT,
  );
} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(
    [
      'action' => 'create',
      'status' => 'error',
      'message' => 'Unable to add Short URL',
      'short' => $short,
      'long' => $long,
    ],
    JSON_FORCE_OBJECT,
  );
}

function getHashAlgo() {
  // Find the most efficient supported hash algorithm
  $hashAlgos = hash_algos();
  $preferredAlgos = ['crc32c', 'crc32', 'crc32b', 'adler32', 'md4', 'md5'];
  foreach ($preferredAlgos as $a) {
    if (in_array($a, $hashAlgos)) {
      return $a;
    }
  }

  return 'sha1';
}
