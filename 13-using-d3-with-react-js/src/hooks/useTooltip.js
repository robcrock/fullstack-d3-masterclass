// Code sourced from: https://swizec.com/blog/tooltips-and-state-across-various-d3-charts-in-a-react-dashboard/
import React, { useState } from "react"

const tooltipContext = React.createContext()

function useTooltip() {
  const [tooltip, setTooltip] = useState(false)

  return { tooltip, setTooltip }
}

export { useTooltip, tooltipContext }
