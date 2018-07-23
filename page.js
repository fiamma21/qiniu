var page = {
	// 图片路径
	picUrl:'https://image.momfo.com/',
	//获取七牛token
	uploadToken:'http://127.0.0.1:8084/qiniu/uploadkey.do',
	// 删除七牛已成功上传图片
    deleteQiniuImg: 'http://127.0.0.1:8084/qiniu/delete.do',
	//上传图片路径基地址
	picUploadBaseUrl:'http://127.0.0.1:8084/',
	// 正式环境的PC端的地址
	// http://www.momfo.net/
	nowUrl: "http://192.168.1.221:8083/",
	strPic:"",
	// 分页显示数
	pageSize: 9,
	// 当前页数
	myCurPage: 0,
	// 封装ajax
	executeAjax: function(param) {
		var myformData = new FormData();
		$.each(param.param, function(myName, myval) {
          console.log('提交参数',myName,myval)
			if(myval && myval != "" && myval != null) myformData.append(myName, myval);
          console.log('表单提交参数',myformData)
		}); 
		$.ajax({
			url: param.url + "?v=" + $.now(),
			timeout: param.timeout ? param.timeout : 10000, // 超时时间设置，单位毫秒
			type: "POST",
			async: param.async ? param.async : true,
			data: myformData,
			beforeSend: function(request) {
				request.setRequestHeader("Access-Control-Allow-Origin", "*");
				$("body").append('<div id="ajaxBg" class="ajaxBg"></div>');
			},
			success: function(data) {
				$('#ajaxBg').remove();
				if(typeof(param.success) == 'function') {
					data = JSON.parse(data);
//					if(data.data && data.total) {
//						for(var i = 0; i < data.data.length; i++) {
//							data.data[i].isSelected = false;
//						}
//					}
					param.success(data, param.param);
				}

			},
			complete: function(XMLHttpRequest, status) { // 请求完成后最终执行参数
				$('#ajaxBg').remove();
				if(status == 'timeout') {
					page.dialogOK(status);
					window.location.href = "";
				}
			},
			error: function(data) {
				$('#ajaxBg').remove();
				page.dialogOK(data.message);
				window.location.href = "";
			},
			dateType: "json",
			processData: false,
			contentType: param.contentType ? param.contentType : false
		});
	},
	// ajax方法的封装,
	ajaxNew: function(param) {
		console.log(param.url + "?v=" + $.now());
		console.log(JSON.stringify(param.param));
		$.ajax({
			url: param.url + "?v=" + $.now(),
			timeout: param.timeout ? param.timeout : 10000, // 超时时间设置，单位毫秒
			type: "POST",
			data: JSON.stringify(param.param),
			contentType: "application/json; charset=utf-8",
			dateType: "json",
			beforeSend: function(request) {
				if(!param.isNotLoading){
					$("body").append('<div id="ajaxBg" class="ajaxBg"></div>');
				}
			},
			success: function(data) {
				if($('#ajaxBg')){
					$('#ajaxBg').remove();
				}
				if(typeof data == 'string'){
					data = JSON.parse(data);
				}
				console.log(data);
				// 带有errorCode的接口
				if(data.errorCode){
					if(data.errorCode == "SUCCESS") {
						if(typeof(param.success) == 'function') {
							param.success(data, param.param);
						} else {
							page.dialogTips(data.message, "Success");
							//alert(data.message);
						}
					} else if(typeof(param.failCallBack) == 'function') {
						param.failCallBack(data, param.param);
					} else {
						page.dialogTips(data.message, "Error");
						//alert(data.message);
					}
				// 分页数据的接口
				} else {
					param.success(data, param.param);
				}
			},
			complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
				if($("#ajaxBg")){
					$("#ajaxBg").remove();
				}
				if(status == 'timeout') {
					alert('服务器异常,请稍候再试!');
				}
			},
			error: function(data) {
				if($("#ajaxBg")){
					$("#ajaxBg").remove();
				}
				if(typeof data == 'string'){
					data = JSON.parse(data);
				}
				console.info(data);
				page.dialogTips(data.message);
			}
		})
	},
	// ajax方法的封装,
	ajaxNewNoTime: function(param) {
		console.log(param.url);
		console.log(JSON.stringify(param.param));
		$.ajax({
			url: param.url,
			timeout: param.timeout ? param.timeout : 10000, // 超时时间设置，单位毫秒
			type: "POST",
			data: JSON.stringify(param.param),
			contentType: "application/json; charset=utf-8",
			dateType: "json",
			beforeSend: function(request) {
				if(!param.isNotLoading){
					$("body").append('<div id="ajaxBg" class="ajaxBg"></div>');
				}
			},
			success: function(data) {
				if($('#ajaxBg')){
					$('#ajaxBg').remove();
				}
				if(typeof data == 'string'){
					data = JSON.parse(data);
				}
				console.log(data);
				// 带有errorCode的接口
				if(data.errorCode){
					if(data.errorCode == "SUCCESS") {
						if(typeof(param.success) == 'function') {
							param.success(data, param.param);
						} else {
							page.dialogTips(data.message, "Success");
							//alert(data.message);
						}
					} else if(typeof(param.failCallBack) == 'function') {
						param.failCallBack(data, param.param);
					} else {
						page.dialogTips(data.message, "Error");
						//alert(data.message);
					}
				// 分页数据的接口
				} else {
					param.success(data, param.param);
				}
			},
			complete: function(XMLHttpRequest, status) { //请求完成后最终执行参数
				if($("#ajaxBg")){
					$("#ajaxBg").remove();
				}
				if(status == 'timeout') {
					alert('服务器异常,请稍候再试!');
				}
			},
			error: function(data) {
				if($("#ajaxBg")){
					$("#ajaxBg").remove();
				}
				if(typeof data == 'string'){
					data = JSON.parse(data);
				}
				//alert(data.message);
				page.dialogTips(data.message);
			}
		})
	},
	//导出excel
	exportExcel : function(param) {
		var form = $("<form>");// 定义一个form表单
		form.attr("style", "display:none");
		form.attr("id", "export_excel_form");
		form.attr("target", "");
		form.attr("method", "post");
		form.attr("action", param.url);
		for(var i in param.param){
			var input1 = $("<input>");
			input1.attr("type", "hidden");
			input1.attr("id", "export_excel_input_"+i);
			input1.attr("name", i);
			input1.attr("value", param.param[i]);
			form.append(input1);
		}
		$("body").append(form);// 将表单放置在web中
		form.submit();// 表单提交
		$('#export_excel_form').remove();
	},
	Ajax: function(param) {
		$.ajax({
			url: param.url + "?v=" + $.now(),
			timeout: param.timeout ? param.timeout : 10000, // 超时时间设置，单位毫秒
			type: "POST",
			async: param.async ? param.async : true,
			data: JSON.stringify(param.params),
			beforeSend: function(request) {
				request.setRequestHeader("Access-Control-Allow-Origin", "*");
				$("body").append('<div id="ajaxBg" class="ajaxBg"></div>');
			},
			success: function(data) {
				if(typeof(param.success) == 'function') {
					data = JSON.parse(data);
					if(data.data && data.total) {
						for(var i = 0; i < data.data.length; i++) {
							data.data[i].isSelected = false;
						}
					}
					$('#ajaxBg').remove();
					param.success(data, param.param);
				}

			},
			complete: function(XMLHttpRequest, status) { // 请求完成后最终执行参数
				if(status == 'timeout') {
					page.dialogOK(status);
					window.location.href = "";
				}
			},
			error: function(data) {
				page.dialogOK(data.message);
				window.location.href = "";
				$('#ajaxBg').remove();
			},
			dateType: "json",
			processData: false,
			contentType: param.contentType ? param.contentType : false
		});
	},
	// 绑定分页控件
	pageBind: function(count, pageNo, id,size) {
		if (!id) {
			id = "pager";
		}
		$("#" + id).pager({
			resultCount : count,
			pageSize :	size|| page.pageSize,
			curPage : pageNo,
			showPage : function(pageNo) {
				page.getPageList(pageNo);
				page.myCurPage = pageNo;
			},
			clearCache : function() {
				page.clearCache();
			}
		});
	},
	getCache: function(_id) {
		var flag = false;
		if(page.cache[_id]) {
			if(page.cache[_id].length > 0) {
				viewModel.list(ko.mapping.fromJS(page.cache[_id]));
			} else {
				viewModel.list(null);
			}
			flag = true;
		}
		return flag;
	},
	getBankCache: function(_id) {
		var flag = false;
		if(page.cache[_id]) {
			if(page.cache[_id].length > 0) {
				viewModel.bankInfoLists(page.cache[_id]);
			} else {
				viewModel.bankInfoLists(null);
			}
			flag = true;
		}
		return flag;
	},
	addCache: function(_id, _value) {
		page.cache[_id] = _value;
	},
	clearCache: function() {
		page.cache = [];
	},
	getKeyValue: function(_type, _key) { // 获取dic的值
		var _value = "";
		if(!_key) {
			if(_type == "dealType") {
				_value = data.dealType[_key];
			} else if(_type == "houseProperty") {
				_value = data.houseProperty[_key];
			} else if(_type == "landProperty") {
				_value = data.landProperty[_key];
			}
		}
		return _value;
	},
	// Tab控制函数
	tabs: function(tabObj) {
		var tabNum = $(tabObj).parent().index("li")
			// 设置点击后的切换样式
		$(tabObj).parent().parent().find("li a").removeClass("selected");
		$(tabObj).addClass("selected");
		// 根据参数决定显示内容
		$(".tab-content").hide();
		$(".tab-content").eq(tabNum).show();
	},
	// ========================基于common.js自定义插件========================
	// 开关按钮
	ruleSingleCheckbox: function() {
		$(".rule-single-checkbox").ruleSingleCheckbox();
	},
	// 复选框1
	ruleMultiCheckbox: function() {
		$(".rule-multi-checkbox").ruleMultiCheckbox();
	},
	// 复选框2
	ruleMultiPorp: function() {
		$(".rule-multi-porp").ruleMultiPorp();
	},
	// 单选按钮
	ruleMultiRadio: function() {
		$(".rule-multi-radio").ruleMultiRadio();
	},
	// 下拉框
	ruleSingleSelect: function() {
		$(".rule-single-select").ruleSingleSelect();
	},
	// ========================以上基于common.js自定义插件========================
	// ========================基于lhgdialog插件========================
	// 可以自动关闭的提示，基于lhgdialog插件
	dialogTips: function(msgtitle, msgcss, url, callback) {
		var iconurl = "";
		switch(msgcss) {
			case "Hits":
				iconurl = "32X32/hits.png";
				break;
			case "Success":
				iconurl = "32X32/succ.png";
				break;
			case "Error":
				iconurl = "32X32/fail.png";
				break;
			default:
				iconurl = "32X32/succ.png";
				break;
		}
		$.dialog.tips(msgtitle, 1.5, iconurl, function() {
			if(url == "back") {
				frames["mainframe"].history.back(-1);
			} else if(typeof(url) != "undefined") {
				var iframe = $(window.parent.document).find("#mainframe");
				var iframes = $(window.parent.document).find("#mainframes");
				if(iframe.length > 0) {
					iframe.attr("src", url);
				} else if(iframes.length > 0) {
					iframes.attr("src", url);
				} else {
					if($(window.parent.parent.document).find("#mainframe").length > 0){
						$(window.parent.parent.document).find("#mainframe").attr("src", url);
					}else if($(window.parent.parent.document).find("#mainframes").length > 0){
						$(window.parent.parent.document).find("#mainframes").attr("src", url);
					}else{
						location.href=url; 
					}
				}
			}
			// 执行回调函数
			if(arguments.length == 4) {
				callback();
			}
		});
	},
	dialogTipsTime: function(msgtitle, msgcss, url, time) {
		var iconurl = "";
		switch(msgcss) {
		case "Hits":
			iconurl = "32X32/hits.png";
			break;
		case "Success":
			iconurl = "32X32/succ.png";
			break;
		case "Error":
			iconurl = "32X32/fail.png";
			break;
		default:
			iconurl = "32X32/succ.png";
		break;
		}
		$.dialog.tips(msgtitle, time, iconurl, function() {
			if(url == "back") {
				frames["mainframe"].history.back(-1);
			} else if(typeof(url) != "undefined") {
				var iframe = $(window.parent.document).find("#mainframe");
				var iframes = $(window.parent.document).find("#mainframes");
				if(iframe.length > 0) {
					iframe.attr("src", url);
				} else if(iframes.length > 0) {
					iframes.attr("src", url);
				} else {
					$(window.parent.parent.document).find("#mainframe").attr("src", url);
					$(window.parent.parent.document).find("#mainframes").attr("src", url);
				}
			}
		});
	},
	// 弹出一个Dialog窗口
	dialogOK: function(msgcontent, msgtitle, url, msgcss, callback) {
		var iconurl = "";
		var argnum = arguments.length;
		switch(msgcss) {
			case "success":
				iconurl = "success.gif";
				break;
			case "error":
				iconurl = "error.gif";
				break;
			default:
				iconurl = "alert.gif";
				break;
		}
		var dialog = $.dialog({
			title: msgtitle || "警告！",
			content: msgcontent,
			fixed: true,
			min: false,
			max: false,
			lock: true,
			icon: iconurl,
			ok: true,
			close: function() {
				if(url == "back") {
					history.back(-1);
				} else if(url != "") {
					var iframe = $(window.parent.document).find("#mainframe");
					if(iframe.length > 0) {
						iframe.attr("src", url);
					} else {
						$(window.parent.parent.document).find("#mainframe").attr("src", url);
					}
				}
				// 执行回调函数
				if(argnum == 5) {
					callback();
				}
			}
		});
	},

	// 弹出一个modelDialog窗口
	dialogModel: function(w, h, title, url) {
		$.dialog.modelDialog.show(w, h, title, url);
	},

	// 弹出一个确认对话框
	dialogConfirm: function(callback, isAll) {
		if(isAll) {
			$.dialog.alert('对不起，请选中您要操作的记录！');
			return false;
		}
		var msg = "删除记录后不可恢复，您确定吗？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogcodeConfirm: function(callback, isAll) { 
		var msg = "是否修改状态！";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogsavaConfirm: function(callback, isAll) { 
		var msg = "确认是否保存！";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogsubmitConfirmone: function(callback) {
		var msg = "是否确认还本付息？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogsubmitConfirmtwo: function(callback) {
		var msg = "是否确认还本付息？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogsubmitConfirmthree: function(callback) {
		var msg = "是否从一般户转账到还款户？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogsubmitConfirmfour: function(callback) {
		var msg = "确认解冻该笔款项？（解冻操作不可撤销，资金将直接退回用户账户）";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogsubmitConfirm: function(callback) {
		var msg = "是否确认提交信息给运营部门？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogfksubmitConfirm: function(callback) {
		var msg = "是否确认提交信息给风控部门？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogPassConfirm: function(callback) {
		var msg = "是否确认上线？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogoutConfirm: function(callback) {
		var msg = "确认已清洁完毕？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	dialogTiXiConfirm: function(callback) {
		var msg = "确认取消提醒？";
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
	// 确定按钮
	confirm: function(callback, msg) {
		$.dialog.confirm(msg, function() {
			callback();
		});
		return false;
	},
// ======================以上基于lhgdialog插件======================
}; 
// knockout 基类数据
// var viewModel = {
// 	list: ko.observable({}),
// 	isSelectAll: ko.observable(false),
// 	selectText: ko.observable("全选"),
// 	_basePicUrl: page.picUrl,
// 	// 全选/取消全选事件
// 	selectAll: function() {
// 		if(!viewModel.isSelectAll()) {
// 			viewModel.selectText("取消");
// 		} else {
// 			viewModel.selectText("全选");
// 		}
// 		ko.utils.arrayForEach(viewModel.list()(), function(data) {
// 			data.isSelected(!viewModel.isSelectAll());
// 		});
// 		viewModel.isSelectAll(!viewModel.isSelectAll());
// 	},
// 	baseDeleteAll: function(callback) {
// 		var delArray = [],
// 			i = 0;
// 		ko.utils.arrayForEach(viewModel.list()(), function(data) {
// 			if(data.isSelected()) {
// 				delArray[i++] = data.Id();
// 			}
// 		});
// 		page.dialogConfirm(function() {
// 			if(callback) {
// 				callback(delArray);
// 			}
// 		}, delArray.length == 0);
// 	},
// 	// 重绘类型
// 	renderType: function(value) {
// 		switch(value) {
// 			case 0:
// 				value = "个人业主";
// 				break;
// 			case 1:
// 				value = "公司";
// 				break;
// 			default:
// 				value = "个人业主";
// 				break;
// 		}
// 		return value;
// 	},
// 	// 时间格式转化
// 	renderDateTime: function(value) {
// 		return utility.JsonDateToDateTimeString(value);
// 	},
// 	//2:认购中(A) 3:已售完(G) 4:收益中(J) 5:已结息(M)  8:敬请期待(D) 14：已下线
// 	getAuditStatus : function(status){
// 		switch (status) {
// 		case '2':
// 			return "认购中";
// 		case '3':
// 			return "售罄";
// 		case '4':
// 			return "收益中";
// 		case '5':
// 			return "已结息";
// 		case '8':
// 			return "敬请期待";
// 		case '14':
// 			return "已下线";
// 		default:
// 			return "";
// 		}
// 	},
//   // 已上传成功的图片进行删除
//   deleteImgInQiniu:function(imgKey,success) {
// 	var reg=/^http/;
//     var imgUrl;
// 	if(reg.test(imgKey)){
//       imgUrl=imgKey.split('.com/')[1];
// 	}else{
//       imgUrl=imgKey;
//     }
//     $.ajax({
//       type:'GET',
//       url:page.deleteQiniuImg+'?key='+imgUrl,
//       beforeSend: function(request) {
//         request.setRequestHeader("Access-Control-Allow-Origin", "*");
//       },
//       success:function (data) {
//         var res = JSON.parse(data);
//         if(res.errorCode === 'SUCCESS'|| res.message === '图片不存在'){
//           success();
//         }else{
//           alert(res.message)
//         }
//       }
//     })
//   }
// };

var math = {
	// 扩大的倍数,num是数组,返回1,10,100,1000....
	expand: function(num) {
		var result = 0;//1,2,3,4...
		if(typeof num == 'object' ){
			for(var i = 0 ; i < num.length ; i++){
				var n = num[i];
				var t1 = (n + '').split('.')[1];
				if(t1){
					var tt1 = t1.length;
					if(tt1 > result){
						result = tt1;
					}
				}
			}
		}
		var _return = 1;
		while (result > 0) {
			_return *= 10;
			result--;
		}
		return _return;
	},
	// 加法,num是array, 结果返回是2位小数
	add : function(num) {
		if(!num){
			return ;
		}
		if (!(typeof num == 'object')) {
			return ;
		}
		var _return = 0;
		var cns = math.expand(num);	
		for(var i = 0 ; i < num.length ; i++){
			var n = num[i];
			n = Number(n);
			n *= cns;
			_return += n;
		}
		return (_return / cns).toFixed(2);
	},
	// 减法,num是array, 结果返回是2位小数
	sub : function(num) {
		if(!num){
			return ;
		}
		if (!(typeof num == 'object')) {
			return ;
		}
		var _return = 0;
		var isfirst = true;
		var cns = math.expand(num);	
		for(var i = 0 ; i < num.length ; i++){
			var n = num[i];
			n = Number(n);
			n *= cns;
			if (isfirst) {
				_return = n;
				isfirst = false;
			} else {
				_return -= n;
			}
		}
		return (_return / cns).toFixed(2);
	},
	// 乘法,num是array,array中必须是2个元素, 结果返回是2位小数
	mul : function(num) {
		if(!num){
			return ;
		}
		if (!(typeof num == 'object')) {
			return ;
		}
		var _return = 0;
		var cns = math.expand(num);	
		for(var i = 0 ; i < num.length ; i++){
			var n = num[i];
			n = Number(n);
			n *= cns;
			_return *= n;
		}
		//累乘
		var length = num.length;
		var _reCns = cns;
		while (length > 1) {
			_reCns *= cns;
			length--;
		}		
		return (_return / _reCns).toFixed(2);
	},
	// 除法,num是array, 结果返回是2位小数
	div : function(num) {
		if(!num){
			return ;
		}
		if (!(typeof num == 'object')) {
			return ;
		}
		if(num.length != 2){
			return ;
		}
		var _return = 0;
		var cns = math.expand(num);	
		for(var i = 0 ; i < num.length ; i++){
			var n = num[i];
			n = Number(n);
			n *= cns;
			_return += n;
		}
		return _return.toFixed(2);
	},
	// 保留两位小数
	toFixed2 : function(num) {
		var f = parseFloat(num);
		if (isNaN(f)) {
			return;
		}
		var mm = ""+num;
		var ns = mm.split(".");
		if(ns.length == 2){
			// 有小数
			var r = ns[0];
			var l = ns[1];
			if(l.length > 2){
				return r + "." + l.substr(0, 2);
			} else {
				return num;
			}
		}
		f = num * 100;
		f = parseInt(f);
		f = f / 100;
		return f;
	} 
}

// 日期选择器参数
var datePickerParam = {
	dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
	monthNames: ['年 1 月', '年 2 月', '年 3 月', '年 4 月', '年 5 月', '年 6 月', '年 7 月', '年 8 月', '年 9 月', '年 10 月', '年 11 月', '年 12 月'],
	dateFormat: 'yy-mm-dd',
	showMonthAfterYear: true
		// minDate: new Date()
};
// 日期格式化
var formatDate = function(str) {
	var arr = str.split("-");
	return new Date(arr[0], arr[1] - 1, arr[2]);
};

// 日期格式化（yyyy-MM-dd）
var formatDatePattern = function(str) {
	var month = str.getMonth() + 1;
	if(month < 10) {
		month = "0" + month;
	}
	var day = str.getDate();
	if(day < 10) {
		day = "0" + day;
	}

	return str.getFullYear() + "-" + month + "-" + day + " 00:00:00";
}