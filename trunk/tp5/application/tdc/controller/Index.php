<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/9/27
 * Time: 11:26
 */

namespace app\tdc\controller;

use app\tdc\api\Status;

use think\Controller;
use think\Request;
use think\Db;


class Index extends Controller{
    public function GetHighEvalList(Request $request){

        //返回evaluateavg为10的项，每次返回20个
        $begin = $request->param("begin");



        $sql = 'select id,publishobject,evaluateavg, tag, introduction from (
(select a.id,a.publishobject,a.evaluateavg,a.tag,b.introduction from tdc_publish as a left join tdc_publish_teacher as b on a.publishid = b.id where a.evaluateavg = 10 and a.publishobject = 0)
 union
 (select a.id,a.publishobject,a.evaluateavg,a.tag,b.introduction from tdc_publish as a left join tdc_publish_school as b on a.publishid = b.id where a.evaluateavg = 10 and a.publishobject = 1)) as c
limit 20 offset '.$begin;

        $result = Db::query($sql);


        if(empty($result)){
            return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "高评用户列表为空", "");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));

    }


    public function GetPublishInfo(Request $request){

    }

}