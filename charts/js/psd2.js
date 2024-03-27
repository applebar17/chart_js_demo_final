function getToken(){
//	var addr_url = document.location.href;
//	addr_url=addr_url.replace ("#","?");
//	var url = new URL(addr_url);
//	var Token = url.searchParams.get("access_token");
//	document.getElementById("userToken").value = Token;
	document.location='/ace/web/index.html#';//+Token;
//return Token;
}


function gettargetUrl(){
	var strUrl = document.getElementById("targetUrl").value;
	return strUrl;
}

function storeToken(){
	var message=""; 
	var SelCountry =  $("input[name='country']:checked").val();
	$.ajaxSetup({'async':false});
	$.get("/ace/storeToken", {token:document.getElementById('userToken').value,country:SelCountry}, function(responseText) { 
	   	alert(responseText);
	   	//if (responseText.status=='404') {
//	   		$(targetObj).empty();
//	   		$(targetObj).append( "BALANCE: Not Available");
//	   	}else{
//			$(targetObj).empty();
//	   		$(targetObj).append( "BALANCE:"+responseText.balances[0].amount.value);
//		}
	});
}
function getAccounts(){
	//Reading User Token 
	var addr_url = document.location.href;
	addr_url=addr_url.replace ("#","?");
	var url = new URL(addr_url);
	Token = url.searchParams.get("access_token");
	document.getElementById("userToken").value = Token;
	var HtmlContent = "";
	///get account list
	var request = new XMLHttpRequest();
	WebApiKey ='985c7631-4a88-41fe-99b2-56e987014e2a';
	var SelCountry =  $("input[name='country']:checked").val();

	if (SelCountry=='CSAS'){
		BaseUrl='https://webapi.developers.erstegroup.com/api/csas/public/sandbox/v1/account-information/my/accounts?size=&page=&sort=&order=';	
		request.open('GET', BaseUrl);
		request.setRequestHeader('WEB-API-key', WebApiKey);
		request.setRequestHeader('Authorization', 'Bearer '+ Token );
		request.onreadystatechange = function () {
		  if (this.readyState === 4) {
		   	var obj = JSON.parse(this.responseText);
			$("#Accounts").empty();
				for (var  i = 0; i < obj.accounts.length; i++) {
					HtmlContent = "<div id=\"Account_"+i+ " \">";
					HtmlContent+= "<font color='blue'>ID:</font><font color='red'>" +obj.accounts[i].id + "<br>";
					HtmlContent+= "<font color='blue'>IBAN:</font><font color='red'>" +obj.accounts[i].identification.iban + "<br>";
					HtmlContent+= "<font color='blue'>CURRENCY:</font><font color='red'>" +obj.accounts[i].currency + "<br>";
					HtmlContent+= "<font color='blue'>NAME:</font><font color='red'>" +obj.accounts[i].nameI18N + "<br>";
					HtmlContent+= "<font color='blue'>PRODUCT:</font><font color='red'>" +obj.accounts[i].productI18N + "<br>";
					HtmlContent+= "<font color='blue'>BIC:</font><font color='red'>" +obj.accounts[i].servicer.bic + "<br>";
					HtmlContent+= "<font color='blue'>BANK CODE:</font><font color='red'>" +obj.accounts[i].servicer.bankCode + "<br>";
					HtmlContent+= "<div id=\"bln_"+obj.accounts[i].id+"\"><font color='blue'>BALANCE:</font>             <font color='red'><a href=\"javascript:getAccBln('" + obj.accounts[i].id + "')\">Show Balances</a></div><br>";
					HtmlContent+= "<div id=\"trx_"+obj.accounts[i].id+"\"><font color='blue'>List of Transactions:</font><font color='red'>   <a href=\"javascript:getTrx('" + obj.accounts[i].id + "')\">Show Transactions</a></div><br>";
					HtmlContent+= "<hr>";
					$("#Accounts").append( HtmlContent);
				}
			}
			
		};
		request.send();
	}

				 
	if (SelCountry=='AT'){
		var consentID="";
		consentID=getConsent(Token);
		var accounts="";
		accounts=getAccountsPSD2(consentID,SelCountry,Token);
	   	var obj = JSON.parse(accounts);
		$("#Accounts").empty();
		for (var  i = 0; i < obj.accounts.length; i++) {
			HtmlContent = "<div id=\"Account_"+i+ " \">";
			HtmlContent+= "<font color='blue'>ID:</font><font color='red'>" +obj.accounts[i].resourceId + "<br>";
			HtmlContent+= "<font color='blue'>IBAN:</font><font color='red'>" +obj.accounts[i].iban + "<br>";
			HtmlContent+= "<font color='blue'>CURRENCY:</font><font color='red'>" +obj.accounts[i].currency + "<br>";
			HtmlContent+= "<font color='blue'>NAME:</font><font color='red'>" +obj.accounts[i].name + "<br>";
			HtmlContent+= "<font color='blue'>PRODUCT:</font><font color='red'>" +obj.accounts[i].product + "<br>";
			HtmlContent+= "<font color='blue'>BIC:</font><font color='red'>" +obj.accounts[i].bic + "<br>";
			//HtmlContent+= "<font color='blue'>BANK CODE:</font><font color='red'>" +obj.accounts[i].servicer.bankCode + "<br>";
			HtmlContent+= "<div id=\"bln_"+obj.accounts[i].id+"\"><font color='blue'>BALANCE:</font>             <font color='red'><a href=\"javascript:getAccBln('" + obj.accounts[i].id + "')\">Show Balances</a></div><br>";
			HtmlContent+= "<div id=\"trx_"+obj.accounts[i].id+"\"><font color='blue'>List of Transactions:</font><font color='red'>   <a href=\"javascript:getTrx('" + obj.accounts[i].id + "')\">Show Transactions</a></div><br>";
			HtmlContent+= "<hr>";
			$("#Accounts").append( HtmlContent);
		}
	}
	
	if (SelCountry=='BCR')
		BaseUrl='https://webapi.developers.erstegroup.com/api/bcr/public/sandbox/v1/account-information/my/accounts?size=&page=&sort=&order=';

	if (SelCountry=='SLSP') {
		BaseUrl='https://webapi.developers.erstegroup.com/api/slsp/sandbox/v1/tppapi/v1/consents';
		request.open('POST', BaseUrl);
		request.setRequestHeader('web-api-key', WebApiKey);
		request.setRequestHeader('Authorization', 'Bearer '+c );
		request.setRequestHeader('Accept', 'application/json' );
		request.setRequestHeader('Content-Type', 'application/json' );
		request.setRequestHeader('cache-control', 'no-cache' );
		request.onreadystatechange = function () {
		  	if (this.readyState === 4) {
		   		var obj = JSON.parse(this.responseText);
				alert(obj);
			}
		};
		
		var body= {'access':{'accounts':[{'iban':'SK654849843218911321'},{'iban':'SK889795128498486644'}]},
					'recurringIndicator': false,
					'validUntil':'2020-12-31',
					'frequencyPerDay': '5',
					'combinedServiceIndicator':false};
		//request.send(body);
		request.send(JSON.stringify(body));
	}


//		BaseUrl='https://webapi.developers.erstegroup.com/api/slsp/sandbox/v1/tppapi/v1/accounts';




}


