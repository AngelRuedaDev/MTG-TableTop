function setHeight(){
    let main = document.getElementById('main').style.height;
    let side = document.getElementById('side').style.height;

    if(side>main){
        document.getElementById('main').style.height = side;
    }
    else
    {
        document.getElementById('side').style.height = main;
    }
}