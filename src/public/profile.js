var isHS = getCookie("clientIsHS");
var clientName = JSON.parse(getCookie("clientName"));

var clientClasses = getCookie("clientClasses");
clientClasses = JSON.parse(clientClasses);

var clientHLs = getCookie("clientHls");
clientHLs = JSON.parse(clientHLs);


var clientLunches = getCookie("clientLunch");
clientLunches = JSON.parse(clientLunches);


document.getElementById("name").value = clientName;

if (getCookie('clientIsHS') === "true") isHS = 1;
else isHS = 2;

console.log(getCookie("clientIsHS"));
console.log(isHS);

document.getElementById("isHS").value = isHS;

for (let i = 0; i < clientClasses.length; i++) {
    document.getElementById("class"+ (i+1)).value = clientClasses[i];
    if(clientHLs[i] == true) document.getElementById("hl" + (i+1)).checked=true;
    document.getElementById("lunch"+(i+1)).value =  clientLunches[i];


}





function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}
