async function drawLineChart() {
  // write your code here
  const data = await d3.json("../../my_weather_data.json")
  console.table(data[0])

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  }

  dimensions.boundedWidth =
    dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  console.log(dimensions.boundedWidth, dimensions.boundedHeight)

  const wrapper = d3.select("#wrapper")
  console.log(wrapper)

  const yAccessor = (d) => d["temperatureMax"]
  const parseDate = d3.timeParse("%Y-%m-%d")
  const xAccessor = (d) => parseDate(d["date"])
  // console.log(xAccessor(data[0]))
}

drawLineChart()
