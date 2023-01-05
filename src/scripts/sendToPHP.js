const SUCCESS = 1

const uploadData = (data) => {

    console.log(data.time)
    console.log(data.date)
    console.log(data.longitude)
    console.log(data.latitude)
    console.log(data.repType)
    console.log(data.description)
    //console.log(data.img)
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let res = JSON.parse(xhttp.response)
            console.log(res)
            if (res == SUCCESS) {
                console.log("Exito: " + res)
            } else {
                console.log("ERROR :(")
            }
        }
        else{
            console.log("en else")
            console.log(this.readyState)
            console.log(this.status)
        }
    }

    let s = "hora="+data.time+"&dia="+data.date+"&lat="+data.latitude+"&lon="+data.longitude+"&denuncia="+data.repType+"&descripcion="+data.description+"&data="+data.img

    xhttp.open('POST', '', true)
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(s)
}

export { uploadData }