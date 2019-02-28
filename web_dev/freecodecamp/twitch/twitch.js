const streams = ['freecodecamp', 'nalcs', 'ESL_SC2']

const updateTable = (channel_logo, channel_display_name, channel_url, channel_status) => {
  let logoDiv = `<div class="col-md-2"><img class="logo" src="${(channel_logo) ? channel_logo : ""}" /></div>`;
  let nameDiv = `<div class="col-md-4 row-text"><a href="${(channel_url) ? channel_url : ""}">${channel_display_name}</a></div>`;
  let statusDiv = `<div class="col-md-6 row-text">${channel_status}</div>`;

  document.getElementById('StreamTableBody').innerHTML +=
  `<div class = "row border-top border-secondary">
  ${logoDiv}
  ${nameDiv}
  ${statusDiv}
  </div>`;
}

const twitchCallBack = (data, id, isChannel) => {
  if (!data || data.hasOwnProperty('error')) {
    return;
  }
  else if (isChannel) {
    //update table
    updateTable(data['logo'], data['display_name'], data['url'], "Offline");
  }
  else  /* isStream */ {
    if (!data['stream']) {
      getJSON('https://wind-bow.glitch.me/twitch-api/channels/', id, (data) => {
        twitchCallBack(data, id, true);
      });
    }
    else {
      //update table
      const channelData = data['stream']['channel'];
      updateTable(channelData['logo'], channelData['display_name'], channelData['url'], channelData['status'])
    }
  }
};

const getJSON = (url, id, callback) => {
  var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  window[callbackName] = function(data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data, id, false);
  };
  var script = document.createElement('script');
  script.src = url + id + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
};

streams.forEach((stream) => {
  getJSON('https://wind-bow.glitch.me/twitch-api/streams/', stream, twitchCallBack);
});
