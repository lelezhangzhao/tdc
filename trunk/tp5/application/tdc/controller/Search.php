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
        foreach($keyWordsArr as $item){
            $sql = 'select * from tdc_publish where tag like "%' . $item . '%" or workaddress like "%' . $item . '%" or introduction like "%' . $item . '%"';
            $result = Db::query($sql);

            if(!empty($result)){
                foreach($result as $resultItem){
                    array_push($results, $resultItem);
                }
            }
        }

        if(empty($results)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($results));
    }

    public function GetInitializeSearch(){
        //获取搜索历史、热点
        $userid = Session::get("userid");
        $sql_search_history = "select * from tdc_search where userid = $userid";
        $result_search_history = Db::query($sql_search_history);

        $sql_search_hot = "select * from tdc_hot order by count desc limit 10";
        $result_search_hot = Db::query($sql_search_hot);

        $result = array("history" => $result_search_history, "hot" => $result_search_hot);
        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }
}