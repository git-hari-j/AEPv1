var launchTagUrl = "//assets.adobedtm.com/3b3fff421c12/077c2e9369c8/launch-8ad5aca20b6c-development.min.js";

dynamicallyLoadScript(launchTagUrl);

function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
}
