const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.open(0, {speedHz: 20000}, (err) => {
  if (err) throw err;

  setInterval(() => {
    tempSensor.read((err, reading) => {
//      console.log(reading.value);
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
      console.log((reading.value * 3300/1024) * 100);
    });
  }, 1000);
});
