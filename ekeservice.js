import Origo from 'Origo';

const Ekeservice = function Ekeservice(options = {}) {
  const {
    allowedOrigins
  } = options;

  let viewer;
  async function onMessage(event) {
    if (allowedOrigins) {
      if (!allowedOrigins.some((origin) => origin === event.origin) || !event.data) {
        return;
      }
    }

    const messageJson = event.data;
    const targetPlugin = messageJson.targetPlugin || null;
    const messageType = messageJson.type || null;
    const data = messageJson.data || null;
    if (targetPlugin !== 'ekeservice' || messageType !== 'addLayers') {
      return;
    }

    const viewerOptions = viewer.getViewerOptions();
    const eserviceSource = viewerOptions.eserviceSource;

    const layersToAdd = data.layers;
    layersToAdd.forEach((layer) => {
      const newLayer = { ...eserviceSource, ...layer };
      if (newLayer) {
        viewer.addLayer(newLayer);
      }
    });
  }

  return Origo.ui.Component({
    name: 'ekeservice',
    onInit() {
      window.addEventListener('message', onMessage);
    },
    onAdd(evt) {
      viewer = evt.target;
      window.top.postMessage({
        targetPlugin: 'ekeservice',
        type: 'pluginLoaded',
        data: {}
      }, '*');
    },
    render() {
    }
  });
};

export default Ekeservice;
