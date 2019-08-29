var timerVar;
var iter = 1;



function myFunction() {
     
     var mess = document.getElementById('message');
     
     
     var status = document.getElementById('status');
     var timer = document.getElementById('timer');
     
     
     var huodata = document.getElementById('huodata');

     var huoprice = document.getElementById('huoprice');

     var object_length = document.getElementById('length');

     var socket = new WebSocket("wss://api.huobi.pro/ws");

     var uncompr = "";   


socket.onopen = function() {
  
  mess.innerHTML = "Connection established.";
  
  socket.send(JSON.stringify({ "req": "market.ethbtc.orders.1min", "id": "id1011" }));
  
};


  


socket.onclose = function(event) {
  if (event.wasClean) {
 
      mess.innerHTML = 'connection closed cleanly';
  } else {

      mess.innerHTML = 'disconnection';
  }

      mess.innerHTML = 'Code: ' + event.code + ' reason: ' + event.reason;
};




socket.onmessage = function(event) {

  uncompr = pako.ungzip(event.data,{ to: 'string' });

  obj = JSON.parse(uncompr);
  
    huodata.innerHTML = event.data;    //   No data coming   ???
   
//   huoprice.innerHTML = obj.data.price;
   
   object_length.innerHTML = event.data.length;

};




socket.onerror = function(error) {

   mess.innerHTML = "Error " + error.message;
};



function rdSta() {

     status.innerHTML = socket.readyState;

     timer.innerHTML = iter++;
	}
	
	
timerVar = setInterval(rdSta, 1000);	

}
    
   function stopTimer() {  
    
    clearInterval(timerVar);
}