/**
 * Created by huangyao on 2017/7/14.
 */
app.controller('second',function($scope, $filter, $location, $rootScope, $stateParams){
	treeTab();
	function treeTab(){
		//设置ztree默认属性
		var setting = { 
			view:{ 
					showLine: false,//显示连接线 
					showIcon: true,//显示节点图片 
					fontCss: {color:"#04867A"} 
				}, 
			data:{
				simpleData:{
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: 0
				}
			},
			callback: {   
				onClick: onClick  
			}
			
		};
		//ajax请求数据
		main.ajax(
			"./jsonDate/tree.json",
			"get",
			function(data) {
				$scope.$apply(function() {
					$scope.tCashPoolInfTmp = data.nodes;
					$.fn.zTree.init($("#ztree"), setting, $scope.tCashPoolInfTmp);
				});
			}
		);
		//进页面之后为首页添加默认的地址
		$scope.filename = "views/etrees/childrenIndex.html";
		//点击切换首页时 重新为首页绑定默认地址 并添加点击样式
		$scope.indexType = function($event){
			$($event.target).addClass("active");
			$($event.target).parent("li").siblings().find("a").removeClass("active");
			$scope.filename = "views/etrees/childrenIndex.html";
		}
		//点击菜单的回调函数
		function onClick(event, treeId, treeNode, clickFlag) {
			//event js event 对象标准的 js event 对象
			//treeId  String 对应 zTree 的 treeId，便于用户操控
			//treeNode  JSON 被选中的节点 JSON 数据对象
			if(treeNode.link){
				showPanel(treeNode);
				
			}
			//点击树菜单子节点 获取当前id 与 a标签data-id作对比 如果相等添加选中样式
			$(".navlist li").each(function(index){
				var tabId = $(this).find("a").attr("data-id");
				if(treeNode.id==tabId){
					$(this).find("a").addClass("active");
					$(this).siblings().find("a").removeClass("active");
				}
				
			})
			
		}
		var arryTab = [];//循环列表的数组
		function showPanel(treeNode){
			if($(".navlist li").length>1){
				var arryTid = [];//存储验重id的数组
				for(var i=0; i<$scope.arryTab.length; i++){
					arryTid.push($scope.arryTab[i].id);
				}
			}
			console.log(arryTid);
			if($(".navlist li").length>0){
				if($.inArray(treeNode.id,arryTid)==-1){
					arryTab.push({"id":treeNode.id,"name":treeNode.name,"link":treeNode.link});
				}
			}
			$scope.$apply(function(){
				$scope.arryTab = arryTab;
				$scope.filename = treeNode.link;
			})
			console.log(arryTab);
		};
		//点击a标签 切换点击样式
		$scope.linkType = function($event){
			var _i = $($event.target).parent().index();
			$($event.target).addClass("active").parent("li").siblings().find("a").removeClass("active");
			$scope.filename = $scope.arryTab[_i-1].link;
		}
		
	}
	
})
app.controller('childrenindex',function($scope, $filter){
	select();
	// 文本框千分符 默认2位小数
	$(".inp").on({
		"focus":function(){
			var inpval = $(".inp").val();
			if(inpval!=""&&inpval!=null&&inpval!=undefined){
				if($scope.inpval){
					$(".inp").val($scope.inpval);
				}
				
			}else{
				$scope.inpval="";
			}
			
		},
		"blur":function(){
			var inpval = $(".inp").val();
			if(inpval!=""&&inpval!=null&&inpval!=undefined){
				$scope.inpval = inpval;
				if(inpval.indexOf(",")==-1){
					$scope.num = $filter('number')($(".inp").val(),2);
					$(".inp").val($scope.num);
				}
			}
			
			
		}
	})

	$(function(){
		var mychart1 = echarts.init(document.getElementById('main1'),'dark');
		var labelRight = {
			normal: {
				position: 'right'
			}
		};
		mychart1.setOption({
			title: {
				text: '交错正负轴标签',
				subtext: 'From ExcelHome'
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				top: 80,
				bottom: 30
			},
			xAxis: {
				type : 'value',
				position: 'top',
				splitLine: {lineStyle:{type:'dashed'}},
			},
			yAxis: {
				type : 'category',
				axisLine: {show: false},
				axisLabel: {show: false},
				axisTick: {show: false},
				splitLine: {show: false},
				data : ['five', 'four', 'three', 'two', 'one']
			},
			series : [
				{
					name:'生活费',
					type:'bar',
					color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
					stack: '总量',
					label: {
						normal: {
							show: true,
							formatter: '{c}'
						}
					},
					data:[
						{
							value: -4917, label: labelRight,
							
						},
						{
							value: -194084, label: labelRight,
							
						},
						
						{
							value: 615415, label: labelRight,
							
						},
						{
							value: 61748, label: labelRight,
							
						},
						{
							value: -277918, label: labelRight,
								
						}
					]
				}
			]
		});
		var mychart2= echarts.init(document.getElementById('main2'),'light');
		mychart2.setOption({
			tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: 'left'
				},
			series:[
					{
						name:'111',
						type:'pie',
						radius: ['50%', '70%'],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: 'center'
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: '30',
									fontWeight: 'bold'
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data:[
							{value:3000, name:''},
							{value:1000, name:''}
						]
					}
				]
		});
	})
	var noHis = "2017-06-22";
	var haveHis = "2017-06-22 00:00:01";
	var oNoHis = $.myTime.DateToUnix(noHis); // 1498060800
	var ohaveHis = $.myTime.DateToUnix(haveHis); // 1498123193
	console.log(oNoHis);
	console.log(ohaveHis);
	//将时间戳转化为时间对象
	var HisBack = "1498060800";
	var HaveHisBack = "1498123193";
	var oHisBack = $.myTime.UnixToDate(HisBack);
	var oHaveHisBack = $.myTime.UnixToDate(HaveHisBack);
	console.log(oHisBack);
	console.log(oHaveHisBack);
})	