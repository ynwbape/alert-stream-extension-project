// Variables de l'API Twitch 
const userId = 132462693;
const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const token = '4nxjlq40lzpjmmqvknrux51p61hxbr';
const clientId = 'dg5vmyaw51owjvqeb0y1h9ju91kouv'
const headers = {
    'Authorization' : `Bearer ${token}`,
    'Client-id' : clientId
}

const info = document.getElementById('streamerStatus');
const title = document.getElementById('titleStream');
const views = document.getElementById('twitch-viewer-count');

function fetchTwitchAPI(url, headers, callback) {
    fetch(url, {
        headers: headers
    })
    .then(async response => callback(await response.json()))
}

let color = document.querySelector('.colorStatus');

const callback = function(result) {
    info.innerText = result.data.length ? "Amaazz est entrain de streamer !" : "Hors Ligne !";
    title.innerText = result.data[0].title; 
    views.innerText = result.data[0].viewer_count;
}

fetchTwitchAPI(url, headers, callback);