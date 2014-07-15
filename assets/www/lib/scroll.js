/*
 * 作者:huyu
 * 日期:2014-07-15
 * 说明:List页面滚动到底部获取数据
 */
    (function ($) {
      
        var defaults = {
            page_size: 10
        };

       // 当前页面是否已经滚动到底部
	    var isPageBottom = function () {
	        var a = document.documentElement.scrollTop == 0 ? document.body.clientHeight
					: document.documentElement.clientHeight;
	        var b = document.documentElement.scrollTop == 0 ? document.body.scrollTop
					: document.documentElement.scrollTop;
	        var c = document.documentElement.scrollTop == 0 ? document.body.scrollHeight
					: document.documentElement.scrollHeight;
		    return (a + b >= c - 3) ? true : false;
	    }

        $.scrollForData = function(options) {
            // 如果options没有设置某些参数则采用默认值
		    var options = $.extend(defaults, options);
			// 页面号
			var page_no = 1;

		    var queryData = function() {

                options.data.page_no = page_no;

				$.ajax({
			        type  : 'POST',
					cache : false,
					url   : options.url,
					data  : options.data,
					success : function(dataList) {

					    if( dataList.length < options.page_size ) {
						    options.finish();
							$(window).unbind("scroll");
						}

						options.success(dataList)

						page_no++;
					},
					error : options.error
				 }); // end ajax
			}

			$(document).ready(function(){
				// 加载第一页
		        queryData();
				// 滚动页面底部加载其余页
				$(window).bind("scroll",function(){
				    if(isPageBottom())
					    queryData();
				})
			})
	    }

    })(jQuery);

