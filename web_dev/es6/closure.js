// Closures
var me = 'Bruce Wayne'
function greetMe() {
  console.log('Hello, ' + me + '!');
}

me = 'Batman';
greetMe();


//JQuery
function sendRequest() {
  var requestID='123';
  $.ajax({
    url: '/myUrl',
    success: function(response) {
      alert('Request ' + requestID + ' returned')
     }
   });
}
    

