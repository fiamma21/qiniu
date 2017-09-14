var utility = {
	//静态变量
	hasError: false,
	sizeLimit: 20971520,
	fileArr: [],
	uploadFiles: [],
	//上传图片路径基地址
	picUploadBaseUrl:'http://manage.momfo.net/',
	// 图片路径
	picUrl:'https://image.momfo.com/',
	//JSON to string
	jsonToString: function(obj) {
		return JSON.stringify(obj);
	},
	//string to JSON
	stringToJson: function(str) {
		return JSON.parse(str);
	},
	format: function() {
		var args = arguments;
		return args[0].replace(/{(\d+)}/g, function(m, num) {
			num = +num + 1;
			return typeof args[num] != 'undefined' ?
				args[num] :
				m;
		});
	},
	dateFormat: function(fmt, date) {
		if(!date) {
			date = new Date();
		} else {
			date = new Date(date);
		}
		var o = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	JsonDateToDateString: function(date, fmt) {
		var date = new Date(Number(date.slice(6, -2)));
		var fmt = fmt || "yyyy-MM-dd";
		return this.dateFormat(fmt, date);
	},
	JsonDateToDateTimeString: function(date) {
		var date = new Date(Number(date.slice(6, -2)));
		return this.dateFormat("yyyy-MM-dd hh:mm:ss", date);
	},
	//hhmmsshh转换为hh:mm:ss:hh
	timeParse:function(time){
		var t = "";
		for(var i=0;i<time.length;i++){
			if(i % 2 == 1 && i != 7){
				t += time.charAt(i) + ":";
			}else{
				t += time.charAt(i)
			};
		};
		return t;
	},
	//yyyyMMdd转换为yyyy-MM-dd
	dateParseToLine:function(date){
		var d1 = date.substring(0,4);
		var d2 = date.substring(4,6);
		var d3 = date.substring(6,8);
		return d = d1 + "-" + d2 + "-" + d3;

	},
  //yyyy-MM-dd 转换为yyyyMMdd
  dateParseTo:function(date){
    var d1 = date.substring(0,4);
    var d2 = date.substring(5,7);
    var d3 = date.substring(8,10);
    return d = d1 + d2 + d3;

  },
	//yyyy-MM-dd hh:mm:ss:hh转换为yyyy-MM-dd
	dateParseSlice:function(t){
		var d = '';
		if(t){
			d = t.substring(0, 10);
		}else{
			d = '';
		}
		return d;
	},
	//日期往前或往后推90天
   addDate:function(date,days) {
       var d=new Date(date);
        d.setDate(d.getDate()+days);
       var month=d.getMonth()+1;
	   var day = d.getDate();
       if(month<10){
      month = "0"+month;
    }
   if(day<10){
    day = "0"+day;
  }
  var val = d.getFullYear()+"-"+month+"-"+day;
  return val;
},
	getQueryString: function(value) {
		var reg = new RegExp("(^|&)" + value + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		} else {
			return null;
		}
	},
	//将一段带HTML标签、转义符的字符串转换为纯文本
	parseHtml:function(str){
		return str.replace(/<[^>]+>/g,"\n").replace(/&nbsp;/ig, " ");
	},
  //获取页面参数
  getLocationParam: function(strParame) {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&"); // Break at ampersand
    for(var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if(pos == -1) continue;
      var argname = pairs[i].substring(0, pos);
      var value = pairs[i].substring(pos + 1);
      value = decodeURIComponent(value);
      args[argname] = value;
    }
    return args[strParame];
  },
	emailRegex: function(val) {
		var regex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if(!regex.test(val)) {
			return false;
		}
		return true;
	},
	phoneRegex: function(val) {
		var regex = /^1[3|4|5|8][0-9]\d{8}$/;
		if(!regex.test(val)) {
			return false;
		}
		return true;
	},
	getId: function() {
		return window.location.pathname.replace(/[^\d]/g, '');
	},
	tsFormat: function(ts) {
		if(ts < 0) {
			ts = 0;
		}
		var o = {
			d: Math.floor(ts / (1000 * 60 * 60 * 24)),
			h: Math.floor(ts / (1000 * 60 * 60)) % 24,
			m: Math.floor(ts / (1000 * 60)) % 60,
			s: Math.floor(ts / 1000) % 60,
			ss: Math.floor(ts / 100) % 10
		};

		o.d = o.d > 9 ? o.d.toString() : "0" + o.d;
		o.dh = o.d[0];
		o.dl = o.d[1];

		o.h = o.h > 9 ? o.h.toString() : "0" + o.h;
		o.hh = o.h[0];
		o.hl = o.h[1];

		o.m = o.m > 9 ? o.m.toString() : "0" + o.m;
		o.mh = o.m[0];
		o.ml = o.m[1];

		o.s = o.s > 9 ? o.s.toString() : "0" + o.s;
		o.sh = o.s[0];
		o.sl = o.s[1];

		o.ss = o.ss > 9 ? o.ss.toString() : "0" + o.ss;
		o.ssh = o.ss[0];
		o.ssl = o.ss[1];
		return o;
	},
	/*
	 * @description		根据某个字段实现对json数组的排序
	 * @param	 array	要排序的json数组对象
	 * @param	 field	排序字段（此参数必须为字符串）
	 * @param	 reverse  是否倒序（默认为false）
	 * @return	array	返回排序后的json数组
	 */
	jsonSort: function(array, field, reverse) {
		//数组长度小于2 或 没有指定排序字段 或 不是json格式数据
		if(array.length < 2 || !field || typeof array[0] !== "object") return array;
		//数字类型排序
		if(typeof array[0][field] === "number") {
			array.sort(function(x, y) {
				return x[field] - y[field]
			});
		}
		//字符串类型排序
		if(typeof array[0][field] === "string") {
			array.sort(function(x, y) {
				return x[field].localeCompare(y[field])
			});
		}
		//倒序
		if(reverse) {
			array.reverse();
		}
		return array;
	},
	//只允许输入数字
	checkNumber: function(e) {
		if(isFirefox = navigator.userAgent.indexOf("Firefox") > 0) { //FF
			if(!((e.which >= 48 && e.which <= 57) || (e.which >= 96 && e.which <= 105) || (e.which == 8) || (e.which == 46)))
				return false;
		} else {
			if(!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || (event.keyCode == 8) || (event.keyCode == 46)))
				event.returnValue = false;
		}
	},
	//验证只能输入整数
	checknum: function(str) {
		var user = $(str).val();
		var reg2 = /^[0-9]*$/;
		if(reg2.test(user) == false) {
			alert("只能输入整数！")
			return false;
		}
	},
  // 已上传成功的图片进行删除
  deleteImgInQiniu2:function (imgKey,success) {
    var reg=/^http/;
    var imgUrl;
    if(reg.test(imgKey)){
      imgUrl=imgKey.split('.com/')[1];
    }else{
      imgUrl=imgKey;
    }
    $.ajax({
      type:'GET',
      url:page.deleteQiniuImg+'?key='+imgUrl,
      beforeSend: function(request) {
        request.setRequestHeader("Access-Control-Allow-Origin", "*");
      },
      success:function (data) {
      	console.log(data);
        var res = JSON.parse(data);
        if(res.errorCode === 'SUCCESS' || res.message === '图片不存在'){
          success();
        }else{
          alert(res.message)
        }
      }
    })
  },
	/**
	 * 上传图片的方法：
	 *  参数说明：
	 *  	id：预览的ul的id，也是li中的name
	 *  	browse:浏览按钮,多个传数组
	 *  	submit:提交按钮id
	 *  	fileUploaded：上传完成回调函数
	 *    	simpleFile：是否只能传一张图片，0：多张，其它或1：只能穿一张。默认多张。
	 *    	isFull：是否是全路径。0：半路径。其它或1：全路径。默认半路径。
	 *      imgType：0:无删除   1:有删除   2:无删除有下拉框。默认是有删除的,删除只是删除预览
 * 			All:判断是否是多次上传图片后一次性保存，用来提示上传成功   0：多次上传一次性保存，只在最后一次上传后提示上传成功  1：上传一次后保存，提示上传成功
	 **/
	initUploadpic:function(id,browse,submit, simpleFile, isFull,imgType,fileUploaded,All) {
		var $div = $('#' + id);
		if(!fileUploaded||typeof (fileUploaded)!='function'){
			console.info('建议传入一个回调函数')
			fileUploaded = function (img) {
				
			}
		}
		return new Promise(function (resolve,reject) {
			$.ajax({
				type: 'POST',
				url:page.uploadToken,
				cache:true,
				success: function (data) {
					var token = JSON.parse(data).data;
					//console.info(token)
					window.qiNiuToken = token;
					var imgListStr = '';
					var Qiniu = new QiniuJsSDK()
					var option = {//实例化一个plupload上传对象
						runtimes: 'html5,flash,html4',
						browse_button: browse,
						uptoken: token,
						domain: 'https://image.momfo.com/',
						filters: {
							mime_types : [ //只允许上传图片和zip文件
								{ title : "Image files", extensions : "jpg,gif,png" },
								{ title : "Zip files", extensions : "zip" }
							],
							//max_file_size : '400kb', //最大只能上传400kb的文件
							prevent_duplicates : true //不允许选取重复文件
						},
						save_key: false,
						unique_names: false,
						init:{
							'FilesAdded':function (uploader, files) {//绑定文件添加进队列事件
								if(simpleFile&&uploader.files.length>1){
									uploader.splice(1);
									return alert('只能选择一张图片')
								}
								if(uploader.files.length>15){ // 最多上传15张图
									uploader.splice(15,999);
								}
								for (var i = 0, len = files.length; i < len; i++) {
									var file = files[i];
									if(/[\u4e00-\u9fa5]/g.test(file.name)){//上传的图片不能带中文
										uploader.removeFile(file.id)
										alert('上传图片名不能带中文,请修改后再上传')
									}else {
										var fileItem = file.getNative();
										var fileId = file.id;
										var ext = Qiniu.getFileExtension(file.name);
										var newName = 'persis/'+file.name.split('.')[0]+Date.now();
										var key = newName+"."+ext;
										file.name = key;
										var fr = new FileReader();
										var src = '';
										fr.onload = function (e) {
											src =  e.target.result;
                                          if(simpleFile){
                                            $div.html('')
										  }
                                         utility.showPic($div, fileId, src,key, isFull,imgType,id);
										};
										fr.readAsDataURL(fileItem);
									}
								}
							},
                          'BeforeUpload': function(up, file) {
                            // 每个文件上传前，处理相关的事情
							console.log('up',up);
							console.log(file)
                          },
							'FileUploaded': function(up, file, info) {
								// 每个文件上传成功后，处理相关的事情
								// 其中info是文件上传成功后，服务端返回的json，形式如：
								// {
								//    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
								//    "key": "gogopher.jpg"
								//  }
								var value = JSON.parse(info).key;
								imgListStr+=value+',';
								// 处理多张上传 0 已经上传几张图片之后继续上传
								if(!simpleFile){
									// var $uImgs= $div.find('.u-img');
                                 //  var reg =/data:image/;
                                 //  $.each($uImgs,function (i,uImg) {
									// var imgSrc = $(uImg).attr('endurl');
									// console.log(imgSrc);
									// if(!reg.test(imgSrc)){
									//   var isrc=imgSrc.split('.com/')[1];
                                 //      imgListStr+=isrc+','
									// }
                                 // })
								}
							},
							'UploadComplete': function (up) {
								var img = imgListStr.substring(0,imgListStr.length-1);
								//fileUploaded(img);
								resolve();
                                imgListStr = '';
								up.files.length = 0
							},
						}
					}
					if(simpleFile){//单文件设置
						option['multi_selection'] = false;
					}
					var uploader = Qiniu.uploader(option);
					//删除按钮
					$div.on('click','.remove',function () {
						var li = $(this).parents(".u-li");
                        var uImg= $div.find('.u-img');
					    var reg =/data:image/;
					    var imgSrc = $(uImg).attr('src');
                        if(!reg.test(imgSrc)){// 若已成功上传，需调用接口删除，有endurl属性标识
                          var isrc=imgSrc.split('.com/')[1];
                          utility.deleteImgInQiniu2(isrc,function () {
                            $(li).remove();
                         //   fileUploaded(isrc);
                          });
                          return false;
						}
						var id = $(li).attr("id");//还未上传到七牛云的删除
						uploader.removeFile(id);
                        $(li).remove();
					});
					//上传按钮
					$('#'+submit).click(function () {
						var len2 = uploader.files.length;
                      var $uImgs= $div.find('.u-img');
                      var reg =/data:image/;
                      $.each($uImgs,function (i,uImg) {
                        var imgSrc = $(uImg).attr('endurl');
                        if(!reg.test(imgSrc)){
                          var isrc=imgSrc.split('.com/')[1];
                          imgListStr+=isrc+','
                        }
                      });
                      var img = imgListStr.substring(0,imgListStr.length-1);
						if(simpleFile&&len2>1){
						  alert('只能上传一张图片,请重新上传');
						  return false;
						}else if(len2 == 0){
                            var uImgs= $div.find('.u-img').length;
                            //给ul加自定义属性data-noMust，来判断图片是否必传
                          	if(uImgs<1 && !$div.data("nomust")){
                              alert('请选择图片');
                              return false;
							}
							// if(simpleFile&&uImgs>0){
                             //  alert('只能上传一张图片,请重新上传');
                             //  return false;
							// }
                          fileUploaded(img);
                          imgListStr = '';
						}
						else {
							uploader.start();
							if(!All){
                            //  alert('上传成功');//上传后点击保存后提示成功
							}
                          fileUploaded(img);
                          imgListStr = '';
                        } //开始上传  endurl

					});
				},
				error:function (err) {
					alert('获取token失败')
				}
			})
		})
	},
	initUploadpicMul:function (ids,browses,submits, simpleFile, isFull,imgType,fileUploaded,submitAll) {
		if(!fileUploaded||typeof (fileUploaded)!='function'){
			console.info('建议传入一个回调函数')
			fileUploaded = function () {

			}
		}
		var len = ids.length;
		var promises = [];
		for(var i = 0;i<len;i++){
			var suc = utility.initUploadpic(ids[i],browses[i],submits[i],simpleFile, isFull,imgType,fileUploaded,submitAll);
			promises.push(suc)
		}
		$('#'+submitAll).click(function () {
			for(var i = 0;i<len;i++){
				$('#'+submits[i]).click()
			}
			// Promise.all(promises).then(function () {
			// //	alert('上传成功');
			// //	fileUploaded()
			// 	}
			// )
		})
	},
	/**
	 * 把图片资源加入到param参数中,返回false,验证不通过,返回true,验证通过
	 *  参数说明：
	 * 		param：是object,
	 * 		pic：是li标签的li,
	 * 		isMust：该图片是否是必须,0:非必须,默认必须
	 * 例如:
	 * 	utility.addParam(params, 'contractInfo'),
	 *  处理完后,params中就多了一个contractInfo,contractInfoD属性,(contractInfoD：是要删除的图片)
	 *  params.contractInfo:"persis/20161126111102530884.jpg,temp/20161126111142777658.jpg"
	 *  params.contractInfoD:"persis/20161126111102530812.jpg"
	 **/
	addParam: function(param, pic, isMust){
		if(!(param && pic)){
			return false;
		}
		var picd = pic + 'D';
		var picValue = '';
		var picdValue = '';
		$('[name="'+pic+'"]').each(function() {
			if($(this).attr("delete") == "true"){
				picdValue += $(this).find('img').attr('endurl') + ",";
			}else{
				picValue += $(this).find('img').attr('endurl') + ",";
			}
		});
		// 是否是必须,
		if('0' == isMust){

		}else{
			if(picValue == "") {
				var sp = $('#' + pic + '_uspan');
				if (sp.length > 0){
					sp.html('请上传图片！');
				} else {
					alert('请上传图片！');
				}
				return false;
			}
		}
		if(picValue){
			var picValues = picValue.substring(0, picValue.length - 1).split(',');
			if(picValues.length > 10){
				var sp = $('#' + pic + '_uspan');
				if (sp.length > 0){
					sp.html('图片过多,图片最多上传10张');
				} else {
					alert('图片过多,图片最多上传10张');
				}
				return false;
			}
			param[pic] = picValue.substring(0, picValue.length - 1);
		}
		if(picdValue){
			param[picd] = picdValue.substring(0, picdValue.length - 1);
		}
		console.log('图片接口参数params',param);
		return true;
	},
	/**
	 * 对上诉方法简化
	 * 把图片资源加入到param参数中,返回false,验证不通过,返回true,验证通过
	 * 参数说明：
	 * 		param：是object,
	 * 		pics：是li标签的li的name的数组,
	 * 例如:
	 * 	utility.addParamMore(params, ['picUrl', 'houseDetailPic', 'headPic']),--里面额图片都是必填的
	 *  处理完后,params中就多了几个属性,
	 *  params.picUrl:"persis/20161126111102530884.jpg,temp/20161126111142777658.jpg"
	 *  params.picUrlD:"persis/20161126111102530885.jpg"--要删除的图片
	 *  params.houseDetailPic:"persis/20161126111102530884.jpg,temp/20161126111142777658.jpg"
	 *  params.headPic:"persis/20161126111102530884.jpg,temp/20161126111142777658.jpg"
	 **/
	addParamMore: function(param, pics){
		if(!(param && pics)){
			return false;
		}
		if(typeof pics == 'object'){
			var res = true;
			$.each(pics, function(i, pic) {
				var re = utility.addParam(param, pic);
				if(!re){
					res = re;
				};
			});
			if(!res){
				return res;
			}
		}
		return true;
	},
	/**
	 * 显示图片的方法：对showInfoPics的封装
	 *  参数说明：
	 *  	arr：对象数组
	 *  	ids：对象中的含有需要显示图片的属性名称
	 *  例如：
	 *  utility.showPicsArray(data.data,['picUrl', 'houseDetailPic', 'headPic']);
	 **/
	showPicsArray: function(arr, ids, isFull){
		if(arr && ids){
			if(typeof arr == 'object'){
				$.each(arr, function(i, v) {
					utility.showInfoPicsMost(v, ids, isFull);
				});
			}
		}
	},
	/**
	 * 显示图片的方法：对showInfoPics的封装
	 *  参数说明：
	 *  	obj：对象
	 *  	ids：对象中的含有需要显示图片的属性名称
	 *  例如：
	 *  utility.showInfoPicsMost(data.data,['picUrl', 'houseDetailPic', 'headPic']);
	 **/
	showInfoPicsMost: function(obj, ids, isFull){
		if(obj && ids){
			if(typeof obj == 'object'){
				$.each(ids, function(i, id) {
					utility.showInfoPics(id, obj[id], isFull);
				});
			}
		}
	},
	/**
	 * 显示图片的方法：对showPic的封装
	 *  参数说明：
	 *  	id：$ul的id,也是li的name
	 *  	str：逗号分隔的串
	 **/
	showInfoPics: function(id, str, isFull){
		if(str && id){
			var $ul = $('#'+id);
			$ul.html('');
			var values = str.split(',');
			$.each(values, function(i, value) {
				utility.showPic($ul, id, value,value, isFull,id,id);
			});
		}
	},
	/**
	 * 显示图片的方法：对showPic的封装
	 *  参数说明：
	 *  	values：是数组
	 **/
	showPics: function($ul, id, values, isFull){
		$.each(values, function(i, value) {
			utility.showPic($ul, id, value, isFull);
		});
	},
	/**
	 * 显示图片的方法：作为基础的方法,共其它方法调用
	 *  参数说明：
	 *  	$ul：需要将图片li放入到的ul中的jQuery对象
	 *  	id：文件的id,七牛做的封装
	 *  	value：用于预览的src
	 *  	name:文件的Name,用于上传参数
	 *  	isFull：是否是全路径,0：非全路径,和value.value的值是一样的。其他：全路径,和value.get的值是一样的。默认是半路径
	 *  	imgType：0:无删除。1:有删除。2:无删除有下拉框。默认是有删除的
	 *  	container:容器的id
	 **/
	showPic: function($ul, id, value,name, isFull,imgType,container2){
		var src = "";
		var endurl = "";
		if(typeof value == 'object'){
			if (isFull) {
				src = value.get;
				endurl = value.get;
			} else {
				src = value.get;
				endurl = value.value;
			}
		}else if(typeof value == 'string'){
			var reg =/data:image/;
			var regHttp=/^http/;
			if(isFull){
              if(reg.test(value)){
                src =value;
                endurl = utility.picUrl+name;
              }else{
                if(!regHttp.test(value)){
                  src = utility.picUrl+value;
                }else{
                  src =value;
                }
                if(!regHttp.test(name)){
                  endurl = utility.picUrl+name;
                }else{
                  endurl = name;
                }
			  }

			}else{
				//非全路径
				if(reg.test(value)){
                  src =value;
                  endurl = name;
				}else{
                  if(!regHttp.test(value)){
                    src = utility.picUrl+value;
                  }else{
                    src =value;
                  }
                    endurl = name;
				}
			}
		}
		if(imgType == 0){
			$ul.append('<li class="u-li" id='+id+' name='+container2+' onmouseover="utility.showRemove(this)" onmouseout="utility.hideRemove(this)" >'
				+'<i></i>'
				+'<img class="u-img" src=' +src + ' endurl='+endurl+' />'
				+'</li>');
		}else if(imgType == 1){
			$ul.append('<li class="u-li" id='+id+' name='+container2+' onmouseover="utility.showRemove(this)" onmouseout="utility.hideRemove(this)">'
				+'<i></i>'
				+'<img class="u-img" src=' +src + ' endurl='+endurl+' />'
				+'<div class="u-remove" style="height: 0;">'
				+'<span style="font-size:20px;" class="u-cancel remove" >删除</span>'
				+'</div>'
				+'</li>');
		}else if(imgType == 2){
			$ul.append('<li class="u-li" id='+id+' name='+container2+' onmouseover="utility.showRemove(this)" onmouseout="utility.hideRemove(this)">'
				+'<i></i>'
				+'<img class="u-img" src=' +src + ' endurl='+endurl+' />'
				+'<div class="selectBox">'
				+'<i class="imgIcon"></i>'
				+'<div class="operateS">'
				+'<ul>'
				+'<li>编辑</li>'
				+'<li>置顶</li>'
				+'<li  class="remove">删除</li>'
				+'</ul>'
				+'</div>'
				+'</div>'
				+'</li>');
		} else {
			$ul.append('<li class="u-li" id='+id+' name='+container2+' onmouseover="utility.showRemove(this)" onmouseout="utility.hideRemove(this)">'
				+'<i></i>'
				+'<img class="u-img" src=' +src + ' endurl='+endurl+' />'
				+'<div class="u-remove" style="height: 0px;">'
				+'<span style="font-size:20px;" class="u-cancel remove" >删除</span>'
				+'</div>'
				+'</li>');
		}

	},
	//调整图片的大小
	resizePic: function(pic) {
		var $img = $(pic);
//		$img.hide();
//		$img.on('load',function(){
//			var rect = clacImgZoomParam(100, 100, this.width, this.height);
//			if (rect.width == 0 || rect.height == 0) {
//				$img.attr('width', 100 + 'px');
		$img.attr('height', 100 + 'px');
//			} else {
//				$img.attr('width', rect.width + 'px');
//				$img.attr('height', rect.height + 'px');
//				$img.css({
//					'marginLeft' : rect.left,
//					'marginTop' : rect.top
//				});
//			}
//			$img.show();
//		});
//		function clacImgZoomParam( maxWidth, maxHeight, width, height ){
//			param = {width:width,height:height,left:0,top:0};
//			if( width>maxWidth || height>maxHeight ){
//				rateWidth = width / maxWidth;
//				rateHeight = height / maxHeight;
//				if( rateWidth > rateHeight ){
//					param.width =  maxWidth;
//					param.height = Math.round(height / rateWidth);
//				}else{
//					param.width = Math.round(width / rateHeight);
//					param.height = maxHeight;
//				}
//			}
//			//居中显示
//			param.left = Math.round((maxWidth - param.width) / 2);
//			param.top = Math.round((maxHeight - param.height) / 2);
//			return param;
//		}
	},
	preview: function(id) {
		if(typeof(id) == "undefined") {
			id = page.id;
		}
		//https://www.momfo.com:9443/OGMP/houseInfo.htm?hid=${lbs:encode(house.houseId)}
//		var param = {};
//		param.value = page.id;
//		page.executeAjax({
//			url: "../../common/encode.do",
//			param: param,
//			success: function(data, param) {
//				if(data.errorCode == "SUCCESS") {
//					utility.open(page.nowUrl+"houseInfo.htm?hid="+data.data);
//				}
//			}
//		});
		// http://www.momfo.net/page/home/productdetail/productdetail.html?houseId=425
		utility.open(page.nowUrl+"page/home/productdetail/productdetail.html?houseId="+id);
	},
	//添加投资方数据,不带日期的,是T+X型的
	addtz : function($dataInfo){
		$dataInfo.append('<tr name="name1">' +
			'<td><input onblur="utility.checknum(this)" maxlength=2 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input onblur="utility.checknum(this)" maxlength=3 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>'+
			'</tr>');
	},
	//添加融资方数据,不带日期的,是T+X型的
	addrz: function($dataInfu) {
		$dataInfu.append('<tr name="name2">' +
			'<td><input onblur="utility.checknum(this)" maxlength=2 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input onblur="utility.checknum(this)" maxlength=3 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td>' +
			'<td><input maxlength=30 type="text" name="rentPeriods" class="input"></td></tr>');
	},
	//千分为分隔符
	//整数的千分位处理(强制保留两位)
	thousandBitSeparator: function(s) {
		if(s == '0' || !s){
			return '0.00';
		}
		s = s + '';
		var l = s.split('.')[0].split('').reverse(),
			r = s.split('.')[1];
		var t = '';
		if(l){
			for(var i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
			}
		}
		var re = '';
		if(r){
			if(r.length > 2){
				r = r.substr(0,2);
			} else {
				var l = r.length;
				while(l != 2){
					r = r + '0';
					l++;
				}
			}
			re = t.split('').reverse().join('') + '.' + r;
		}else{
			re = t.split('').reverse().join('') + '.00';
		}
		return re;
	},
	//千分为分隔符
	//整数的千分位处理(不强制保留两位)
	thousandBitSeparatorInt: function(s) {
		if(s == '0' || !s){
			return '0';
		}
		s = s + '';
		var l = s.split('.')[0].split('').reverse(),
			r = s.split('.')[1];
		var t = '';
		if(l){
			for(var i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
			}
		}
		var re = '';
		if(r){
			if(r.length > 2){
				r = r.substr(0,2);
			} else {
				var l = r.length;
				while(l != 2){
					r = r + '0';
					l++;
				}
			}
			re = t.split('').reverse().join('');
		}else{
			re = t.split('').reverse().join('');
		}
		return re;
	},
	//状态展示 0：× 1：√
	parseStatus:function(s){
		var t = s;
		if (s == "1") {
			return	t = '√';
		} else {
			return	t = "×";
		}
	},
	//时间格式的处理
	//2015-01-01 00:00:00.0 -> 2015-01-01
	parseDate : function(d){
		var r = d;
		if (d) {
			r = d.substr(0,10);
		} else {
			r = '';
		}
		return r;
	},
	//加法
	add : function(a1, a2){
		a1 = Number(a1);
		a2 = Number(a2);
		var cns = 10000;
		a1 *= cns;
		a2 *= cns;
		var re = a1 + a2;
		return Number((re/cns).toFixed(4));
	},
	//上传图片-显示删除
	showRemove: function(div){
		if($(div).find('img').is(":hidden")){
			return ;
		}
		$(div).children('div.u-remove').css({'height':'30px'});
	},
	//上传图片-隐藏删除
	hideRemove: function(div){
		if($(div).find('img').is(":hidden")){
			return ;
		}
		$(div).children('div.u-remove').css({'height':'0px'});
	},
	//删除图片
	removePicture: function(span){
		var li = $(span).parent().parent();
		$(li).hide();
		$(li).attr("delete","true");
	},
	//删除运营后台--网络维护图片
	removePicture2: function(span){
		var li = $(span).parents(".u-li");
		$(li).hide();
		$(li).attr("delete","true");
	},
	/**
	 * 检查图片是否上传
	 * 参数说明：
	 * 		arr：["picUrl"],
	 * 检查标准：是否有picUrl_uspan,如果有,就必填
	 * 检查标准：是否有_uspan,如果有,就必填
	 * **/
	testPic: function(arr){
		if (arr) {
			$.each(arr, function(i, v) {
				$("span[id$='" + v + "_uspan']").each(function() {
					var id = this.id.replace("_uspan", "");
					var $ul = $('#' + id);
					var lis = $ul.find('li');
					var has = false;
					$.each(lis, function(i, li) {
						var $li = $(li);
						if($li.is(":hidden") || $li.attr("delete") == "true"){
							//图片已经删除了
						} else {
							has = true;
						}
					});
					if(!has){
						$(this).html("请上传图片");
					}else{
						$(this).html("");
					}
				});
			});
		} else {
			$("span[id$='_uspan']").each(function() {
				var id = this.id.replace("_uspan", "");
				var $ul = $('#' + id);
				var lis = $ul.find('li');
				var has = false;
				$.each(lis, function(i, li) {
					var $li = $(li);
					if($li.is(":hidden") || $li.attr("delete") == "true"){
						//图片已经删除了
					} else {
						has = true;
					}
				});
				if(!has){
					$(this).html("请上传图片");
				}else{
					$(this).html("");
				}
			});
		}
	},
	/**
	 * 检查图片是否可以提交
	 * 参数说明：
	 * 		arr：["picUrl"],
	 * 检查标准：是否有picUrl_uspan,picUrl_uspan是否有内容,如果有,就不能提交，
	 * 		返回：true,可以提交。false,不可以提交。
	 * 检查标准：是否有_uspan,_uspan是否有内容,如果有,就不能提交，
	 * 		返回：true,可以提交。false,不可以提交。
	 * **/
	testPicCan: function(arr){
		var can = true;
		if (arr) {
			$.each(arr, function(i, v) {
				$("span[id$='" + v + "_uspan']").each(function() {
					if($(this).html().length > 0) {
						can = false;
					}
				});
			});
		} else {
			$("span[id$='_uspan']").each(function() {
				if($(this).html().length > 0) {
					can = false;
				}
			});
		}
		return can;
	},
	testPicAll: function(arr){
		utility.testPic(arr);
		return utility.testPicCan(arr);
	},
	// 检查是否可以提交,true可以提交,false不可以提交
	testData: function(arr){
		var can = true;
		if (arr) {
			$.each(arr, function(i, v) {
				// 触发blur中的判断-验证条件
				$("span[id$='" + v + "_span']").each(function() {
					blurChcek($g(this.id.replace("_span", "")));
                  if ($(this).html().length > 0) {
                    can = false;
                  }
				});
			});
		} else {
			// 触发blur中的判断-验证条件
			$("span[id$='_span']").each(function() {
				blurChcek($g(this.id.replace("_span", "")));
              if ($(this).html().length > 0) {
                can = false;
              }
			});
		}
		return can;
	},
	// 只能展示，不能编辑
	onlyShow: function(){
		// 上传图片按钮的代码移除
		utility.picShow();
		$("span[id$='_span']").remove();
		$("span[id$='_uspan']").remove();
		$("span.spaninfo").html('');
		// select
		$(".single-select .select-tit").css('border', 'none');
		$(".single-select .select-tit i").css({
			"border-left": "none",
			"background": "url('')"
		});
		$("input").css('border', 'none');
		$("input[type='text']").attr('disabled', true);
		$("input[type='number']").attr('disabled', true);
		$("select").css('border', 'none');
		$("textarea").css('border', 'none');
		$("textarea").attr('disabled', true);
		$(".editinfos").css('border', 'none');
		$(".editinfos").attr('disabled', true);
		$(".editinfo").css('border', 'none');
		$(".editinfo").attr('disabled', true);
		$(".single-select").attr('onclick', '');
		$(".single-select").unbind();
		$(".single-select .select-tit").attr('onclick', '');
		$(".single-select .select-tit").css('cursor', 'default');
		$(".single-select .select-tit").unbind();
		$(".single-select .select-tit i").attr('onclick', '');
		$(".single-select .select-tit i").unbind();
		$(".single-select .select-tit span").attr('onclick', '');
		$(".single-select .select-tit span").unbind();
	},
	picShow: function(){
		// 上传图片按钮的代码移除
		$("span.u-a").remove();
		$("input.u-input").remove();
		$("span.u-input-notify").remove();
		$("div.u-remove").remove();
	},
	edit: function(){
		$(".editinfos").css('border', '');
		$(".editinfo .single-select .select-tit").css('border', '');
		$(".editinfo .single-select .select-tit i").css({
			"border-left": "",
			"background": "url('../../Content/images/skin_icons.png') -49px -160px no-repeat"
		});
	},
	// 模拟 window.open(data.data);
	open : function(url) {
		$("body").append('<a style="display:none;" id="a_blank_open" href="' + url + '" target="_blank">' + url + '</a>');
		document.getElementById("a_blank_open").click();
		$("#a_blank_open").remove();
	},
	// 模拟var nw = window.open('_blank');
	//	  nw.document.write(data.data);
	openWrite: function(html){
		if (!html) {
			return;
		}
		var url = '';
		var content = html.substring(html.indexOf("<form"), html.indexOf("</form>"));
		var action = content.substring(content.indexOf("action='")+"action='".length, content.indexOf("' method=GET"));
		url += action;
		var temp = content;
		var intpus = [];
		var isFirst = true;
		while (temp.indexOf("<input") != -1) {
			if (isFirst) {
				url += "?";
				isFirst = false;
			} else {
				url += "&";
			}
			var input = temp.substring(temp.indexOf("<input"), temp.indexOf("/>")+"/>".length);
			temp = temp.substring(temp.indexOf(input) + input.length, temp.length);
			var n = input.substring(input.indexOf("name=") + "name=".length, input.indexOf("value"));
			var v = input.substring(input.indexOf("value=") + "value=".length, input.indexOf("/>"));
			url += n.replace(' ', '');
			url += '=';
			url += v.replace(' ', '');
		}
		util.open(url);
	},
	investTimeUnit: function(str, time) {
		if(time == 1) {
			return str + "天";
		} else if(time == 2) {
			return str + "个月";
		} else if(time == 3) {
			return str + "个季度";
		} else if(time == 4) {
			return str + "年";
		}
	},
	// 系统级的正则表达式
	// 对url的验证
	// reg_url : /^(http(s)?:\/\/)?([\w\.-]+)\.([\w\.]{2,6})([\/\w\W\.-]*)*\/?$/;
	   reg_url :/(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
};
function $g(_id) {
	return document.getElementById(_id);
}

//用于检查input框的输入内容的
//判断为空和判断是否符合格式要求
//当enull有值得时候,就判断是否为空,无值,就不做判断
//当check有值得时候,就判断非空的时候,的格式要求,err有值就判断格式,无值,就不做判断
function bChcek(obj) {
	var $span = $("#" + obj.id + "_span");
	$span.html("*");
	if (obj.value == "") {
		if(obj.attributes.enull)
			$span.html(obj.attributes.enull.value);
	} else if (obj.attributes.check) {
		var reg = obj.attributes.check.value;
		if(typeof utility[obj.attributes.check.value] == 'object'){
			reg = utility[obj.attributes.check.value];
		}
		if (reg.test(obj.value) == false) {
			if(obj.attributes.err)
				$span.html(obj.attributes.err.value);
		}
	}
}

// 用于检查input框的输入内容的
// 判断为空和判断是否符合格式要求
// 当enull有值得时候,就判断是否为空,无值,就不做判断
// 当check有值得时候,就判断非空的时候,的格式要求,err有值就判断格式,无值,就不做判断
function blurChcek(obj) {
	var $span = $("#" + obj.id + "_span");
	$span.html("");
	if (obj.value == "") {
		if(obj.attributes.enull)
			$span.html(obj.attributes.enull.value);
	} else if (obj.attributes.check) {
		var regv;
		if(typeof utility[obj.attributes.check.value] == 'object'){
          regv = utility[obj.attributes.check.value];
		} else{
          regv = utility[obj.attributes.check.value];
		}
		var reg=regv;
		var is=reg.test(obj.value);
		if (is) {
          $span.html("");
		}else{
          if(obj.attributes.err){
            $span.html(obj.attributes.err.value);
          }
		}
	}
}
