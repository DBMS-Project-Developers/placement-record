function showAccessKey(){
    const signupRole = document.getElementById('signupRole');
    const accessDiv = document.getElementById('accessDiv');

    if(signupRole.value == "tnp"){
        accessDiv.style.display = "block";
    }
    else{
        accessDiv.style.display = "none";
    }
}