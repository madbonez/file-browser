# JSON File Browser
Browse and modify json files on local file system. Based on fork from file-browser and jsoneditor library.

file-browser
============
`file-browser` allows embedding of a web-enabled file browser in your node site.

Original Author Credit: Sumit Chawla

## How to install
```js
  npm install file-browser
```

## How to Run
An exmplae server is implemented in:
```js
  ./cli.js
```
You would see the message <b>Please open the link in your browser http://<YOUR-IP>:8088</b> in your console. Now you can point your browser to your IP. 
For localhost access the files over http://127.0.0.1:8088 

The example cli supports following command line switches for additional functinality.

```js
    -p, --port <port>        Port to run the file-browser. Default value is 8088
    -e, --exclude <exclude>  File extensions to exclude. To exclude multiple extension pass -e multiple times. e.g. ( -e .js -e .cs -e .swp)
``` 

## ScreenShot
<img src="https://raw.githubusercontent.com/sumitchawla/file-browser/master/file-browser.png"/>
