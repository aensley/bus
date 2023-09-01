<?php

ini_set('zlib.output_compression', 'On');
ini_set('zlib.output_compression_level', 9);

const ENV_JSON = __DIR__ . '/.env.json';
const DATA_JSON = __DIR__ . '/.data.json';
const NO_ENV_HTML = __DIR__ . '/no-env.html';
const NO_DATA_HTML = __DIR__ . '/no-data.html';
const PUBLIC_HTML = __DIR__ . '/public.html';
const DASH_HTML = __DIR__ . '/dash.html';
const DEFAULT_SHORT_CODE_LENGTH = 4;
const REDIRECT_STATUS = 301; // Moved Permanently

date_default_timezone_set('UTC');

function getRequestedUrl() {
  return trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
}

function getEnvJson() {
  if (!file_exists(ENV_JSON)) {
    http_response_code(500);
    readfile(NO_ENV_HTML);
    exit();
  }

  return json_decode(file_get_contents(ENV_JSON), true);
}

function getShortCodeLength() {
  $env = getEnvJson();
  return !empty($env['short-code-length']) ? $env['short-code-length'] : DEFAULT_SHORT_CODE_LENGTH;
}

function getData() {
  if (!file_exists(DATA_JSON) || !is_writable(DATA_JSON)) {
    http_response_code(500);
    readfile(NO_DATA_HTML);
    exit();
  }

  return json_decode(file_get_contents(DATA_JSON), true);
}

function setData($data) {
  file_put_contents(DATA_JSON, json_encode($data, JSON_FORCE_OBJECT));
}
