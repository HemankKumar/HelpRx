create database sign;
use sign;

create table signup(email varchar(30) primary key,pass varchar(30),type varchar(10),status int,doj date);
select *from signup;

insert into signup values('admin@gmail.com','admin','admin',1,current_date());


create table donors(email varchar(40) primary key,name varchar(40),mobile varchar(20),address varchar(50),city varchar(20),idproof varchar(10),pic varchar(40),frm varchar(10),too varchar(10));
select *from donors;





create table availmedicine( srno int auto_increment primary key,email varchar(30),medicinename varchar(30),expirydate varchar(30),packingtype varchar(30),quantity int);
select *from availmedicine;




create table needyprofile(email varchar(30) primary key,name varchar(30),mobile varchar(10),dob date,gender varchar(10),city varchar(20),address varchar(50),pic varchar(40));
select *from needyprofile;

alter user 'root'@'localhost' identified with mysql_native_password by 'root1';




