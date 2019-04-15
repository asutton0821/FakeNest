const socket = io(); 
window.addEventListener("load", function() {
  const coolCheckbox = document.getElementById("cool");
  const heatCheckbox = document.getElementById("heat");
  const tempLabel = document.getElementById("test2");

  let temperatureCheck = document.getElementById("temp");
  temperatureCheck.addEventListener("change", () => {
    socket.emit("temp", value);
  });

  coolCheckbox.addEventListener("change", function() {
    socket.emit("cool", Number(this.checked)); 
  });

  heatCheckbox.addEventListener("change", function() {
    socket.emit("heat", Number(this.checked)); 
  });

  tempLabel.addEventListener("change", function() {
    socket.emit("test2", Number(this.innerText)); //send button status to server ($
  });
});

socket.on("cool", function(data) {
  if (document.getElementById("cool").checked == false) {
    document.getElementById("cool").checked = true;
    document.getElementById("heat").checked = false;
  }

  socket.emit("cool", document.getElementById("cool").checked);
});

socket.on("heat", function(data) {

  if (document.getElementById("heat").checked == false) {
    document.getElementById("heat").checked = true;
    document.getElementById("cool").checked = false;
  }

  socket.emit("heat", document.getElementById("heat").checked);
});

socket.on("temp", data => {
  socket.emit("temp", (document.getElementById("temp").innerText = data));
});
