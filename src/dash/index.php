<?php

require '../config.php';

$env = getEnvJson();
$data = getData();

function getShort() {
  return !empty($_POST['s']) ? preg_replace('/[^a-z0-9-]/i', '', $_POST['s']) : '';
}

function getLong() {
  return filter_var($_POST['l'], FILTER_SANITIZE_URL);
}

$url = getRequestedUrl();

// Operations
switch ($url) {
  case 'create':
    require '../create.php';
    exit();
    break;
  case 'delete':
    require '../delete.php';
    exit();
    break;
  case 'read':
    require '../read.php';
    exit();
    break;
  case 'update':
    require '../update.php';
    exit();
    break;
  default:
    // Index
    readfile(DASH_HTML);
    break;
}
