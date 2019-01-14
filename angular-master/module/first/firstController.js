/**
 * Created by huangyao on 2017/7/14.
 */
app.controller('first', function($scope, $location, $rootScope, $filter) {
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
						$scope.tCashPoolInfTmp = e.mmkMenuList;
					});
				},
				JSON.stringify(presDataList)
			);
		}
		queryPresList();
})