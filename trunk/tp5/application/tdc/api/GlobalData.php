<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/18
 * Time: 23:06
 */

namespace app\tdc\api;



class GlobalData{
    static public $maxPublishCount = 10;
    static public $maxCollectionCount = 10;
    static public $maxHistoryCount = 10;
    static public $chatServerHasStarted = false;
    static public $maxUserNumber = 500;

    static public function GetChatServerHasStarted(){
        return self::$chatServerHasStarted;
    }
    static public function SetChatServerHasStarted($hasStarted){
        self::$chatServerHasStarted = $hasStarted;
    }
}