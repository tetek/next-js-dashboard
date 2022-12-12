
import '@tremor/react/dist/esm/tremor.css';
import { Card, Text, Metric, List, ListItem, Block, ProgressBar, ColGrid, CategoryBar, TabList, Tab } from '@tremor/react'
import { useState } from "react";

function StartupCard({ data, platform, version }) {

  const perAppVersion = () => data.data[platform].filter(e => e.version == version)[0]
  const getOSVersions = () => [...new Set(perAppVersion()?.perf.map(i => Object.keys(i.time)).flat())]
  console.log(getOSVersions()[0])
  const [systemVersion, setSystemVersion] = useState(getOSVersions()[0]);
  console.log(systemVersion)
  return (
    <Card key={data.app}>
      <Metric>{data.metric}</Metric>
      <TabList
        defaultValue={getOSVersions()[0]}
        handleSelect={(value) => {setSystemVersion(value); console.log(value)}}
        marginTop="mt-6"
      >
        {getOSVersions().map(osVersion => (
          <Tab key={osVersion} value={osVersion} text={osVersion} />
        ))}
      </TabList>

      <List marginTop="mt-4">
        {perAppVersion()?.perf.map((item) => (
          <ListItem key={item.model}>
            <Block>
              <Text>
                {item.model}
              </Text>
              <CategoryBar
                categoryPercentageValues={[100, 300, 300, 300]}
                colors={["green", "emerald", "orange", "rose"]}
                percentageValue={item.time[systemVersion] / data.timeLimit * 100.0}
                showLabels={true}
                tooltip={`${item.time[systemVersion]}ms`}
                showAnimation={true}
                marginTop="mt-0"
              />
            </Block>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default StartupCard