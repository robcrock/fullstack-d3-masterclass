// prettier-ignore
async function drawScatter() {
  // 1. Access data
  let data = await d3.json("./../../my_weather_data.json")

  const xAccessor = d => d.dewPoint
  const yAccessor = d => d.humidity
  const colorAccessor = d => d.cloudCover

  // 2. Create chart dimensions

  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9
  ])

  const dims = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50
    }
  }

  dims.boundedWidth = dims.width - dims.margin.right - dims.margin.left
  dims.boundedHeight = dims.height - dims.margin.top - dims.margin.bottom

  // 3. Draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dims.width)
      .attr("height", dims.height)

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
          dims.margin.left
        }px, ${
          dims.margin.top
        }px)`
      )

  // 4. Create scales

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xAccessor))
    .range([0, dims.boundedWidth])
    .nice()

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yAccessor))
    .range([dims.boundedHeight, 0])
    .nice()

  const colorScale = d3.scaleLinear()
    .domain(d3.extent(data, colorAccessor))
    .range(["skyblue", "darkslategrey"])

  // 5. Draw data

  const dots = bounds.selectAll("circle")
    .data(data)
    .enter().append("circle")
      .attr("cx", d => xScale(xAccessor(d)))
      .attr("cy", d => yScale(yAccessor(d)))
      .attr("r", 4)
      .attr("fill", d => colorScale(colorAccessor(d)))

  // 6. Draw peripeherlas

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
      .style("transform", `translateY(${dims.boundedHeight}px)`)

  const xAxisLabel = xAxis.append("text")
    .attr("x", dims.boundedWidth / 2)
    .attr("y", dims.margin.bottom - 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .html("Dew point (&deg;F)")

  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .ticks(4)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)

  const yAxisLabel = yAxis.append("text")
    .attr("x", -dims.boundedHeight / 2)
    .attr("y", -dims.margin.left + 10)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Reletive humidity")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle")

  // 7. Set up interactions
}
drawScatter()
