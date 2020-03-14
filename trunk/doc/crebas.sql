/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2020/3/11 19:27:18                           */
/*==============================================================*/


drop table if exists tdc_arbitration;

drop table if exists tdc_chat;

drop table if exists tdc_chatassist;

drop table if exists tdc_collection;

drop table if exists tdc_evaluate;

drop table if exists tdc_history;

drop table if exists tdc_hot;

drop table if exists tdc_news;

drop table if exists tdc_publish;

drop table if exists tdc_search;

drop table if exists tdc_tag;

drop table if exists tdc_telpermission;

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
   result               int comment '0 ����Աȡ��
            1 �ٲ��˼������۷� 
            2 �ٲ����������۷�
            3 �ٲ��˷��
            4 ���ٲ��˼������۷�
            5 ���ٲ����������۷�
            6 ���ٲ��˷��
            
            �����������ƽ�����۷�',
   evalutescore         int comment '������ӻ�������۷֣��������������ʾ���۷�',
   submittime           datetime,
   arbitrationtime      datetime,
   primary key (id)
)

auto_increment = 0;

alter table tdc_arbitration comment '�ٲ�';

/*==============================================================*/
/* Table: tdc_chat                                              */
/*==============================================================*/
create table tdc_chat
(
   id                   int not null auto_increment,
   content              varchar(200),
   fromuserid           int,
   touserid             int,
   sendtime             datetime,
   isread               bool,
   primary key (id)
)

auto_increment = 0;

alter table tdc_chat comment '�û���¼ʱ��ɾ��һ������ǰ�������¼';

/*==============================================================*/
/* Table: tdc_chatassist                                        */
/*==============================================================*/
create table tdc_chatassist
(
   id                   int not null auto_increment,
   fromuserid           int,
   touserid             int,
   hasunreadmsg         bool,
   lastsendtime         datetime,
   briefcontent         varchar(30),
   primary key (id)
)

auto_increment = 0;

alter table tdc_chatassist comment '���츨������¼�Ƿ���δ����Ϣ';

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

auto_increment = 0;

alter table tdc_collection comment '���ʮ���ղ�';

/*==============================================================*/
/* Table: tdc_evaluate                                          */
/*==============================================================*/
create table tdc_evaluate
(
   id                   int not null auto_increment,
   userid               int,
   publishid            int,
   score                int,
   content              varchar(100),
   evaluatetime         datetime,
   disabledtime         datetime,
   status               int comment '0 ����
            1 ����Աɾ��',
   primary key (id)
)

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

auto_increment = 0;

alter table tdc_history comment '���ʮ����ʷ';

/*==============================================================*/
/* Table: tdc_hot                                               */
/*==============================================================*/
create table tdc_hot
(
   id                   int not null auto_increment,
   keywords             varchar(30) comment '�����ȵ�,���洢10��
            ��;�ŷָ� ',
   count                int,
   primary key (id)
)

auto_increment = 0;

/*==============================================================*/
/* Table: tdc_news                                              */
/*==============================================================*/
create table tdc_news
(
   id                   int not null auto_increment,
   status               int comment '0 ������ʾ
            1 ����ʾ
            2 �༭����
            3 ɾ��
            ',
   logophoto            varchar(100),
   title                varchar(100),
   content              varchar(500),
   titleone             varchar(100),
   contentone           varchar(500),
   photoone             varchar(100),
   titletwo             varchar(100),
   contenttwo           varchar(500),
   phototwo             varchar(100),
   titlethree           varchar(100),
   contentthree         varchar(500),
   photothree           varchar(100),
   titlefour            varchar(100),
   contentfour          varchar(500),
   photofour            varchar(100),
   publishtime          datetime,
   deletetime           datetime,
   readtimes            int comment '�Ķ�����',
   primary key (id)
)

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
   userid               int,
   workaddress          varchar(100),
   detailworkaddress    varchar(100),
   publishtime          datetime,
   deletetime           datetime,
   disabletime          datetime,
   status               int comment '0 ����չʾ
            1 ����ʾ
            2 ɾ��
            3 ����Աɾ��',
   evaluateavg          float(5,2),
   evaluatecount        int,
   tag                  varchar(50),
   introduction         varchar(1000),
   photos               varchar(1000),
   wagesbymonthmin      float(12,2),
   wagesbymonthmax      float(12,2),
   wagesbyclassmin      float(12,2),
   wagesbyclassmax      float(12,2),
   wagesfacetoface      bool,
   wagesbymonth         bool,
   wagesbyclass         bool,
   hirecount            int comment '��Ƹ����',
   hireinfo             varchar(50) comment '��Ƹ����/Ħ��ȫְ/��ְ��ʦ3λ',
   requireinfo          varchar(50) comment '��У;����;��ҵ;XX���ѧ����',
   dancetype            varchar(20),
   worktype             varchar(20),
   primary key (id)
)

auto_increment = 0;

alter table tdc_publish comment '����';

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

auto_increment = 0;

/*==============================================================*/
/* Table: tdc_telpermission                                     */
/*==============================================================*/
create table tdc_telpermission
(
   id                   int not null auto_increment,
   fromuserid           int,
   touserid             int,
   permissiontime       datetime,
   status               int comment '0 ��Ȩ��
            1 Ȩ������
            2 �û��ܾ�
            3 Ȩ���ѹ���
            4 ����Ȩ��δ��
            ',
   publishid            int comment '��publishid��������ĵ绰',
   primary key (id)
)

auto_increment = 0;

/*==============================================================*/
/* Table: tdc_user                                              */
/*==============================================================*/
create table tdc_user
(
   id                   int not null auto_increment,
   username             varchar(30),
   name                 varchar(10),
   iswxuser             bool,
   nickname             varchar(30),
   password             varchar(32),
   logo                 varchar(50),
   tel                  varchar(11),
   introduction         varchar(1000),
   status               int comment '0 ���� 
            1 ע�ᣬδѡ�����
            2 ע�ᣬδд������Ϣ
            4 ���',
   role                 int comment '0 ��ʦ
            1 ����
            2 ����Ա',
   rmb                  float(10,2),
   score                float(10,2) comment '0-10',
   sex                  int comment '0 ��
            1 Ů
            2 ����',
   birthday             datetime,
   address              varchar(100),
   detailaddress        varchar(100),
   workaddress          varchar(100),
   detailworkaddress    varchar(100),
   tag                  varchar(50) comment '��ǩ˳��
            ����
            ����ʱ�� ��/ȫ
            ��ʦҪ�� ��У/����
            ���� ����/��ס
            ������;�ָ���С����,�ָ�',
   photos               varchar(1000),
   registertime         datetime,
   lastlogintime        datetime,
   logouttime           datetime,
   evaluateavg          float(5,2) comment '���۷�-ƽ��',
   evaluatecount        int comment '��������',
   publishid            varchar(100) comment '������ID����;�ָ�',
   wagesbymonthmin      float(12,2),
   wagesbymonthmax      float(12,2),
   wagesbyclassmin      float(12,2),
   wagesbyclassmax      float(12,2),
   wagesfacetoface      bool,
   wagesbymonth         bool,
   wagesbyclass         bool,
   hirecount            int comment '��Ƹ����',
   hireinfo             varchar(50) comment '��Ƹ����/Ħ��ȫְ/��ְ��ʦ3λ',
   requireinfo          varchar(50) comment '��У;����;��ҵ;XX���ѧ����',
   dancetype            varchar(20),
   worktype             varchar(20),
   cahtuniqueid         varchar(100),
   chatkey              varchar(13),
   primary key (id)
)

auto_increment = 0;

