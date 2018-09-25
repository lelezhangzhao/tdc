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
   status               int comment '0 �ύ
            1 ����
            2 ����Ա�ж����',
   statusinfo           varchar(30),
   result               int comment '0 ����Աȡ��
            1 �ٲ��˼������۷� 
            2 �ٲ����������۷�
            3 �ٲ��˷��
            4 ���ٲ��˼������۷�
            5 ���ٲ����������۷�
            6 ���ٲ��˷��
            
            �����������ƽ�����۷�',
   resultinfo           varchar(30),
   evalutescore         int comment '������ӻ�������۷֣��������������ʾ���۷�',
   submittime           datetime,
   arbitrationtime      datetime,
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_arbitration comment '�ٲ�';

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

alter table tdc_chat comment '�û���¼ʱ��ɾ��һ������ǰ�������¼';

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

alter table tdc_collection comment '����ʮ���ղ�';

/*==============================================================*/
/* Table: tdc_evaluate                                          */
/*==============================================================*/
create table tdc_evaluate
(
   id                   int not null auto_increment,
   evalutor             int,
   evaluated            int,
   evaluteobject        int comment '���۶���
            0 ����ʦ����
            1 �Ի�������',
   publishid            int,
   score                int,
   content              varchar(100),
   evalutetime          datetime,
   disabledtime         datetime,
   status               int comment '0 ����
            1 ����Աɾ��',
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
   publishid            varchar(1000) comment '��;�ŷָ���publishid',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_history comment '���ʮ����ʷ';

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
   readtimes            int comment '�Ķ�����',
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
   publishobject        int comment '��������
            0 ��ʦ����
            1 ��������',
   publishid            int comment 'publishobject == 0
            publishidָtdc_publish_teacher��id
            
            publishobject ==1 
            publishid ָtdc_publish_school��id',
   userid               int,
   publishtime          datetime,
   deletetime           datetime,
   disabletime          datetime,
   status               int comment '0 ����չʾ
            1 ����ʾ
            2 ɾ��
            3 ����Աɾ��',
   statusinfo           varchar(30),
   evaluateavg          float(2,2),
   evaluatecount        int,
   tag                  varchar(50),
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_publish comment '����';

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
   photos               varchar(200) comment '��Ƭ·�������4 ��
            ��;�ŷָ�',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_publish_teacher comment '��ʦ�ķ�����Ϣ';

/*==============================================================*/
/* Table: tdc_search                                            */
/*==============================================================*/
create table tdc_search
(
   id                   int not null auto_increment,
   userid               int,
   searchhistory        varchar(300) comment '������ʷ,���洢10��
            ��;�ŷָ� ',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

alter table tdc_search comment '���ʮ��������¼';

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
   status               int comment '0 ���� 
            1 ע�ᣬδѡ�����
            2 ע�ᣬδд������Ϣ
            4 ���',
   statusinfo           varchar(20),
   role                 int comment '0 ��ʦ
            1 ����
            2 ����Ա',
   roleinfo             varchar(20),
   rmb                  float(10,2),
   score                float(10,2) comment '0-10',
   sex                  int comment '0 ��
            1 Ů
            2 ����',
   birthday             datetime,
   address              varchar(100),
   workaddress          varchar(100),
   tag                  varchar(50) comment '��ǩ˳��
            ����
            ����ʱ�� ��/ȫ
            ��ʦҪ�� ��У/����
            ���� ����/��ס
            ������;�ָ���С����,�ָ�',
   photos               varchar(200),
   registertime         datetime,
   lastlogintime        datetime,
   logouttime           datetime,
   evaluateavg          float(2,2) comment '���۷�-ƽ��',
   evaluatecount        int comment '��������',
   publishid            varchar(100) comment '������ID����;�ָ�',
   primary key (id)
)
type = InnoDB
auto_increment = 0;

