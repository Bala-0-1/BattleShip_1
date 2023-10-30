const SERVER_URL = "120.0.0.7";

async function getLeaderBoard() {

    try {

        const leaderBoardJson = await fetch(SERVER_URL + "/leaderBoard" , {
            headers: {"Content-type": "application/json"}
        });
        if (!leaderBoardJson.ok) return ;
        else return leaderBoardJson;

    }
    catch (error) {
        console.log(error);
    }

}

async function getProfileInformation(username) {
    
    try {

        const profileInfo = await fetch(SERVER_URL + "/" + username) 
        if (!profileInfo.ok) return;
        else return profileInfo; 

    }
    catch (error) {
        console.log(error);
    }
    
}

async function sendPlayerName(username) {

    try {

        const response = await fetch(SERVER_URL, {
            method: 'POST', 
            mode: 'no-cors', 
            headers: {
                'Content-type': 'application/json'
            },
            body: String(username)
        });
        if (!response.ok) return;
        else return true;

    } 
    catch (error) {
        console.log(error);
    }

}

function sendPlayerToWaitingRoom(username) {

    if (sendPlayerName(username)) {
        window.location.href = 'WaitingRoom.html'; 
    }
    else {
        window.alert("Some error. Click on join room again.");
    }

}



function _(id){
    return document.getElementById(id);
}

_("how-to").addEventListener('click', popUpTutorialWindow);

function popUpTutorialWindow() {
    _("tutorial-window").style.zIndex = "1";
}

_("goback").addEventListener('click', function() {
    _("tutorial-window").style.zIndex = "-1";
})

_("option").addEventListener('click', function() {

    if (_("options").classList.contains("active")){
        flushActiveNavElements();
    }
    else{
        flushActiveNavElements()
        _("options").classList.add("active");
        _("options").style.display = "flex";
        
    }

})

_("profiles").addEventListener('click', function() {

    if (_("profile").classList.contains("active")){
        flushActiveNavElements();
    }
    else{
        flushActiveNavElements()
        _("profile").classList.add("active");
        _("profile").style.display = "block";
        
    }

})

_("leader").addEventListener('click', function() {

    if (_("leader-board").classList.contains("active")){
        flushActiveNavElements();
    }
    else{
        flushActiveNavElements()
        _("leader-board").classList.add("active");
        _("leader-board").style.display = "flex";
        
    }

})

function flushActiveNavElements() {

    _("options").classList.remove("active");
    _("options").style.display = "none";

    _("profile").classList.remove("active");
    _("profile").style.display = "none";

    _("leader-board").classList.remove("active");
    _("leader-board").style.display = "none";

}