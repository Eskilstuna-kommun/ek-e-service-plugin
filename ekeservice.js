import Origo from 'Origo';

const Ekeservice = function Ekeservice(options = {}) {
  const {
    allowedOrigins
  } = options;

  const icon = '#fa-pencil';

  let viewer;
  let target;
  let modal;

  async function onMessage(event) {
    if (allowedOrigins) {
      if (!allowedOrigins.some((origin) => origin === event.origin) || !event.data || typeof event.data != 'string') {
        return;
      }
    }
    
    const messageJson = JSON.parse(event.data);
    const targetPlugin = messageJson.targetPlugin || null;
    const messageType = messageJson.type || null;
    const data = messageJson.data || null;
    if (targetPlugin !== 'ekeservice' || messageType !== 'addLayers') {
      return;
    }

    const viewerOptions = viewer.getViewerOptions();
    const eserviceLayers = viewerOptions.eserviceLayers;
    console.log(eserviceLayers);

    const layersToAdd = data.layers;
    layersToAdd.forEach(layerName => {
      const newLayer = eserviceLayers.find(layer => layer.name == layerName);
      if (newLayer) {
        viewer.addLayer(newLayer);
      }
    })    
  }

  return Origo.ui.Component({
    name: 'ekeservice',
    onInit() {
      window.addEventListener('message', onMessage);

    },
    onAdd(evt) {
      viewer = evt.target;
      window.top.postMessage(JSON.stringify({
        targetPlugin: 'ekeservice',
        type: 'pluginLoaded',
        data: {}
      }), '*');
    },
    render() {
    }
  });
};

export default Ekeservice;