function getAccBln(idAcc){
	var SelCountry=$("input[name='country']:checked").val();
	var message="";
	targetObj="#bln_"+idAcc;
   	$(targetObj).empty();
   	$(targetObj).append("BALANCE:<img style='height:12px;width:40px;' src='/ace/web/img/loading.gif'/>");

	$.ajaxSetup({'async':false});
	$.get("/ace/getAccountBalance", {accountID:idAcc ,userToken:document.getElementById('userToken').value,country:SelCountry}, function(responseText) { 
	   	if (responseText.status=='404') {
	   		$(targetObj).empty();
	   		$(targetObj).append( "<font color='blue'>BALANCE:</font><font color='red'> Not Available</font>");
	   	}else{
			$(targetObj).empty();
	   		$(targetObj).append( "<font color='blue'>BALANCE:</font><font color='red'>"+responseText.balances[0].amount.value+ " " + responseText.balances[0].amount.currency +"</font>");
		}
	});
}

function getConsent(idAcc){
	$.ajaxSetup({'async':false});
	$.get("/ace/getConsentID", {userToken:idAcc}, function(responseText) { 
	   	if (responseText!='') {
	   		console.log ( "OK");
			consentID = '1234-wertiq-983';
	   	}else{
	   		console.log ( "KO");
		}
	});
return consentID;
}

