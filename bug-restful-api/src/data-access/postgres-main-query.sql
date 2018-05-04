
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
--SEQUENCES

CREATE SEQUENCE IF NOT EXISTS task_global_seq


 --**************************************************************************************
 ------------------------------------- S E E D S ----------------------------------------
 
INSERT INTO public.op_status (op_status_id,"name") VALUES (0,'default'),(1,'active'),(2,'removed');
INSERT INTO public.op_flag   (op_flag_id,  "name") VALUES (0,'none'),(1,'warn'),(2,'panic');
INSERT INTO public.op_role   (op_role_id,  "name") VALUES (0,'root'),(1,'admin'),(2,'manager'),(3,'client');

--account
INSERT INTO public.account ("name",    "family",  "email",                 "password", "op_status_id", "op_role_id") VALUES
			   ('Morteza', 'Raeisi',  'MrRaeisi@outlook.com',  's123',     1,               0          ),
			   ('Vahid',   'Zahed',   'v.zahed@gmail.com',     's123',     1,               1          ),
			   ('Hadi',    'Akbari',  'h.akbari@gmail.com',    's123',     1,               2          );
 
 --**************************************************************************************
 --**************************************************************************************


