const userId = 132462693;
const url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
const token = '4nxjlq40lzpjmmqvknrux51p61hxbr';
const clientId = 'dg5vmyaw51owjvqeb0y1h9ju91kouv';
const twitchUrl = "https://www.twitch.tv/amaazz";
const headers = {
    'Authorization' : `Bearer ${token}`,
    'Client-id' : clientId
}

let isStreamLive = false;

const callback = function(result) {
    if (result.data && !isStreamLive) {
        setIcon('/images/folder-blue-pictures-icon.png');
        chrome.notifications.create('LiveOn', {
            title: 'Amaazz est en live !',
            iconUrl: '/images/folder-blue-pictures-icon.png',
            message: 'Je suis en live, rejoins moi !!!',
            type: 'basic'
        });
        isStreamLive = true;
    } else {
        setIcon('/images/Pictures-Canon-icon.png');
        isStreamLive = false;
    }
}

function fetchTwitchAPI(url, headers, callback) {
    fetch(url, {
        headers: headers
    })
    .then(async response => callback(await response.json()));
}

fetchTwitchAPI(url, headers, callback);


function setIcon(path) {
    chrome.action.setIcon({path : path});
}

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({
        url: twitchUrl
    })
});

chrome.alarms.create({periodInMinutes: 1});

chrome.alarms.onAlarm.addListener(() => {
    fetchTwitchAPI(url, headers, callback);
});