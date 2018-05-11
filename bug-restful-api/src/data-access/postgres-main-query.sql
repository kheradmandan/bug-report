
--  	BT_System (Bug Tracking System)
--**************************************************************************************
 -- EXTENSION
 
 CREATE EXTENSION IF NOT EXISTS  pgcrypto;
 CREATE EXTENSION IF NOT EXISTS  plpgsql;
 CREATE EXTENSION IF NOT EXISTS  "uuid-ossp";

 --**************************************************************************************
 
CREATE OR REPLACE FUNCTION public.hash_password()
  RETURNS trigger AS
$BODY$
	BEGIN
		NEW.email := lower(NEW.email);
		NEW.password := crypt(NEW.password, gen_salt('bf', 8));
		RETURN NEW;
	END		
	$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.hash_password()
  OWNER TO morteza;
  
--**************************

DROP TRIGGER IF EXISTS hash_and_format_account ON public.account;
CREATE TRIGGER hash_and_format_account
  BEFORE INSERT
  ON public.account
  FOR EACH ROW
  EXECUTE PROCEDURE public.hash_password();

 --**************************************************************************************  
-- Function: public.check_account_password(character varying, character varying)

-- DROP FUNCTION public.check_account_password(character varying, character varying);

CREATE OR REPLACE FUNCTION public.check_account_password(
    _email character varying,
    _passwd character varying)
  RETURNS uuid AS
$BODY$

	DECLARE
		out_account_uuid uuid;
	BEGIN
		SELECT account_uuid INTO out_account_uuid
		 FROM public.account 
			WHERE account.email = lower(_email) AND account.password = crypt(_passwd, account.password);
		RETURN out_account_uuid;
	END; $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION public.check_account_password(character varying, character varying)
  OWNER TO morteza;

 --**************************************************************************************  
CREATE OR REPLACE FUNCTION public.create_organ_seq()
  RETURNS trigger AS
$BODY$ 
  BEGIN
	EXECUTE 'CREATE SEQUENCE IF NOT EXISTS task_organ_' || NEW.organ_id::text || '_seq;' ;
	RETURN NEW;
  END		
	$BODY$
  LANGUAGE plpgsql
  COST 100;
ALTER FUNCTION public.create_organ_seq()
  OWNER TO morteza;
    
DROP TRIGGER IF EXISTS after_insert_organ ON public.organ;
CREATE TRIGGER after_insert_organ
  AFTER INSERT
  ON public.organ
  FOR EACH ROW
  EXECUTE PROCEDURE public.create_organ_seq();

 --**************************************************************************************
--SEQUENCES

CREATE SEQUENCE IF NOT EXISTS task_global_seq;


 --**************************************************************************************
 ------------------------------------- S E E D S ----------------------------------------
 
INSERT INTO public.op_status (op_status_id,"name") VALUES (0,'default'),(1,'active'),(2,'temp'),(3,'removed');
INSERT INTO public.op_flag   (op_flag_id,  "name") VALUES (0,'none'),(1,'warn'),(2,'panic');
INSERT INTO public.op_role   (op_role_id,  "name") VALUES (0,'root'),(1,'admin'),(2,'manager'),(3,'client');

--account
INSERT INTO public.account ("name",    "family",  "email",                 "password", "op_status_id", "op_role_id") VALUES
			   ('Morteza', 'Raeisi',  'MrRaeisi@outlook.com',  's123',     1,               0          ),
			   ('Vahid',   'Zahed',   'v.zahed@gmail.com',     's123',     1,               1          ),
			   ('Hadi',    'Akbari',  'h.akbari@gmail.com',    's123',     1,               2          );
UPDATE public.account SET "account_uuid" = 'fd2c87fd-aac1-42fb-968e-fecd28a64a51' where "email" = 'mrraeisi@outlook.com';

 INSERT INTO public.province ("province_id", "name")       VALUES (1, 'تهران'),(2, 'اصفهان'),(3, 'یزد'),(4, 'چهارمحال و بختیاری');
 INSERT INTO public.city ("city_id","province_id", "name") VALUES (1, 1, 'ملارد'),  (2, 1, 'اندیشه'), (3, 1, 'شهریار'),
						    (4, 4, 'شهرکرد'),(5, 4, 'بروجن'),  (6, 2, 'اصفهان');

 INSERT INTO public.organ ("organ_id","city_id", "name") SELECT city_id "organ_id", city_id "vity_id", 'شهرداری' as "name" FROM public.city;

 INSERT INTO public.group ("organ_id", "name", "op_status_id") VALUES (1, 'فرمول و محاسبات', 1), (1, 'پشتیبان و سرویس', 1), (1, 'گزارش و چاپ', 1);
 INSERT INTO public.group ("organ_id", "name", "op_status_id")
	SELECT o."organ_id", g."name", "op_status_id" FROM public.organ o, public.group g where o.organ_id > 1;
 UPDATE public.group set "group_uuid" = 'f0073893-f72e-46d6-ab09-6173fa7af7de' where organ_id = 1 AND "name"= 'فرمول و محاسبات';	

 --**************************************************************************************
 --**************************************************************************************


