var http = require("http").createServer(handler); //require http server, and create server with function handler()
var fs = require("fs"); //require filesystem module
var io = require("socket.io")(http); //require socket.io module and pass the http object (server)
var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, "out"); //use GPIO pin 4 as output
var pushButton1 = new Gpio(4, "in", "both");
var pushButton2 = new Gpio(6, "in", "both");

http.listen(8080); //listen to port 8080

function handler(req, res) {
  //create server
  fs.readFile(__dirname + "/public/index.html", function(err, data) {
    //read file index.html in public folder
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" }); //display 404 on error
      return res.end("404 Not Found");
    }
    res.writeHead(200, { "Content-Type": "text/html" }); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on("connection", function(socket) {
  // WebSocket Connection
  pushButton1.watch(function(err, value) {
    //Watch for hardware interrupts on pushButton
    if (err) {
      //if an error
      console.error("There was an error", err); //output error message to console
      return;
    }
    socket.emit("cool", value); //send button status to client
  });
  pushButton2.watch(function(err, value) {
    //Watch for hardware interrupts on pushButton
    if (err) {
      //if an error
      console.error("There was an error", err); //output error message to console
      return;
    }
    socket.emit("heat", value); //send button status to client
  });
});

process.on("SIGINT", function() {
  //on ctrl+c
  //LED.writeSync(0); // Turn LED off
  //LED.unexport(); // Unexport LED GPIO to free resources
  pushButton1.unexport(); // Unexport Button GPIO to free resources
  pushButton2.unexport();
  process.exit(); //exit completely
});

const mcpadc = require("mcp-spi-adc");

const tempSensor = mcpadc.open(0, { speedHz: 20000 }, err => {
  if (err) throw err;

  setInterval(() => {
    tempSensor.read((err, reading) => {
      //      console.log(reading.value);
      document.getElementById("aids").innerText = reading.value;

      console.log((reading.value * 3.3 - 0.5) * 100);
      console.log(((reading.value * 3300) / 1024) * 100);
    });
  }, 1000);
});
