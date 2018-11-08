<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 10:20
 */

namespace app\tdc\controller;

use app\tdc\api\Status;

use think\Controller;
use think\Request;
use think\Db;

class Admin extends Controller
{
    public function GetUserInfoByPublishId(Request $request)
    {
        $publishId = $request->param("publishId");
        $sql = "select userid, publishobject from tdc_publish where id = $publishId";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_content($result));
    }

    public function FreezenUser(Request $request)
    {
        $userid = $request->param("userid");
        $sql = "update tdc_user set status = 4 where id = $userid";
        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function ActiveUser(Request $request)
    {
        $userid = $request->param("userid");
        $sql = "update tdc_user set status = 0 where id = $userid";
        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function GetArbitrationList()
    {
        $sql = "select id, title, content from tdc_arbitration where status = 0";
        $result = Db::query($sql);

        if(empty($result)){

            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
    }

    public function GetArbitrationInfo(Request $request){

        $arbitrationId = $request->param("arbitrationId");

        $sql = "select a.title, a.content, b.name as arbitratorname, b.tel as arbitratortel, c.tel as arbitratortel from tdc_arbitration as a join tdc_user as b on a.arbitratorid = b.id join tdc_user as c on a.arbitratorid = c.id where a.id = $arbitrationId";
        $result = Db::query($sql);

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));

    }
    public function GetNewsList()
    {

    }

    public function SolveArbitration(Request $request){
        $arbitrationId = $request->param("arbitrationId");
        $checked = $request->param("checked");

        $status = $checked == "true" ? 2 : 0;

        $sql = "update tdc_arbitration set status = $status where id = $arbitrationId";
        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function DeleteNews(Request $request)
    {
    }

    public function PublishNews(Request $request)
    {
    }
}
