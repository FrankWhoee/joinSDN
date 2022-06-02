function refreshAndRender(){
    fetch("/logsapi")
        .then(response => response.json())
        .then(data => {
            var tb = document.getElementById("logtable");
            for(var i = 0; i < data.length; i++){
                tb.innerHTML += ("<tr>"+
    "<td>"+data[i].iphash+"</td>"+
    "<td>"+data[i].country+"</td>"+
    "<td>"+data[i].region+"</td>"+
    "<td>"+data[i].city+"</td>"+
     "<td>"+data[i].time_visited+"</td>"+
 "</tr>")
            }
        });

}

refreshAndRender()



