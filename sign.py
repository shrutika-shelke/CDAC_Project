import mysql.connector

config = {
  'user': 'root',
  'password': 'root',
  'host': 'localhost',
  'database': 'test',
  'raise_on_warnings': True
}

cnx = mysql.connector.connect(**config)
cursor = cnx.cursor()
try:
   

    dbs = cursor.execute("use DB2")
    cursor.commit()
    dbs= cursor.execute("select from table signup(username varchar(20) not null,password (20) not null primary key)") 
  
    cursor.commit()
  
except:  
    cnx.rollback()  
# for x in cursor:  
#     print(x)  


cnx.close()
