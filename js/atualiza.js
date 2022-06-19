var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function{
    if(xhr.readyState == 4 && xhr.status == 200){
        alert (xhr)
    }
}

xhr.open("GET","http://localhost:8080/produtos/6")

xhr.send();