async function drawLineChart() {
  // write your code here
  const data = await d3.json("../../my_weather_data.json")
  console.table(data[0])
}

drawLineChart()
