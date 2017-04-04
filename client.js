/*
webSocket client
context: P5.js
A webSocket client that draws a ball on the screen
that's moved around with data from the server. The server
is sending data received serially from an Arduino.
The server is sending:
x, y, buttonValue\n
created 10 June 2015
by Tom Igoe
 */
$(document).ready(function () {
	var socket = io(); // socket.io instance. Connects back to the server
	socket.onopen = openSocket;
	// when new data comes in the websocket, read it:
	socket.on('message', readData);
	var min = 100,
	max = 0;
	function readData(data) {
		if (data < min)
			min = data;
		if (data > max)
			max = data;
		document.getElementById("minval").innerHTML = min;
		document.getElementById("maxval").innerHTML = max;
		series.append(new Date().getTime(), data);
	}
	function openSocket() {
		text.html("Socket open");
		//socket.send("Hello server");
	}

	var chart = new SmoothieChart({
			maxValueScale: 1.5,
			scaleSmoothing: 0.424,
			grid: {
				strokeStyle: 'rgba(192,192,192,0.73)',
				verticalSections: 7
			},
			labels: {
				fontSize: 11,
				precision: 3
			},
			timestampFormatter: SmoothieChart.timeFormatter,
			maxValue: 100,
			minValue: 0
		}),
	canvas = document.getElementById('smoothie-chart'),
	series = new TimeSeries();

	chart.addTimeSeries(series, {
		lineWidth: 1.1,
		strokeStyle: '#00ff00'
	});
	chart.streamTo(canvas, 100);
});
