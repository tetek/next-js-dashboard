import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  ColGrid,
  Block, Subtitle, Toggle, ToggleItem, Badge
} from '@tremor/react';

import { useState } from 'react';
import StartupCard from '../comps/StartupCard';
import VersionChooser from '../comps/VersionChooser';
import SizeCard from '../comps/SizeCard';
import Image from 'next/image';
import { Flex } from "@tremor/react";
import { MapIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";

import { FaApple, FaAndroid } from "react-icons/fa"
import { version } from 'os';
import Reaper from '../comps/Reaper';
import Insights from '../comps/Insights';

export default function Home({ data }) {
  const [appConf, setAppConf] = useState({app: '1Password', platform: 'apple', version: '7.1.0', platformVersion: "iOS15"})

  const size = data.data[appConf.platform].find(i => i.version == appConf.version).size
  
//  const size = []

  function changeApp(newApp) {
    const defaultAppVersion = data.data[appConf.platform].map(p => p.version )[0] ?? "no version"
    setAppConf(oldAppConf => ({
      ...oldAppConf,
      app: newApp,
      version: defaultAppVersion
    }));
  }
  function getDefaultOSVersion(platform = appConf.platform, version= appConf.version) {
    const perAppVersion = data.data[platform].filter(e => e.version == version)[0]
    const osVersions = [...new Set(perAppVersion?.perf.map(i => Object.keys(i.time)).flat())]
    return osVersions[0]
  }

  function changePlatform(newPlatform) {
    const defaultAppVersion = data.data[newPlatform].map(p => p.version )[0] ?? "no version"
    console.log('app version' , defaultAppVersion)
        
    setAppConf(oldAppConf => ({
      ...oldAppConf,
      platform: newPlatform,
      version: defaultAppVersion,
      platformVersion: getDefaultOSVersion(newPlatform, defaultAppVersion)      
    }));
  }

  function changeVersion(newVersion) {
    setAppConf(oldAppConf => ({
      ...oldAppConf,
      version: newVersion,
      platformVersion: getDefaultOSVersion(appConf.platform, newVersion)
    }));
  }

  function changePlatformVersion(newVersion) {
    setAppConf(oldAppConf => ({
      ...oldAppConf,
      platformVersion: newVersion
    }));
  }
  return (
    <main>
      <Image src="https://emergetools.com/images/emergetoolsstandard.png" alt="logo" width="80" height="48" />
      <div className="container">
        <Flex justifyContent="justify-start"
          alignItems="items-start"
          spaceX='space-x-2'>
            <Title>Apps Dashboard</Title><Badge color="slate" text="Demo experience" size="xs" /></Flex>
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
            handleSelect={(value) => changePlatform(value)}
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
          <VersionChooser data={data} appConf={appConf} handleSelect={changeVersion}/>

        </Flex>


        <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">

          <StartupCard data={data} appConf={appConf} platformVersionHandler={changePlatformVersion}/>
          <SizeCard size={size}/>
          <Reaper />
        </ColGrid>

        <Block marginTop="mt-6">
          <Insights />          
        </Block>
      </div>
    </main>
  );
}


export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/appsize')
  const data = await res.json()
  return {
    props: { data }, // will be passed to the page component as props
  }
}