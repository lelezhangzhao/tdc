<?php

namespace app\tdc\controller;


use app\tdc\api\Times;
use think\Db;
use think\worker\Server;

class WebSocket extends Server
{
    protected $socket = 'websocket://127.0.0.1:2346';
    static public $connections = array();

    /**
     * 收到信息
     * @param $connection
     * @param $data
     */
    public function onMessage($connection, $data)
    {
        $data_json = json_decode($data);
        $type = $data_json->type;


        switch($type){
            case "login":
                $id = $data_json->id;

//                $connection_pair = array($id => $connection);
                self::$connections[$id] = $connection;
//                array_push(self::$connections, $connection_pair);
                break;
            case "logout":
                $id = $data_json->id;

                foreach(self::$connections as $key => $value){
                    if($key == $id){
                        unset(self::$connections[$key]);
                        return;
                    }
                }
                break;
            case "msg":
                $systemTime = Times::GetSystemTime();
//                $userid = Session::get("userid");
                $userid = $data_json->id;
                $theOtherUserId = $data_json->other_id;

                $content = $data_json->msg;
                $sql = "select * from tdc_chatassist where fromuserid = $userid and touserid = $theOtherUserId";
                $result = Db::query($sql);
                if(empty($result)){
                    //新增记录
                    $sql = "insert into tdc_chatassist(fromuserid, touserid, hasunreadmsg, lastsendtime, briefcontent) values ($userid, $theOtherUserId, true, '$systemTime', '$content')";
                    Db::execute($sql);
                }else{
                    //如果hasunreadmsg为false，置为true
                    if($result[0]["hasunreadmsg"] == false){
                        $sql = "update tdc_chatassist set hasunreadmsg = true where fromuserid = $userid and touserid = $theOtherUserId";
                        Db::execute($sql);
                    }
                }

                //插入chat表
                $sql = "insert into tdc_chat(content, fromuserid, touserid, sendtime, isread) values ('$content', $userid, $theOtherUserId,'" . $systemTime . "', false);";

                Db::execute($sql);

                //other_id有没有在线，如果在线则直接推出去
                foreach(self::$connections as $key => $value){
                    if($key == $theOtherUserId){
                        $response_msg = array("type" => "msg", "other_id" => $userid, "msg" => $content);
                        $value->send(json_encode($response_msg));
                    }
                }


//                return Status::ReturnJson("ERROR_STATUS_SUCCESS", "发送成功");

//                $response_msg = array("text"=>"recv msg");
//                $connection->send(json_encode($response_msg));



                break;
            case "ping":
                $connection->send("pong");
                break;
        }

    }

    /**
     * 当连接建立时触发的回调函数
     * @param $connection
     */
    public function onConnect($connection)
    {
//        array_push(self::$connections, $connection);
    }

    /**
     * 当连接断开时触发的回调函数
     * @param $connection
     */
    public function onClose($connection)
    {
        foreach(self::$connections as $key => $value){
            if($value == $connection){
                unset(self::$connections[$key]);
                return;
            }
        }

//        array_pop(self::$connections);
    }

    /**
     * 当客户端的连接上发生错误时触发
     * @param $connection
     * @param $code
     * @param $msg
     */
    public function onError($connection, $code, $msg)
    {
        echo "error $code $msg\n";
    }

    /**
     * 每个进程启动
     * @param $worker
     */
    public function onWorkerStart($worker)
    {

    }
}
