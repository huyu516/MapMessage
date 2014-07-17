   function DBUtil() {}

   DBUtil.openDB = function() {
       return window.openDatabase("Database", "2.0", "Cordova Demo", 2000);	   
   }

   DBUtil.error = function(err) { 
       alert(BaseUtil.getJsonStr(err)) 	
   }

   DBUtil.success = function() { /* BaseUtil.alert("操作成功！") */ };
   
   DBUtil.initOnce = function() {
   
   	   DBUtil.execute('create table if not exists MapMsg (msg_id primary key, content, sender_id, sender_name, send_date, longitude, latitude, is_top, top_id)');		

       DBUtil.execute('create table if not exists UserInfo (user_id, user_name, user_pwd)');
 	   DBUtil.select('select count(*) from UserInfo', [], function(tx, results) {
           var user_count = DBUtil.resultsToNum(results);
           if(user_count === 0) {
           	   var sql = "insert into UserInfo(user_id ,user_name, user_pwd) " 
    				   + "values('admin', 'admin', 'admin')";
           	   DBUtil.execute(sql);
           }
 	   })
       
   }

   DBUtil.execute = function(sql, params) {
   
     function query(tx) {
        tx.executeSql(sql, params || []);
     }           

     this.openDB().transaction(query, this.error, this.success);
   }

   DBUtil.select = function(sql, params, callback) {

       function query(tx) {
           tx.executeSql(sql, params || [], callback, this.error);
       }
       
       this.openDB().transaction(query, this.error, this.success);
   }

   DBUtil.resultsToList = function(results) {
        var list = [];
        for(var i = 0 ; i < results.rows.length ; i++) {
            var item = results.rows.item(i);
            var obj = {};
            for(var prop in item) {
                obj[prop] = item[prop];
            }
            list.push(obj);
        }
        return list;
   }

   DBUtil.resultsToObj = function(results) {
        if(results.rows.length === 0) {
            return null;
        }
        else {
            var item = results.rows.item(0);
            var obj = {};
            for(var prop in item) {
                obj[prop] = item[prop];
            }
            return obj;
        }
   }

   DBUtil.resultsToNum = function(results) {
       if(results.rows.length === 0) {
           return null;
       } else {
           var item = results.rows.item(0);
           for(var prop in item) {
              return item[prop] * 1;
           }
       }
   }

   




