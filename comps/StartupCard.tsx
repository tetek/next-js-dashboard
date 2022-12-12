
import '@tremor/react/dist/esm/tremor.css';
import { Card, Text, Metric, List, ListItem, Block, ProgressBar, ColGrid, CategoryBar, TabList, Tab, Legend } from '@tremor/react'
import { useEffect, useRef, useState } from "react";
import { PerfType, StartupCardType, VersionType } from '../interfaces';

function StartupCard({ data, appConf, platformVersionHandler }: StartupCardType) {

  const perAppVersion = (data.data as any)[appConf.platform].filter((e: VersionType) => e.version == appConf.version)[0] 
  const osVersions = Array.from(new Set(perAppVersion?.perf.map((i: PerfType) => Object.keys(i.time)).flat())) as Array<string>
  const toDisplay = perAppVersion?.perf.filter((i: PerfType) => i.time[appConf.platformVersion] != null) as Array<PerfType>

  console.log(appConf)
  return (
    <Card key={data.metric}>
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