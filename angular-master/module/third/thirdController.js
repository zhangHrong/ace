/**
 * Created by huangyao on 2017/7/14.
 */
app.controller('third',function($scope, $filter, $location, $rootScope, $stateParams, FileUploader){
// 	$(function(){  
// 		var odv = document.getElementById("ssssrt")
// 		odv.oncontextmenu = function(){ 
// 			return false; 
// 		}
// 		odv.onkeydown = function(){ 
// 			if (event.ctrlKey && window.event.keyCode==67){ 
// 				return false; 
// 			} 
// 			if (event.ctrlKey && window.event.keyCode==86){ 
// 				return false; 
// 			} 
// 		} 
// 		odv.oncopy = function (){ 
// 			return false; 
// 		} 
// 		odv.onselectstart = function(){ 
// 			//return false; 
// 		} 
// 		odv.onmousedown = function(e){
// 			if(1 == e.which){ 
// 				return false;
// 		
// 			} 
// 		}
//     })
	
	$(".sec1").addClass("disab").find("span").html("123").attr("data-id",4);
	// 查询下拉选项
	function carSellist(rmId) {
		var presSataList = {
			"txCode": "I9999999",
			"serviceCode": "I0000014",
			"signPkcs7": "0",
			"sysHead":[{
				"inrUsrId": "90000000000000000001",
				"signNm": "71100101N2",
				"blngDeptCode": "01",
				"businInstId": "111001",
				"rootInstId": "111001",
				"funccode": "CASH_POOL",
				"menutype": "0",
				"sysCode":"COIM",
				"preIp": "22.5.24.187",
				"preMac": "1",
				"clientIp": "127.0.0.1",
				"clientMac": "1"
			}],
			"parmId":rmId//下拉id
		}
		main.ajax(
			"./jsonDate/sce.json",
			"get",
			function(e) {
				$scope.$apply(function() {
					$scope.parmidList = e.parm;
				});
			},JSON.stringify(presSataList)
		);
	}
	//下拉上送的parmId
	carSellist("CashPoolStt");
	//查询列表
	function queryPresList() {
		var presDataList = {
			"txCode": "I9999999",
			"serviceCode": "I0013301",
			"signPkcs7": "0",
			"sysHead": [{
				"inrUsrId": "90000000000000000001",
				"signNm": "71100101N2",
				"blngDeptCode": "01",
				"businInstId": "111001",
				"rootInstId": "111001",
				"funccode": "CASH_POOL",
				"menutype": "0",
				"sysCode": "COIM",
				"preIp": "22.5.24.187",
				"preMac": "1",
				"clientIp": "127.0.0.1",
				"clientMac": "1"
			}],
			"pageSize": "10", //请求条数
			"reqPage": "1", //请求页码
			"groupNm": $("#groupNm").val() || "", //集群名称
			"cashPoolNm": $("#cashPoolNm").val() || "", //现金池名称
			"cashPoolId": $("#cashPoolId").val() || "", //现金池账号
			"imstt": $("#imstt").attr("data-value") || "", //现金池状态  
		}
		main.ajax(
			"./jsonDate/table.json",
			"get",
			function(e) {
				$scope.$apply(function() {
					$scope.tCashPoolInfTmp = e.mmkMenuList2;
				});
				select();
				check();
			},
			JSON.stringify(presDataList)
		);
	}
	queryPresList();
	//删除
	$scope.del = function(){
		var checkVla = $(".careinput input").filter(":checked").length;
		if(checkVla==0||checkVla>1){
			alert("请选择一条数据！");
		}else{
			confirm("请确认是否删除？",function(){
				$(".careinput input").each(function(){
					if (this.checked) {
						var _i = $(this).parents("tr").index();
						$scope.$apply(function(){
							$scope.tCashPoolInfTmp.splice(_i,1);
						});
						alert("删除成功！")
					}
				})
			})
		}
		
	}
	//新增
	$scope.add = function(){
		$("#queryName").val("");
		$("#poolType").attr("data-id","");
		$("#poolType").html("请选择");
		$("#poolName").val("");
		$("#queryAccno").val("");
		layer.open({
			type:1,
			skin: 'layui-layer-molv',
			move: false,
			btn:["提交", "取消"],
			btnAlign: "c",
			area:['800px','300px'],
			content:$(".pup"),
			btn1: function(index) {
				if($.checkout.isEmpty($("#queryName").val())){
					alert("集群名称不能为空！");
					return false;
				}else if($("#poolType").attr("data-id")==""){
					alert("现金池状态不能为空！");
					return false;
				}else if($.checkout.isEmpty($("#poolName").val())){
					alert("现金池名称不能为空！");
					return false;
				}else if($.checkout.isEmpty($("#queryAccno").val())){
					alert("现金池账号不能为空！");
					return false;
				}else{
					var queryArr = [];
					queryArr.push({
						"accno":$("#queryName").val(),
						"parmId":$("#poolType").attr("data-id"),
						"parcNm":$("#poolType").html(),
						"emon":$("#poolName").val(),
						"advonset":$("#queryAccno").val()
					});
					if(queryArr){
						$scope.$apply(function(){
							$scope.tCashPoolInfTmp=queryArr.concat($scope.tCashPoolInfTmp);	
						});
					}
					console.log(queryArr);
					console.log($scope.tCashPoolInfTmp);
					alert("新增成功！");
					layer.close(index);
					//新增数据之后重新渲染
					select();
					check();
				}
			
			},
			btn2: function(index) {
				layer.close(index);
			}
		})
	}
	//修改
	$scope.amend = function(){
		var checkVla = $(".careinput input").filter(":checked").length;
		if(checkVla==0||checkVla>1){
			alert("请选择一条数据！");
		}else{
			$(".careinput input").each(function(){
				if (this.checked) {
					var _i = $(this).parents("tr").index();
				    $scope.checkedAmend = $scope.tCashPoolInfTmp[_i];
					// $rootScope.careDate = $scope.checkedAmend   $rootScope暂时性存储的数据 页面刷新就会清空
					//$location.path('/second/careMoneyaddAcconListadd'+ifOvaue+"&"+ifCareno+"&"+ifEnseno);

					$("#queryName").val($scope.checkedAmend.accno);
					$("#poolType").attr("data-id",$scope.checkedAmend.parmI);
					$("#poolType").html($scope.checkedAmend.parcNm);
					$("#poolName").val($scope.checkedAmend.emon);
					$("#queryAccno").val($scope.checkedAmend.advonset);
				}
			})
			layer.open({
				type:1,
				skin: 'layui-layer-molv',
				move: false,
				btn:["提交", "取消"],
				btnAlign: "c",
				area:['800px','300px'],
				content:$(".pup"),
				btn1: function(index) {
					$scope.$apply(function(){
						$scope.checkedAmend.accno = $("#queryName").val();
						$scope.checkedAmend.parmI = $("#poolType").attr("data-id");
						$scope.checkedAmend.parcNm = $("#poolType").html();
						$scope.checkedAmend.emon = $("#poolName").val();
						$scope.checkedAmend.advonset = $("#queryAccno").val();
					});
					layer.close(index);
				},
				btn2: function(index) {
					layer.close(index);
				}
			})
		}
	}
	//详情
	$scope.detil = function(querylist){
		$scope.ditil = querylist;
		layer.open({
			type:1,
			skin: 'layui-layer-molv',
			move: false,
			btn:["打印", "取消"],
			btnAlign: "c",
			area:['800px','300px'],
			content:$(".pup-ditile"),
			btn1: function(index) {
				layer.close(index);
				$(".pup-ditile").jqprint({
					debug: false,
					importCSS: true,
					printContainer: true,
					operaSupport: false,
					noPrintSelector:".noPrint",//不想打印的元素的jQuery选择器，默认为".no-print"
				})
			},
			btn2: function(index) {
				layer.close(index);
			}
		})
	}
	//angularjs ng-file-upload上传控件测试demo
	$scope.uploadStatus = false; 
	var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php',
        queueLimit: 1,     //文件个数 
        removeAfterUpload: true   //上传后删除文件
    });
	$scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
        uploader.clearQueue();
    }
	var filsize=null;
	uploader.onAfterAddingFile = function(fileItem) {
        $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
		filsize = $scope.fileItem.size/1000;
		
	};
	uploader.onSuccessItem = function(fileItem, response, status, headers) {
        $scope.uploadStatus = true;   //上传成功则把状态改为true
    };
	$scope.UploadFile = function(){
		console.log(filsize);
        uploader.uploadAll();
        if(status){
         		alert('上传成功！');
         }else{
         		alert('证书成功！私钥失败！');
         }     
    }

})