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

    public function SearchUserByKeyWords(Request $request){
        $keyWords = $request->param("keywords");

        if(strlen(trim($keyWords)) == 0){
            return $this->GetDefaultSearch();
        }

        //加入到search中


        $keyWordsArr = explode(" ", $keyWords);
        //以tag/地址/introduction/进行模糊搜索

        $results = [];
        foreach($keyWordsArr as $item){
            $sql = 'select distinct(b.id),b.publishobject,b.evaluateavg,b.tag,b.introduction, b.workaddress, b.detailworkaddress, a.logo,a.name from tdc_user as a right join tdc_publish as b on b.userid = a.id where b.tag like "%' . $item . '%" or b.detailworkaddress like "%' . $item . '%" or b.introduction like "%' . $item . '%" or a.name like "%' . $item . '%" ';
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

    public function SearchByKeyWords(Request $request){
        $keyWords = $request->param("keywords");
        $roleType = $request->param("roletype");

        if(strlen(trim($keyWords)) == 0){
            return $this->GetDefaultSearch();
        }

        //加入到search中


        $keyWordsArr = explode(" ", $keyWords);
        //以tag/地址/introduction/进行模糊搜索

        $results = [];
        foreach($keyWordsArr as $item){
            if($roleType == "0"){
                $sql = 'select a.id,a.publishobject,a.evaluateavg,a.tag,a.introduction, a.workaddress,b.logo,b.name from tdc_publish as a join tdc_user as b on a.userid = b.id where (a.tag like "%' . $item . '%" or a.workaddress like "%' . $item . '%" or a.introduction like "%' . $item . '%" or b.name like "%' . $item . '%") and a.publishobject = 0';
            }else if($roleType == "1"){
                $sql = 'select a.id,a.publishobject,a.evaluateavg,a.tag,a.introduction, a.workaddress,b.logo,b.name from tdc_publish as a join tdc_user as b on a.userid = b.id where (a.tag like "%' . $item . '%" or a.workaddress like "%' . $item . '%" or a.introduction like "%' . $item . '%" or b.name like "%' . $item . '%") and a.publishobject = 1';
            }else{
                $sql = 'select a.id,a.publishobject,a.evaluateavg,a.tag,a.introduction, a.workaddress,b.logo,b.name from tdc_publish as a join tdc_user as b on a.userid = b.id where a.tag like "%' . $item . '%" or a.workaddress like "%' . $item . '%" or a.introduction like "%' . $item . '%" or b.name like "%' . $item . '%"';
            }
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

    private function GetDefaultSearch(){
        //返回evaluateavg为10的项，每次返回20个

        $sql = "select a.id,a.publishobject,a.evaluateavg,a.tag,a.introduction,b.logo,b.name from tdc_publish as a join tdc_user as b on a.userid = b.id where a.evaluateavg = 10 limit 20";

        $result = Db::query($sql);


        if(empty($result)){
            return Status::ReturnJsonWithContent("ERROR_STATUS_LISTISNULL", "列表为空", "");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "获取成功", json_encode($result));

    }
}