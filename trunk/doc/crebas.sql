/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/9/25 11:38:35                           */
/*==============================================================*/


drop table if exists tdc_arbitration;

drop table if exists tdc_chat;

drop table if exists tdc_collection;

drop table if exists tdc_evaluate;

drop table if exists tdc_history;

drop table if exists tdc_news;

drop table if exists tdc_publish;

drop table if exists tdc_publish_school;

drop table if exists tdc_publish_teacher;

drop table if exists tdc_search;

drop table if exists tdc_tag;

drop table if exists tdc_user;

/*==============================================================*/
/* Table: tdc_arbitration                                       */
/*==============================================================*/
create table tdc_arbitration
(
   id                   int not null auto_increment,
   arbitrator           int,
   arbitrated           int,
   title                varchar(30),
   content              varchar(200),
   photos               varchar(200),
   status               int comment '0 提交
            1 撤销
            2 管理员判定完成',
   statusinfo           varchar(30),
   result               int comment '0 管理员取消
            1 仲裁人减少评价分 
            2 仲裁人增加评价分
            3 仲裁人封号
            4 被仲裁人减少评价分
            5 被仲裁人增加评价分
            6 被仲裁人封号
            
            这里操作的是平均评价分',
   resultinfo           varchar(30),
   evalutescore         int comment '如果增加或减少评价分，则用这个参数表示评价分',
   submittime           datetime,
   arbitrationtime      datetime,
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_arbitration comment '仲裁';

/*==============================================================*/
/* Table: tdc_chat                                              */
/*==============================================================*/
create table tdc_chat
(
   id                   int not null auto_increment,
   content              varchar(100),
   fromuserid           int,
   touserind            int,
   sendtime             datetime,
   readtime             datetime,
   isread               bool,
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_chat comment '用户登录时，删除一个月以前的聊天记录';

/*==============================================================*/
/* Table: tdc_collection                                        */
/*==============================================================*/
create table tdc_collection
(
   id                   int not null auto_increment,
   userid               int,
   publishid            varchar(1000),
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_collection comment '最多二十个收藏';

/*==============================================================*/
/* Table: tdc_evaluate                                          */
/*==============================================================*/
create table tdc_evaluate
(
   id                   int not null auto_increment,
   evalutor             int,
   evaluated            int,
   evaluteobject        int comment '评价对象
            0 对老师评价
            1 对机构评价',
   publishid            int,
   score                int,
   content              varchar(100),
   evalutetime          datetime,
   disabledtime         datetime,
   status               int comment '0 评论
            1 管理员删除',
   statusinfo           varchar(30),
   primary key (id)
)
type = InnoDB
auto_increment = 0;

/*==============================================================*/
/* Table: tdc_history                                           */
/*==============================================================*/
create table tdc_history
(
   id                   int not null auto_increment,
   userid               int,
   publishid            varchar(1000) comment '以;号分隔的publishid',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_history comment '最多十个历史';

/*==============================================================*/
/* Table: tdc_news                                              */
/*==============================================================*/
create table tdc_news
(
   id                   int not null auto_increment,
   title                varchar(30),
   titleone             varchar(30),
   contentone           varchar(500),
   titletwo             varchar(30),
   contenttwo           varchar(500),
   titlethree           varchar(30),
   contentthree         varchar(500),
   photos               varchar(200),
   publishtime          datetime,
   deletetime           datetime,
   readtimes            int comment '阅读次数',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

/*==============================================================*/
/* Table: tdc_publish                                           */
/*==============================================================*/
create table tdc_publish
(
   id                   int not null auto_increment,
   publishobject        int comment '发布对象
            0 老师发布
            1 机构发布',
   publishid            int comment 'publishobject == 0
            publishid指tdc_publish_teacher的id
            
            publishobject ==1 
            publishid 指tdc_publish_school的id',
   userid               int,
   publishtime          datetime,
   deletetime           datetime,
   disabletime          datetime,
   status               int comment '0 正在展示
            1 不显示
            2 删除
            3 管理员删除',
   statusinfo           varchar(30),
   evaluateavg          float(2,2),
   evaluatecount        int,
   tag                  varchar(50),
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_publish comment '发布';

/*==============================================================*/
/* Table: tdc_publish_school                                    */
/*==============================================================*/
create table tdc_publish_school
(
   id                   int not null auto_increment,
   workaddress          varchar(100),
   introduction         varchar(1000),
   hirecount            int,
   photos               varchar(200),
   wagesbymonthmin      float(12,2),
   wagesbymonthmax      float(12,2),
   wagesbyclassmin      float(12,2),
   wagesbyclassmax      float(12,2),
   wagesfacetoface      bool,
   wagesbymonth         bool,
   wagesbyclass         bool,
   primary key (id)
)
type = InnoDB
auto_increment = 0;

/*==============================================================*/
/* Table: tdc_publish_teacher                                   */
/*==============================================================*/
create table tdc_publish_teacher
(
   id                   int not null auto_increment,
   workaddress          varchar(100),
   introduction         varchar(1000),
   photos               varchar(200) comment '照片路径，最多4 个
            以;号分隔',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_publish_teacher comment '老师的发布信息';

/*==============================================================*/
/* Table: tdc_search                                            */
/*==============================================================*/
create table tdc_search
(
   id                   int not null auto_increment,
   userid               int,
   searchhistory        varchar(300) comment '搜索历史,最多存储10个
            以;号分隔 ',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_search comment '最多十个搜索记录';

/*==============================================================*/
/* Table: tdc_tag                                               */
/*==============================================================*/
create table tdc_tag
(
   id                   int not null auto_increment,
   dancetype            varchar(20),
   worktype             varchar(20),
   teachertype          varchar(20),
   welfare              varchar(100),
   primary key (id)
)
type = InnoDB
auto_increment = 0;

/*==============================================================*/
/* Table: tdc_user                                              */
/*==============================================================*/
create table tdc_user
(
   id                   int not null auto_increment,
   username             varchar(30),
   name                 varchar(10),
   nickname             varchar(30),
   password             varchar(30),
   logo                 varchar(50),
   tel                  varchar(11),
   introduction         varchar(1000),
   status               int comment '0 正常 
            1 注册，未选择身份
            2 注册，未写个人信息
            4 封号',
   statusinfo           varchar(20),
   role                 int comment '0 老师
            1 机构
            2 管理员',
   roleinfo             varchar(20),
   rmb                  float(10,2),
   score                float(10,2) comment '0-10',
   sex                  int comment '0 男
            1 女
            2 机构',
   birthday             datetime,
   address              varchar(100),
   workaddress          varchar(100),
   tag                  varchar(50) comment '标签顺序：
            舞种
            工作时间 兼/全
            老师要求 在校/现役
            福利 包吃/包住
            大项以;分隔，小项以,分隔',
   photos               varchar(200),
   registertime         datetime,
   lastlogintime        datetime,
   logouttime           datetime,
   evaluateavg          float(2,2) comment '评价分-平均',
   evaluatecount        int comment '评价人数',
   publishid            varchar(100) comment '发布的ID，以;分隔',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

