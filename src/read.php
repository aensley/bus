<?php

$list = ['data' => []];

foreach ($data as $s => $val) {
  $list['data'][] = ['s' => $s, 'l' => $val['l'], 'c' => $val['c']];
}

echo json_encode($list);
