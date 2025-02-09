"use client"

import { useTheme } from 'next-themes'
import React from 'react'
import D3WordCloud from "react-d3-cloud"

const data = [
  {
    text: "Haloooo",
    value: 3
  },
  {
    text: "Haiii",
    value: 5
  },
  {
    text: "komputer",
    value: 10
  },
  {
    text: "Quis_Ajah",
    value: 8
  },
  {
    text: "Live",
    value: 7
  }
]

function fontSizeMapper(word: {value: number}){
  return Math.log2(word.value) * 5 + 16
}

function CustomWordCloud() {
  const theme = useTheme()
  return (
    <>
    <D3WordCloud data={data} height={550} font="Times" fontSize={fontSizeMapper} rotate={0} padding={10} fill={theme.theme = "dark" ? "white" : "black"} />
    </>
  )
}

export default CustomWordCloud