<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 9:04
 */

namespace app\tdc\controller;

use think\Controller;
use think\Request;

class Find extends Controller{
    public function GetFindList(){

    }

    public function GetFindInfo(Request $request){
        $findId = $request->param("findId");

    }
}