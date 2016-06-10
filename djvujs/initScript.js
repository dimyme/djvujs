"use strict";
var fileSize = 0;
var output;
Globals.counter = 0
function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
    console.log("included: " + url);
}
function writeln(str) {
    str = str || "";
    output.innerHTML += str + "<br>";
}
function write(str) {
    output.innerHTML += str;
}
function clear() {
    output.innerHTML = "";
}
window.onload = function() {
    output = document.getElementById("output");
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    Globals.defaultDPI = 100;
    Globals.Timer = new DebugTimer();
    Globals.canvas = canvas;
    Globals.canvasCtx = c;
    Globals.dict = [];
    Globals.img = document.getElementById('img');
    loadDjVu();
    loadPicture();
}
function loadDjVu() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "samples/r1.djvu");
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) {
        console.log(e.loaded);
        fileSize = e.loaded;
        var buf = xhr.response;
        readDjvu(buf);
    }
    xhr.send();
}
function loadPicture() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "samples/r.jpg");
    xhr.responseType = "arraybuffer";
    xhr.onload = function(e) {
        console.log(e.loaded);
        fileSize = e.loaded;
        var buf = xhr.response;
        readPicture(buf);
    }
    xhr.send();
}
function readPicture(buffer) {
    var pictureTotalTime = performance.now();
    createImageBitmap(new Blob([buffer])).then(function(image) {
        var c = document.getElementById('canvas2').getContext('2d');
        c.drawImage(image, 0, 0);
        var imageData = c.getImageData(0, 0, 192, 256);
        var iwiw = new IWImageWriter(imageData);
        Globals.iwiw = new IWImageWriter(imageData);
        console.log("PC1");
        var doc = iwiw.test();
        var link = document.querySelector('#dochref');
        link.href = doc.createObjectURL();

        c.putImageData(doc.pages[0].getImage(), 0, 0);
        console.log('Counter', Globals.counter);
        console.log('PZP', Globals.pzp.log.length, ' ', Globals.pzp.offset );
        writeln(doc.toString());
    });
    console.log('pictureTotalTime = ', performance.now() - pictureTotalTime);
}
function readDjvu(buf) {
    return;
    console.log("DJ1");
    var link = document.querySelector('#dochref');
    var time = performance.now();
    console.log("Buffer length = " + buf.byteLength);
    //BZZtest();
    var doc = new DjVuDocument(buf);
    //console.log("REAL COUNT ", doc.countFiles());
    //var ndoc = doc.slice(0, doc.pages.length / 2);
    //var page = doc.pages[10];
    //Globals.drawImageSmooth(page.getImage(), page.dpi);
    //Globals.drawImageSmooth(page.getImage(), page.dpi);
    Globals.counter = 0;
    if (!Globals.iwiw) {
        setTimeout(function() {
            Globals.canvasCtx.putImageData(new DjVuDocument(buf).pages[0].getImage(), 0, 0);
            console.log('Counter', Globals.counter)
        }, 100)
    } 
    var imageData = Globals.canvasCtx.putImageData(doc.pages[0].getImage(), 0, 0);
    //link.href = ndoc.createObjectURL();
    writeln(doc.toString());
    // c.putImageData(doc.pages[0].getImage(), 0, 0);
    //writeln(djvuPage.toString());
    //ZPtest();
    console.log(Globals.Timer.toString());
    console.log("Total execution time = ", performance.now() - time)
    
}
function main(file) {
    clear();
    readFile(file);
    writeln(file.size);
}
