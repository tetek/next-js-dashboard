import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  ColGrid,
  Block, Subtitle, Toggle, ToggleItem
} from '@tremor/react';

import { useState } from 'react';
import StartupCard from '../comps/StartupCard';
import VersionChooser from '../comps/VersionChooser';
import Image from 'next/image';
import { Flex } from "@tremor/react";
import { MapIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";

import { FaApple, FaAndroid } from "react-icons/fa"
import { version } from 'os';

export default function Home({ data }) {
  const [selectedApp, setSelectedApp] = useState("1Password");
  const [platform, setPlatform] = useState("apple");
  const [version, setVersion] = useState("7.1.0");
  const appConf = useState({app: '1Password', platform: 'apple', version: '7.1.0'})
  const getPerf = () => { data.data[platform].filter(e => e.version == version)[0].perf }
  console.log(data.data[platform].filter(e => e.version == version)[0])

  function changeApp(value) {
    setSelectedApp(value)
    this.forceUpdate()
  }

  function changeOS(value) {
    setPlatform(value)
    setVersion()
  }
  return (
    <main>
      <Image src="https://emergetools.com/images/emergetoolsstandard.png" alt="logo" width="80" height="48" />

      <div className="container">
        <Title>My Apps</Title>
        <Text>Analyse you application performance</Text>

        <TabList defaultValue={"1Password"} handleSelect={(value) => {changeApp(value)}} marginTop="mt-6">
          <Tab value="1Password" text="1Password" />
          <Tab value="Apollo" text="Apollo" />
        </TabList>

        <Flex
          justifyContent="justify-end"
          alignItems="items-end"
          spaceX="space-x-2"
          truncate={false}
          marginTop="mt-0"
        >
          <Toggle
            defaultValue="apple"
            handleSelect={(value) => setPlatform(value)}
            color="blue"
            marginTop="mt-0"
          >
            <ToggleItem
              value="apple"
              text=""
              icon={FaApple}
            />
            <ToggleItem
              value="android"
              text=""
              icon={FaAndroid}
            />
           
          </Toggle>
          <VersionChooser data={data} platform={platform} version={version} handleSelect={(value) => setVersion(value)}/>

        </Flex>


        <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">

          <StartupCard data={data} platform={platform} version={version} />
          <Card>
            { /* Placeholder to set height */}
            <div className="h-28" />
          </Card>
          <Card>
            { /* Placeholder to set height */}
            <div className="h-28" />
          </Card>
        </ColGrid>

        <Block marginTop="mt-6">
          <Card>
            <div className="h-80" />
          </Card>
        </Block>


      </div>
    </main>
  );
}


export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/appsize')
  const data = await res.json()
  console.log(data)
  return {
    props: { data }, // will be passed to the page component as props
  }
}