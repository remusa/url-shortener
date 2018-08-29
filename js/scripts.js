const endpoint = "https://www.jsonstore.io/98f66598bd35ee4635ee0d6f02cab0f98dc7243249271cb5c130f08a59cbfc37"

function getUrl() {
    const url = document.querySelector("#urlInput").value
    const protocolOk = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://")

    if (!protocolOk) {
        newUrl = "http://" + url
        return newUrl
    } else {
        return url
    }
}

function getRandom() {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let text = ""

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
}

function generateHash() {
    if (window.location.hash == "") {
        window.location.hash = getRandom()
    }
}

function sendRequest(url) {
    this.url = url

    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
    })
}

function shortenUrl() {
    var longurl = getUrl()
    generateHash()
    sendRequest(longurl)
}

let hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"]

        if (data != null) {
            window.location.href = data
        }
    })
}