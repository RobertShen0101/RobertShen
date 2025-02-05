document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('start-button').style.opacity = '1';
    }, 3000); 
});


document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('game-cover').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
});