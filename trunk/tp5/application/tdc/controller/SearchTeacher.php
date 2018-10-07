<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 2018/10/5
 * Time: 21:42
 */

use think\Controller;
use think\Request;

class SearchTeacher extends Controller{
    public function GetDefaultTeacherList(){

    }

    public function GetTeacherListByCondition(Request $request){
        $map = $request->param("map");
        $search = $request->param("search");
        $field = $request->param("field");
        $danceType = $request->param("danceType");
        $welfare = $request->param("welfare");
        $other = $request->param("other");

    }

    public function GetTeacherInfo(Request $request){
        $publishId = $request->param("publishId");
    }

    public function Collection(Request $request){
        $publishId = $request->param("publishId");

    }

    public function GetTel(Request $request){
        $publishId = $request->param("publishId");

    }
}