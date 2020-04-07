var PARSE_APP_ID = "VCAo1ZNe84TnwroddK5Jj4JpL4kTm5diW7RGldQU";
var PARSE_JS_KEY = "iEPG08bFBFiPMFsUTK84aeKsvNcfBCbnioSixdOX";
var PARSE_URL = "https://parseapi.back4app.com/";

// Parse Initialize
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/'

function createUserPw() {

    $.ajax({
    url: "https://parseapi.back4app.com/users",
    dataType: "json",
    type: "post",
    headers: {
        "X-Parse-Application-Id":"VCAo1ZNe84TnwroddK5Jj4JpL4kTm5diW7RGldQU",
        "X-Parse-REST-API-Key":"9ngYGxCLQNkANAycRAk8HoE1RRxrcX18fgc8V80C",
        "X-Parse-Revocable-Session":"1"
    },
    data: {
        "password": localStorage.getItem('password'),
        "username": localStorage.getItem('email'),
        "email": localStorage.getItem('email')
        }
    });
}