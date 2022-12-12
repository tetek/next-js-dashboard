
import '@tremor/react/dist/esm/tremor.css';
import { Card, Text, Metric, List, ListItem, Block, ProgressBar, ColGrid, CategoryBar, TabList, Tab, Legend } from '@tremor/react'
import { useEffect, useRef, useState } from "react";

function StartupCard({ data, appConf, platformVersionHandler }) {

  const perAppVersion = data.data[appConf.platform].filter(e => e.version == appConf.version)[0]
  const osVersions = [...new Set(perAppVersion?.perf.map(i => Object.keys(i.time)).flat())]

  const toDisplay = perAppVersion?.perf.filter(i => i.time[appConf.platformVersion] != null)

  console.log(appConf)
  return (
    <Card key={data.platform}>
      <Metric>{data.metric}</Metric>
      <TabList
        key={appConf.version}
        defaultValue={appConf.platformVersion}
        handleSelect={platformVersionHandler}
        marginTop="mt-6"
      >
        {osVersions.map(osVersion => (
          <Tab key={osVersion} value={osVersion} text={osVersion} />
        ))}
      </TabList>

      <List marginTop="mt-4">
        {toDisplay.map((item) => (          
          <ListItem key={item.model}>            
            <Block>
              <Text>
                {item.model}
              </Text>
              <CategoryBar
                categoryPercentageValues={[100, 300, 300, 300]}
                colors={["green", "emerald", "orange", "rose"]}
                percentageValue={item.time[appConf.platformVersion] / data.timeLimit * 100.0}
                showLabels={true}
                tooltip={`${item.time[appConf.platformVersion]}ms`}
                showAnimation={true}
                marginTop="mt-0"
              />
            </Block>
          </ListItem>
        ))}
        <Legend
        categories={["Time in miliseconds"]}
        colors={["emerald"]}
        marginTop="mt-3"
      />
      </List>
    </Card>
  )
}

export default StartupCard