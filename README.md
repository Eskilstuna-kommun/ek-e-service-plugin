# ek-e-service plugin

This is a plugin which allows "remote" activation of preconfigured layers in an iframe Origo map.

#### Example usage of ek-e-service plugin

**index.html:**

Swap "http://localhost:9966/" to the URL of the Origo map, and "http://localhost:9008" to the URL of the eservice.
```
    <head>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    	<meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1">
    	<title>Origo exempel</title>
    	<link href="css/style.css" rel="stylesheet">
    </head>
    <body>
    <div id="app-wrapper">
    </div>
    <script src="js/origo.js"></script>
    <script src="plugins/ekeservice.js"></script>

    <script type="text/javascript">
      //Init origo
      var origo = Origo('index.json');
      origo.on('load', function (viewer) {
        var ekeservice = Ekeservice({allowedOrigins: ['http://localhost:9008', 'http://localhost:9966']});
			  viewer.addComponent(ekeservice);
      });
    </script>
```

**host.html**

Swap "http://localhost:9966/" to the URL of the Origo map.
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script type="module" src="./main.js" defer></script>
  </head>
  <body>
    <iframe id="origo-map" src="http://localhost:9966/" style="width: 800px; height: 600px"></iframe>
    <p><button id="button">Send message to map</button></p>
  </body>
</html>
```

**main.js**

Add the configuration of the layers you want to activate in the "layers"-array.
Any configuration added here will be applied on the eserviceSource config on the server. 
Config attributes sent from the "client" will always take precedent over the server config.
```
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
      data: {
        layers: layers
      }
    }));
  }
});
```

**index.json**

Add base attributes for layers, these can be overwritten by the layer configs sent form the client.
```
...
"eserviceSource":
  {
    "name": "pluginLayer",
    "title": "plugin-aktiverat lager",
    "group": "root",
    "source": "data/origo-cities-3857.geojson",
    "style": "origo-logo",
    "type": "GEOJSON",
    "attributes": [
      {
        "name": "name"
      }
    ],
    "visible": true
  }
...
```


