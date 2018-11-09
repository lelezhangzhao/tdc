<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 10:20
 */

namespace app\tdc\controller;

use app\tdc\api\Status;
use app\tdc\api\Times;

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
        $sql = "select id, title, content, logophoto from tdc_news where status <> 3";
        $result = Db::query($sql);

        if(empty($result)){
            return Status::ReturnErrorStatus("ERROR_STATUS_LISTISNULL");
        }

        return Status::ReturnJsonWithContent("ERROR_STATUS_SUCCESS", "", json_encode($result));
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
        $newsId = $request->param("newsId");
        $sql = "update tdc_news set status = 3 where id = $newsId";
        Db::execute($sql);
        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");
    }

    public function PublishNews(Request $request)
    {
        $systemTime = Times::GetSystemTime();
        $title = $request->param("title");
        $abstract = $request->param("abstract");
        $title_one = $request->param("title_one");
        $title_two = $request->param("title_two");
        $title_three = $request->param("title_three");
        $title_four = $request->param("title_four");
        $content_one = $request->param("content_one");
        $content_two = $request->param("content_two");
        $content_three = $request->param("content_three");
        $content_four = $request->param("content_four");
        $photo_one = $request->param("photo_one");
        $photo_two = $request->param("photo_two");
        $photo_three = $request->param("photo_three");
        $photo_four = $request->param("photo_four");

        $sql = "insert into tdc_news(status, title, content, titleone, contentone, photoone, titletwo, contenttwo, phototwo, titlethree, contentthree, photothree, titlefour, contentfour, photofour, logophoto, publishtime, readtimes) values(0, '" . $title . "', '" . $abstract . "', '" . $title_one . "', '" . $content_one . "', '" . $photo_one. "', '" . $title_two . "', '" . $content_two . "', '" . $photo_two . "', '" . $title_three. "', '" . $content_three . "', '" . $photo_three . "', '" . $title_four . "', '" . $content_four . "', '" . $photo_four . "', '" . $photo_one . "', '" . $systemTime . "', 0)";
        Db::execute($sql);

        return Status::ReturnErrorStatus("ERROR_STATUS_SUCCESS");

    }
}