function getAccountsPSD2(param1,param2,param3){
msgresp="";	
	$.ajaxSetup({'async':false});
	$.get("/ace/getAccountsBG", {consentID:param1, country:param2, userToken:param3}, function(responsetext) { 
		console.log('GetAccountsPSD2:success');
		msgresp=responsetext;
	}).fail(function() {
    	alert('woops'); 
    });
return msgresp;
}


function testkey(idAcc){
	token= getToken();

	$.ajaxSetup({'async':false});
	$.get("/ace/testkey" , {userToken: token}, function(responseText) { 
	   	if (responseText.status=='404') {
	   		console.log ( "OK");
	   	}else{
	   		console.log ( "KO");
		}
	});
}
function testkey2(idAcc){
	token= getToken();
	strUrl= gettargetUrl();

	$.ajaxSetup({'async':false});
	$.get("/ace/testkey2" , {userToken: token, targetUrl: strUrl}, function(responseText) { 
	   	if (responseText.status=='404') {
	   		console.log ( "OK");
	   	}else{
	   		console.log ( "KO");
		}
	});
}

function ATClient(idAcc){
	//token= getToken();
//	strUrl= gettargetUrl();

	$.ajaxSetup({'async':false});
	$.get("/ace/testAT" , {}, function(responseText) { 
	   	if (responseText.status=='404') {
	   		console.log ( "OK");
	   	}else{
	   		console.log ( "KO");
		}
	});
}

function getTrx(idAcc){
	var SelCountry=$("input[name='country']:checked").val();
	var message="";

	targetObj="#trx_"+idAcc;
   	$(targetObj).empty();
   	$(targetObj).append("List of Transactions:<img style='height:12px;width:40px;' src='/ace/web/img/loading.gif'/>");
	$.ajaxSetup({'async':false});
	$.get("/ace/getTransaction", {accountID:idAcc ,userToken:document.getElementById('userToken').value,country:SelCountry}, function(responseText) { 
	   	$(targetObj).empty();
   		$(targetObj).append("<font color='blue'>List of Transactions:</font><font color='red'><br>");
		for (var  i = 0; i < responseText.transactions.length; i++) {
			amount= responseText.transactions[i].amount.value;
			date = responseText.transactions[i].bookingDate.date;
			dateFormat = $.datepicker.formatDate('dd mm yy', new Date(date.substring(0, 10)));
			
		//	if (responseText.transactions[i].entryDetails.transactionDetails.hasOwnProperty('additionalTransactionInformation'))
		//		additionalTransactionInformation=  responseText.transactions[i].entryDetails.transactionDetails.additionalTransactionInformation;
			
		//	if (responseText.transactions[i].entryDetails.transactionDetails.amountDetails.instructedAmount.amount.hasOwnProperty('currency'))
		//		currency = responseText.transactions[i].entryDetails.transactionDetails.amountDetails.instructedAmount.amount.currency;

		//	if (responseText.transactions[i].entryDetails.transactionDetails.remittanceInformation.unstructured != undefined)
		//		unstructured = responseText.transactions[i].entryDetails.transactionDetails.remittanceInformation.unstructured;

			$(targetObj).append((i+1)  + "|" +  dateFormat + "|" + formatNumber(amount) + "<br> ");

		}

	});
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}