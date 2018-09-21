<?php
namespace app\index\controller;

use think\Controller;
use think\Request;

class Index extends Controller{
    public function index(Request $request){

        $username = $request->param("username");
        $password = $request->param("password");

        return "useranme" . $username . " " . "password" . $password;
        
    }
    
    public function getHighEvalList(){
        return "ok";
    }
}
