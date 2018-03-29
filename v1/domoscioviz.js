/* DomoscioViz v1.0.3 (Custom Build)
 * Dependencies : jQuery (https://jquery.com/)
 * Minify with https://skalman.github.io/UglifyJS-online/
 * Build: https://domoscio.com/ | https://github.com/Celumproject/domoscio-viz-sdk-js
 */

//#######################################################//
//######              UTILS FUNCTIONS              ######//
//#######################################################//

if ("undefined" == typeof jQuery)
    throw new Error("DomoscioViz requires jQuery");

// Errors
function errors(type = 'token') {
    var errors = "";
    switch (type) {
        case 'token':
            errors = 'Invalid API Token';
            break;
        default:
            errors = 'Invalid API Token';
            break;
    }
    return errors;
}

function viz_loader(){
    return "<img src='https://domoscio2-demo.herokuapp.com/images/ripple.svg' alt='loader' id='viz_loader'>";
}

// Build http call
function http_calls(ressource = "") {
    var host_url = DomoscioViz.configuration.preproduction == true ? "https://domoscio-viz-engine.herokuapp.com" : "http://localhost:3002";
    var instance = DomoscioViz.configuration.client_id;
    var token = DomoscioViz.authorization_token(DomoscioViz.configuration.client_passphrase);

    if (token == false)
        return token
    else
        var url = host_url;
    return url;
}

// Redirect to the right route
function ressource(name) {
    // If name isn't a string 
    if (typeof name !== "string") {
        name = name.toString();
        var pos = name.indexOf(" ");
        name = name.substring(pos + 1);
        pos = name.indexOf("(");
        name = name.substring(0, pos);
    }
    // ----------------------
    array = name.split(/(?=[A-Z])/);
    var add_underscore = "";
    for (i = 0; i < array.length; i++) {
        (i < array.length - 1) ? add_underscore += array[i] + "_" : add_underscore += array[i];
    }
    var ressource = "";
    ressource += add_underscore.toLowerCase() + "s";
    return ressource;
}

//#######################################################//
//######               HTTP REQUEST                ######//
//#######################################################//

// Méthode Util
// function get_url(route, filters = {}) {
//     var object = ressource(this.child.parent.name);
//     var token = DomoscioViz.authorization_token(DomoscioViz.configuration.client_passphrase);
//     var url = http_calls(object) + "/" + route;
//     if (url !== false) {
//         var data = "";
//         Object.keys(filters).map(function (key, index) {
//             if (index == 0)
//                 data += key + "=" + filters[key];
//             else
//                 data += "&" + key + "=" + filters[key];
//         });
//         var result = "";
//         var settings = {
//             async: true,
//             crossDomain: true,
//             url: url,
//             method: "POST",
//             headers: {
//                 // 'Content-Type': "application/json",
//                 'ClientID': DomoscioViz.configuration.client_id,
//                 'ClientPassphrase': token,
//                 'Cache-Control': "no-cache"
//             },
//             processData: false,
//             data: data
//             // contentType: "application/json; charset=utf-8",
//         }

//         $.ajax(settings).done(function (response) {
//             console.log(response);
//         });
//         return result;
//     }
// };
function get_url(route, filters = {}) {
    var object = ressource(this.child.parent.name);
    var token = DomoscioViz.authorization_token(DomoscioViz.configuration.client_passphrase);
    var url = http_calls(object) + "/" + route;
    if (url !== false) {
        var data = "";
        Object.keys(filters).map(function (key, index) {
            if (index == 0)
                data += key + "=" + filters[key];
            else
                data += "&" + key + "=" + filters[key];
        });
        var result = "";
        $.ajax({
            headers: {
                'ClientID': DomoscioViz.configuration.client_id,
                'ClientPassphrase': token
                // 'Content-Type': 'application/json'
            },
            method: "POST",
            url: url,
            data: data,
            async: false,
            // dataType: "json",
            crossDomain: true,
            processData: false,
            complete: function (e, statut) {
                result = JSON.parse(e.responseText)["url"];
            },
            error: function (e, statut) {
                console.error("We're sorry, but something went wrong. (500)");
            }
        });
        return result;
    }
};

//#######################################################//
//######                    LIB                    ######//
//#######################################################//

let Chart = {
    name: "Chart",
    child: {},
    get_url,
    init: function () {
        this.child.parent = this;
        delete this.init;
        return this;
    }
}.init();

//#######################################################//
//######                DomoscioViz                ######//
//#######################################################//

DomoscioViz = {

    // Configuration
    "configuration": {
        preproduction: true,
        client_id: 0,
        client_passphrase: ""
    },

    // Token
    "authorization_token": function (token) {
        if (token == null) {
            console.error(JSON.stringify(errors()));
            return false;
        }
        else
            return token;
    },

    Chart

}
