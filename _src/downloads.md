# Downloads

Here you can download the library and the viewer .js and .css files.


<a href="/dist/djvu.js" download="djvu.js">Download DjVu.js library (version 0.0.7)</a>

<a href="/dist/djvu_viewer.js" download="djvu_viewer.js">Download DjVu.js Viewer .js file</a>

<a href="/dist/djvu_viewer.css" download="djvu_viewer.css">Download DjVu.js Viewer .css file</a>

## How to use it

Create a folder with all 3 files, that you have downloaded here (`djvu.js`, `djvu_viewer.js` and `djvu_viewer.css`). Then in the same folder create an .html file (let's say `index.html`) with the following content.

```
<!DOCTYPE html>
<html>

<header>
	<meta charset="utf-8">
	<script src="djvu.js"></script>
	<script src="djvu_viewer.js"></script>
	<link href="djvu_viewer.css" rel="stylesheet">

	<script>
		window.onload = function () {
			DjVu.Viewer.init(
                document.querySelector("#for_viewer")
            );
		};
	</script>

</header>

<body>
	<div id="for_viewer"></div>
</body>

</html>

```

If you use Mozilla Firefox web browser, then you can just open the `index.html` and you will see the DjVu.js viewer, which will work absolutely the same way
as it does on the main page of this website. But if you use Google Chrome or Opera, you won't see anything except for some errors in the console. It's concerned with that the 
DjVu.js uses the Web Workers API of the web browsers and Chrome doesn't allow the script to create a Worker, when the file is loaded from the file system directly. In other words, you just need
to start a local web server in order to make everything work as it works on the Internet. Any static web server will do. 

For example, if you have Node.js installed, you can just use `serve` package to run a simple static web server. Run the following commands in your shell. 

```
npm install -g serve
```

to install `serve` package globally and then head to the directory, where our files are kept, and run

```
serve -p 5000
```

in order to start the local server (you may change the port as you wish). Then just open [http://localhost:5000/](http://localhost:5000/) and you will see the viewer. 

