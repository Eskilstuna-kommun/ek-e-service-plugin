const iframeElement = document.querySelector('#origo-map');
const buttonElement = document.querySelector('#button');

function sendMessage(message) {
  const iframeOrigin = new URL(iframeElement.src).origin;
  iframeElement.contentWindow.postMessage(message, iframeOrigin);
}

window.addEventListener('message', (message) => {
  console.log(message.data);

  const data = message.data;
  const messageJson = JSON.parse(data);
  if (messageJson.targetPlugin == 'ekeservice' && messageJson.type == 'pluginLoaded') {
    sendMessage(JSON.stringify({
      targetPlugin: 'ekeservice',
      type: 'addLayers',
      data: {layers: ['pluginLayer', 'pluginLayer2']}
    }));
  }
});
iframeElement
