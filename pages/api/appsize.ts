// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   startupTimes: Timing[]
//   app: string,
//   metric: string
// }
// type Timing = {
//   model: string,
//   time: PeriOS
// }

// type PeriOS = {
//   iOS15: number,
//   iOS16: number
// }
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appPerformance = {
    data: {
      apple: [{
        perf: [
          {model: "iPhone", time: {iOS15: 100, iOS16: 120}},
          {model: "iPad", time: {iOS15: 200, iOS16: 190}}
        ],
        version: "7.1.0"
      },
      {
        perf: [
          {model: "iPhone", time: {iOS15: 300, iOS16: 120}},
          {model: "iPad", time: {iOS15: 500, iOS16: 190}}
        ],
        version: "7.2.0"
      }],          
      android: [{
        perf: [
          {model: "Pixel 6", time: {Android10: 100, Android11: 120}},
          {model: "Samsung S8", time: {Android12: 500, Android11: 190}},          
        ],
        version: "7.12.0"
      },
      {
        perf: [
          {model: "Pixel 11", time: {iOS15: 100, iOS16: 120}},
          {model: "Samsung S9", time: {iOS15: 500, iOS16: 190}}
        ],
        version: "7.22.0"
      }],
    },    
    app: "1Password",
    metric: "Startup time",
    timeLimit: 1000
  }
  res.status(200).json(appPerformance)
}
