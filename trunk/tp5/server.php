<?php

use Workerman\Worker;

require_once __DIR__ . '/extend/Workerman/Autoloader.php';

use \Workerman\Lib\Timer;

// 创建一个Worker监听2000端口，使用websocket协议通讯
$ws_worker = new Worker("websocket://0.0.0.0:2000");

// 进程数设置为1，采用单进程
$ws_worker->count = 1;

// 保存uid到connection的映射(uid是用户id或者客户端唯一标识)
$ws_worker->uidConnections = [];

// 设置心跳时间 0 代表服务器主动保活
define('HEARTBEAT_TIME', 10);

// 进程启动后设置一个每秒运行一次的定时器
$ws_worker->onWorkerStart = function ($worker) {
    // 这里使用一个定时器，间隔时间为1s
    Timer::add(12, function () use ($worker) {

        $time_now = time();

        foreach ($worker->connections as $connection) {
            // 有可能该connection还没收到过消息，则lastMessageTime设置为当前时间
            if (empty($connection->lastMessageTime)) {
                $connection->lastMessageTime = $time_now;
                continue;
            }

            // 上次通讯时间间隔大于心跳间隔，则认为客户端已经下线，关闭连接
            if (HEARTBEAT_TIME > 0 && $time_now - $connection->lastMessageTime > HEARTBEAT_TIME) {
                $connection->close("Network connection timeout!");
            }

            // 如果心跳间隔设置为0的话，可以服务端主动发送ping
            if (HEARTBEAT_TIME == 0) {
                $connection->send('ping');
            }

        }
    });
};


$ws_worker->onMessage = function ($connection, $data) {
    global $ws_worker;
    // 假设消息格式为
    // uid:message 时是对 uid 发送 message
    // uid 为 all 时是全局广播
    list($recv_uid, $message) = explode(':', $data);
    $ws_worker->uidConnections[$recv_uid] = $connection;

    // 给connection临时设置一个lastMessageTime属性，用来记录上次收到消息的时间
    $connection->lastMessageTime = time();

    // 全局广播
    if ($recv_uid == 'all') {
        broadcast($message);
    } // 给特定uid发送
    else {

        // 可以向执行的uid发送消息
        sendMessageByUid($recv_uid, $message);
    }

};

/**
 * 直接将消息发送给用户推送数据
 * @param $message
 */
function broadcast($message)
{
    global $ws_worker;
    foreach ($ws_worker->uidConnections as $connection) {
        $connection->send($message);
    }
}

/**
 * 针对uid推送数据
 * @param $uid
 * @param $message
 */
function sendMessageByUid($uid, $message)
{
    global $ws_worker;

    // 这里可以自定义自己的逻辑业务
    if (isset($ws_worker->uidConnections[$uid]) && $uid) {
        $ws_worker->uidConnections[$uid]->send($message);
    }
}

// 运行worker
Worker::runAll();