<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/8
 * Time: 22:07
 */

namespace app\tdc\controller;

use think\Controller;
use think\Request;


class PublishTeacherInfo extends Controller{
    public function GetPublishTeacherInfo(Request $request){
        $publishId = $request->param("publishId");

        $sql = 'select * from '
    }


}