//© 2021 Sean Murdock

let phonenumber = "";
let onetimepassword = "";
let verifypassword = "";
let onetimepasswordRegEx=/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{6,40})/;

function setphonenumber(){
    userName = $("#phonenumber").val();
}

function setonetimepassword(){
    password = $("#onetimepassword").val();
    var valid=onetimepasswordRegEx.exec(onetimepassword);
    
}

function setverifyonetimepassword(){
    verifyonetimepassword = $("#verifypassword").val();
    if (verifyonetimepassword!=onetimepassword){
        alert('Passwords must be entered the same twice');
    }
}

function savetoken(token){
// whatever passes as token should save into local storage
    if (window.localStorage){
     localStorage.setItem("token", token);
    }

}

function checkexpiredtoken(token){
// read token from local storage - check with ajax call
    if(window.localStorage){
    usertoken = localStorage.getItem("token");
    $.ajax({
       type: 'GET',
        url: 'https://dev.stedi.me/validate/'+token,
        data: JSON.stringify({usertoken}),
        success: function(data){savetoken(data)},
        contentType: "application/text",
        dataType: 'text' })
    }
}

function userlogin(){
    setonetimepassword();
    setphonenumber();
    $.ajax({
        type: 'POST',
        url: 'https://dev.stedi.me/login',
        data: JSON.stringify({phonenumber, onetimepassword}),
        success: function(data) {
            window.location.href = "/timer.html#"+data;//add the token to the url
        },
        contentType: "application/text",
        dataType: 'text'
    });

}

function readonlyforms(formid){
    form = document.getElementById(formid);
    elements = form.elements;
    for (i = 0, len = elements.length; i < len; ++i) {
    elements[i].readOnly = true;
    }
    createbutton();
}
 function pwsDisableInput( element, condition ) {
        if ( condition == true ) {
            element.disabled = true;

        } else {
            element.removeAttribute("disabled");
        }

 }

function createbutton(){
    var button = document.createElement("input");
    button.type = "button";
    button.value = "OK";
    button.onclick = window.location.href = "/index.html";
    context.appendChild(button);
}


function createuser(){
    $.ajax({
        type: 'POST',
        url: 'https://dev.stedi.me/user',
        data: JSON.stringify({phonenumber, 'phonenumber': phonenumber, onetimepassword, 'verifyonetimePassword': vpwd, 'accountType':'Personal'}),//we are using the email as the user name
        success: function(data) { alert(data);
//        readonlyforms("newUser");
//        alert(readonlyforms("newUser"));
        window.location.href = "/index.html"},
        contentType: "application/text",
        dataType: 'text'
    });
}

function getstephistory(){
      $.ajax({
            type: 'POST',
            url: 'https://dev.stedi.me/stephistory',
            data: JSON.stringify({phonenumber}),
            success: function(data) { alert(data);
            json = $.parseJSON(data);
            $('#results').html(json.name+' Total Steps: ' + json.stepTotal)},
            contentType: "application/text",
            dataType: 'text'
        });
}

var enterFunction = (event) =>{
    if (event.keyCode === 13){
        event.preventDefault();
        $("#loginbtn").click();
    }
}

var onetimepasswordField = document.getElementById("onetimepassword");

onetimepasswordField.addEventListener("keyup", enterFunction);