// to not spam fullscreen reqs
var asked = false;

function displayAd(url) {
    document.querySelector('#currentAd').src = window.location.origin+url;
}


fetch('/api/runStatus').then(response => response.json()).then(state => {
    if (state) {
        document.querySelector('#interactionBtn').click();
    }
});

function handleClick() {
    document.querySelector('#currentAd').requestFullscreen();
}

document.querySelector('#closeInteraction1').addEventListener('click', function() {
    asked = true;

    handleClick();
})
document.querySelector('#closeInteraction2').addEventListener('click', function() {
    asked = true;

    handleClick();
})