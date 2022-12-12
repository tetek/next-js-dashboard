// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


function getRandomSize() {
  return [
    {
        name: 'ML Models',
        size: getRandomInt(40, 100),
    },
    {
        name: 'Localisations',
        size: getRandomInt(30, 50),
    },
    {
        name: 'Binary',
        size: getRandomInt(30, 200),
    },
    {
        name: 'Assets',
        size: getRandomInt(30, 150),
    },
    {
        name: 'Database',
        size: getRandomInt(40, 100),
    },
    {
        name: 'Other',
        size: getRandomInt(80, 100),
    },
];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appPerformance = {
    data: {
      apple: [{
        perf: [
          {model: "iPhone 14", time: {iOS15: 100, iOS16: 120}},
          {model: "iPad Pro", time: {iOS15: 200, iOS16: 190}}
        ],
        version: "7.1.0",
        size: getRandomSize()
      },
      {
        perf: [
          {model: "iPhone 14", time: {iOS15: 300, iOS16: 120}},
          {model: "iPad Pro", time: {iOS15: 500, iOS16: 90}}
        ],
        version: "7.2.0",
        size: getRandomSize()
      }],          
      android: [{
        perf: [
          {model: "Pixel 6", time: {Android10: 100, Android11: 120}},
          {model: "Samsung S8", time: {Android12: 500, Android11: 190}},          
        ],
        version: "7.12.0",
        size: getRandomSize()
      },
      {
        perf: [
          {model: "Pixel 11", time: {Android11: 100, Android12: 120}},
          {model: "Samsung S9", time: {Android11: 500, Android12: 190}}
        ],
        version: "7.22.0",
        size: getRandomSize()
      }],
    },    
    app: "1Password",
    metric: "Startup time",
    timeLimit: 1000
  }
  res.status(200).json(appPerformance)
}
