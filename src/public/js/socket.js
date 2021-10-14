var socket = io('https://appchath.herokuapp.com/')

function renderMessages(message) {  
    $('.msg-containner').append(`<div class="containnerMsgView"><div class="nameAuthor">${message.author}:</div><div class="msgAuthor">${message.message}</div></div>`)
}

socket.on('receivedMessage', function(message) {
    renderMessages(message)
    var audioElement;
    if(!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.innerHTML = '<source src="' + '../public/sound/pop.mp3'+ '" type="audio/mp3" />'

        audioElement.volume = 0.5
    }
    audioElement.play();
})

document.getElementById('chat').addEventListener('submit', (event) => {
    event.preventDefault()

    var author = document.getElementById('input-name').value
    var message = document.getElementById('input-style').value

    if (message.length && author.length) {
        var messageObject = {
            author: author,
            message: message
        }

        renderMessages(messageObject)

        socket.emit('sendMessage', messageObject)

        // var audioElement;
        // if(!audioElement) {
        //     audioElement = document.createElement('audio');
        //     audioElement.innerHTML = '<source src="' + '../public/sound/pop.mp3'+ '" type="audio/mp3" />'

        //     audioElement.volume = 0.5
        // }
        // audioElement.play();

    }
    
})

