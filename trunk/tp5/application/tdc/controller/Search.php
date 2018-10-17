<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/17
 * Time: 10:35
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use think\Controller;
use think\Request;
use think\Db;
use think\Session;

class Search extends Controller{
    public function GetDefaultTagList(){
        $sql = "select * from tdc_tag";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function GetMyRegion(){
        $userid = Session::get("userid");

        $sql = "select address from tdc_user where id = $userid";

        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function SearchByKeyWords(Request $request){
        $keyWords = $request->param("keywords");
        $keyWordsArr = explode(" ", $keyWords);
        //以tag/地址/introduction/进行模糊搜索

        $results = [];
        foreach($keyWordsArr as $keyWords){
            $sql = "select * from tdc_publish where tag like %$keyWords% or workaddress like %$keyWords% or introduction like %$keyWords%";
            $result = Db::query($sql);
            if(!empty($result)){
                $result = json_encode($result);
                $result = $result.substr($result, 1, strlen($result) - 2);
                $result = json_decode($result);
                array_push($results, $result);
            }
        }

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

}