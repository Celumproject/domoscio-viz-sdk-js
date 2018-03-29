# DomoscioViz

This README would document whatever steps are necessary to get the DomoscioViz SDK up and running.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

DomoscioViz requires the jQuery Javascript library. Make sure to load jquery.js file before loading DomoscioViz.

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
```

### Installing

Place the following <script>s near the end of your pages, right before the closing </body> tag, to enable them. jQuery must come first, then DomoscioViz, and then your script.

```html
<script src="https://rawgit.com/Celumproject/domoscio-viz-sdk-js/master/v1/domoscioviz.min.js"></script>
```

Then you have to configure the DomoscioViz object like bellow with your credentials to access your enabled APIs. Refer to the API documentation for details:
https://domoscio.com/wiki/doku.php?id=api2:start

```javascript
DomoscioViz.configuration = { 
    preproduction: true,
    client_id: YOUR_INSTANCE_ID,
    client_passphrase: "YOUR_ACCESS_TOKEN"
}
```

| Key  | Type | Description |
| ------------- | ------------- | ------------- |
| preproduction  | `boolean` | true is for development and false for production |
| client_id  | `integer` | this is your instance_id, required for access to your data |
| client_passphrase  | `string` | client_passphrase is your secret key, this token is paired with your client_id |

## Samples

Simple yet flexible JavaScript request for Domoscio Vizualisation Engine.

### Classic

Purpose you have the following html :

```html
<div id="iframe_container"></div>
```

Then add the script corresponding:

```javascript
var iframe_url = DomoscioViz.Chart.get_url("obj_mastery", { chart: "polar", student_id: 1, objective_id: 1 });
            
$('#iframe_container').html(iframe_template(iframe_url));

function iframe_template(url){
    return '<iframe src="' + url + '" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>';
}
```

### Fade

You can custom this with jQuery, as the example:  

__HTML :__

```html
<div id="iframe_container"></div>
```  

__CSS :__

```css
#iframe_container{
    width: 500px;
    height: 500px;
    display: flex; 
    align-items: center;
    justify-content: center;
}
iframe{ 
    width: 100%; 
    height: 100%;
}
```  

__JavaScript :__

```javascript
$(function(){
    var iframe_url = DomoscioViz.Chart.get_url("obj_mastery", { chart: "polar", student_id: 1, objective_id: 1 });

    $('#iframe_container').html(viz_loader() + template(iframe_url));

    $('#iframe_container > iframe').on('load', function (){
        $('#viz_loader').fadeOut();
        setTimeout(() => { $(this).fadeIn(); }, 500);
    });

    function template(url){
        return '<iframe src="' + url + '" sandbox="allow-same-origin allow-scripts allow-popups allow-forms" style="display: none;"></iframe>';
    }
});
```

## Deployment

To deploy this on a live system, use the <script> tag bellow : 

```html
<script src="https://cdn.rawgit.com/Celumproject/domoscio-viz-sdk-js/03267c5a/v1/domoscioviz.min.js"></script>
```

## Versioning

Currently v1.0.3

## Authors

See the list of contributors (https://github.com/Celumproject/domoscio-viz-sdk-js/contributors)