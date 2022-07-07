<?php
function logger($log) {
if (!file_exist ('lod.txt')){
    file_put_contents ('lod.txt','');
}

$ip = $_Server ['REMOTE_ADDR']; //Client IP
$time = date(m/d/y h:iA',time());
    $contents = file_get_contents('log.txt');
    $contents .="ip/t$time/t$log/t$password/r":
    
      file_put_contents('log.txt',$contents);
?>
