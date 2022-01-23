import {CountUp} from "./countUp.js";

var selected = []
for (var i = 1; i <= 8; i++) {
    var r = Math.floor(Math.random() * 20)
    while (selected.includes(r)) {
        r = Math.floor(Math.random() * 20)
    }
    selected.push(r)
    console.log("cim" + i)
    document.getElementById("cim" + i).src = "images/covers/" + r + ".jpg";
}

function countStart(){
    fetch("/count").then(response =>response.json()).then(data => {
        var demo = new CountUp('playercount', data.count)
        demo.start();
    })
}

ScrollReveal().reveal('#playercount',{
    beforeReveal: countStart
});

function updatePlayerCount(){
    fetch("/count").then(response =>response.json()).then(data => {
        document.getElementById("playercount").innerHTML = data.count;
    })
}


$('#idinput')
    .ajaxForm({
        url : '/idsubmit', // or whatever
        dataType : 'json',
        error: function (response) {
            if(response.status === 200){
                document.getElementById("inputsuccess").innerHTML = "Success! You've been added."
                document.getElementById("inputerror").innerHTML = ""
                refreshAndRender()
                updatePlayerCount()
            }else if(response.status === 401){
                document.getElementById("inputsuccess").innerHTML = ""
                document.getElementById("inputerror").innerHTML = "There's already someone with the same name and tag!"
            }else{
                document.getElementById("inputsuccess").innerHTML = ""
                if(document.getElementById("riotid").innerText === ""){
                    document.getElementById("inputerror").innerHTML = "Can't be empty!"
                }else if(!document.getElementById("riotid").value.startsWith("SDN") && !document.getElementById("riotid").value.includes("#")){
                    document.getElementById("inputerror").innerHTML = "Your name must start with SDN and you are missing the tag!"
                }else if(!document.getElementById("riotid").value.includes("#")){
                    document.getElementById("inputerror").innerHTML = "You are missing the tag!"
                }else if(!document.getElementById("riotid").value.startsWith("SDN")){
                    document.getElementById("inputerror").innerHTML = "Your name must start with SDN!"
                }else{
                    document.getElementById("inputerror").innerHTML = "Server error. Report to errors@joinSDN.com"
                }
            }
        }
    })
;