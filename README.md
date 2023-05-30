# ek-e-service plugin

This is a plugin which allows "remote" activation of preconfigured layers in an iframe Origo map.

#### Example usage of ek-e-service plugin

**index.html:**
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
 Codepen: https://codepen.io/jokd/pen/VwmgjYP
