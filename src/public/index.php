<?php

require '../config.php';

// Config
$env = getEnvJson();
$data = getData();
$url = getRequestedUrl();

// Redirect
if (strlen($url) > 0 && isset($data[$url])) {
  http_response_code(REDIRECT_STATUS);
  header('Location: ' . $data[$url]['l']);
  exit();
}

// Index
readfile(PUBLIC_HTML);
