import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useValue } from "../../../context/ContextProvider";


export default function BarGeneratorUsageType() {
  const { state: { generators } } = useValue()
  const [data, setData] = useState([])

  useEffect(() => {
    let MDA = 0, Commercial = 0, Industrial = 0, Personal = 0;
    generators.forEach((generator) => {
      if (generator.usageType === MDA) return MDA++
      if (generator.usageType === Commercial) return Commercial++
      if (generator.usageType === Industrial) return Industrial++
      if (generator.usageType === Personal) return Personal++
    })
    setData([
      { name: 'MDA', qty: MDA },
      { name: 'Commercial', qty: Commercial },
      { name: 'Industrial', qty: Industrial },
      { name: 'Personal', qty: Personal },
    ])
  }, [generators])

  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        barSize={20}
      >
        <XAxis dataKey="generators" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="pv" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </ResponsiveContainer>
  );
}
