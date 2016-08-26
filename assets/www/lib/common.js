	String.prototype.replaceAll = function (s1, s2) { 
	   return this.replace(new RegExp(s1,"gm"),s2);
    }
	
	var BaseUtil = {};

    BaseUtil.success = function() {}

    BaseUtil.error = function() {}

    BaseUtil.isEmpty = function(val) {
        return val == null || typeof val == "undefined" ||
                typeof val == "string" && (val == "undefined" || val == "null" || val.replace(new RegExp(" ","gm"), "").length == 0)
    }

    BaseUtil.alert = function(msg) {
    	alert(msg);
    }

    BaseUtil.resetForm = function() {
	    jQuery(":text,:password").val("");
	    
        jQuery("input[defaultValue]").each(function() {       // slider
    		var self = jQuery(this);
    		self.val(self.attr("defaultValue"));
    		self.slider('refresh');
    	})
    }
    
    BaseUtil.getJsonStr = function(json) {
        var result = "";
        
        for(var prop in json) {
            result += prop + ":" + json[prop] + " ";
        }
        
        return result + "\n";
    }
    
    BaseUtil.getUUID = function() {
    	return new Date().getTime(); 
    }
    
    BaseUtil.isPageBottom = function () {
        var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight
				: document.documentElement.clientHeight;
        var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop
				: document.documentElement.scrollTop;
        var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight
				: document.documentElement.scrollHeight;
	    return (a + b >= c - 30);  // 30为修正值越大越早触发滚动
    }
    
    BaseUtil.initScrollDate = function(obj_id, obj_date) {
    	$('#' + obj_id).val(obj_date || "").scroller({
			preset : 'date',
			theme : 'jqm',
			display : 'modal',
			mode : 'Mixed',
			dateOrder: 'yy-mm-dd',
			dateFormat: 'yy-mm-dd',
			dayText: '日', 
			monthText: '月', 
			yearText: '年', 
			setText: '确定', 
			cancelText: '取消',
			startYear: 2010,
			endYear: new Date().getFullYear()
		}); 
    } 
	  
	BaseUtil.initScrollDateTime = function(obj_id, obj_date) {
		$('#' + obj_id).val(obj_date || "").scroller({
			preset : 'datetime',
			theme : 'jqm',
			display : 'modal',
			mode : 'Mixed',
			dateOrder: 'yy-mm-dd HH:ii:ss',
			dateFormat: 'yy-mm-dd',
			timeFormat: 'HH:ii:ss',
			timeWheels: 'HH:ii:ss',
			startYear: 2010,
			endYear: new Date().getFullYear() + 2,
			dayText: '日', 
			monthText: '月', 
			yearText: '年', 
			hourText:'时',
			minuteText:'分',
			secText :'秒',
			setText: '确定', 
			cancelText: '取消'
		});
	}
	
	BaseUtil.dateFormat = function(time) {
		if (this.isEmpty(time)) {
			return "";
		}
	
		var dt = new Date(time);
	
		var year = dt.getFullYear();
		var month = dt.getMonth() + 1;
		if (month < 10) month = "0" + month;
		var day = dt.getDate();
		if (day < 10) day = "0" + day;
	
		return year + "-" + month + "-" + day;
	}
	
	BaseUtil.datetimeFormat = function(time) {
		if (this.isEmpty(time)) {
			return "";
		}
	
		var dt = new Date(time);
	
		var hour = dt.getHours();
		if (hour < 10) hour = "0" + hour;
		
		var minute = dt.getMinutes();
		if (minute < 10) minute = "0" + minute;
	
		var second = dt.getSeconds();
		if (second < 10) second = "0" + second;
	
		return this.dateFormat(time) + " " + hour + ":" + minute + ":" + second;
	}
	
	BaseUtil.getToDate = function(dt) {  // 支持date "2010-10-10" "2010/10/10"  
	    var result;  	
	    
        if(typeof dt == "string") {
		    result = new Date(dt.replaceAll("-", "/"));
	    } else {
		    result = new Date(dt);
	    }
	    
	    result.setHours(23);
	    result.setMinutes(59);
	    result.setSeconds(59);
	    
	    return result;		
	}
	
	BaseUtil.getFromDate = function(dt) {
	    var result;  
	    	
        if(typeof dt == "string") {
		    result = new Date(dt.replaceAll("-", "/"));
	    } else {
		    result = new Date(dt);
	    }
	    
	    result.setHours(0);
	    result.setMinutes(0);
	    result.setSeconds(0);
	    
	    return result;		
	}
    
    BaseUtil.scrollToBottom = function() {
    	window.scrollTo(0, document.body.scrollHeight); 
    }
    
    BaseUtil.goBack = function() {
    	window.history.go(-1);
    }
    
/*************** Android plugin start ********************/  
  
    BaseUtil.exit = function() {
        cordova.exec(this.success, this.error, 'AndroidHelper', 'EXIT', [] );
    }
    
    BaseUtil.toast = function(msg, isShortTime) {
    	var params = [ msg, isShortTime || false ];
        cordova.exec(this.success, this.error, 'AndroidHelper', 'TOAST', params);
    }
    
	BaseUtil.location = function(success, error, openGps, waitSecond) {
		var params = [	openGps    || false,
						waitSecond || 10,
						success    || this.success,
						error      || this.error 
					 ];
		return cordova.exec(success, error, 'BaiduLocation', 'LOCATION', params);
	}

/*************** Android plugin end   ********************/    
    var Consts = {};
    
    Consts.KEEP_LOGIN = "KEEP_LOGIN"
    Consts.USER_ID = "USER_ID";
    Consts.USER_NAME = "USER_NAME";
    Consts.USER_PWD = "USER_PWD";

    Consts.MSGLIST_SENDER_NAME = "MSGLIST_SENDER_NAME";
    Consts.MSGLIST_CONTENT = "MSGLIST_CONTENT";
    Consts.MSGLIST_SEND_DATE_START = "MSGLIST_SEND_DATE_START";
    Consts.MSGLIST_SEND_DATE_END = "MSGLIST_SEND_DATE_END";
    Consts.MSGLIST_DISTANCE = "MSGLIST_DISTANCE";

    Consts.MSGINFO_TOP_ID = "MSGINFO_TOP_ID";

    Consts.MSGADD_LONGITUDE = "MSGADD_LONGITUDE";
    Consts.MSGADD_LATITUDE = "MSGADD_LATITUDE";
    
    Consts.LATITUDE = "latitude";
    Consts.LONGITUDE = "longitude";
