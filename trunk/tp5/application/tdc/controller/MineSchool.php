<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/6
 * Time: 9:24
 */

namespace app\tdc\controller;

use think\Controller;
use think\Request;
use think\Session;


class MineSchool extends Controller{
    public function GetPublishList(){

    }

    public function GetPublishInfo(Request $request){
        $publishId = $request->param("puoblishId");


    }

    public function FixPublishStatus(Request $request){
        $delete = $request->param("delete");
        $display = $request->param("display");


    }


    public function GetCollectionList(){

    }

    public function DeleteCollection(Request $request){
        $collectionId = $request->param("collectionId");
    }


    public function GetFooterList(){

    }

    public function DeleteFooter(Request $request){
        $footerId = $request->param("footerId");
    }

    public function PublishSchoolInfo(Request $request){

    }

    public function EditSchoolTag(Request $request){

    }

    public function FixSchoolLogo(Request $request){

    }

    public function FixSchoolCaption(Request $request){

    }

    public function FixSchoolTel(Request $request){

    }

    public function FixSchoolAddress(Request $request){

    }

    public function Arbitration(Request $request){

    }

    public function Logout(){

    }
}