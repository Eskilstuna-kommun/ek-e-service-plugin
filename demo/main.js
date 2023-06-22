const iframeElement = document.querySelector('#origo-map');

function sendMessage(message) {
  const iframeOrigin = new URL(iframeElement.src).origin;
  iframeElement.contentWindow.postMessage(message, iframeOrigin);
}

window.addEventListener('message', (message) => {
  const data = message.data;
  const messageJson = data;

  const layers = [
    {
      name: 'pluginLayer',
      title: 'plugin-aktiverat lager',
      group: 'root',
      source: 'data/origo-cities-3857.geojson',
      style: 'origo-logo',
      type: 'GEOJSON',
      attributes: [
        {
          name: 'name'
        }
      ],
      visible: true
    },
    {
      name: 'pluginLayer2',
      title: 'plugin-aktiverat lager2',
      group: 'root',
      source: 'data/origo-cities-3857.geojson',
      style: 'origo-logo',
      type: 'GEOJSON',
      attributes: [
        {
          name: 'name'
        }
      ],
      visible: true
    }
  ];

  if (messageJson.targetPlugin === 'ekeservice' && messageJson.type === 'pluginLoaded') {
    sendMessage({
      targetPlugin: 'ekeservice',
      type: 'addLayers',
      data: { layers }
    });
  }
});
