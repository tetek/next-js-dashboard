import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  ColGrid,
  Block, Subtitle, Toggle, ToggleItem, Badge, Footer, Button
} from '@tremor/react';

import { useState } from 'react';
import StartupCard from '../comps/StartupCard';
import VersionChooser from '../comps/VersionChooser';
import SizeCard from '../comps/SizeCard';
import Image from 'next/image';
import { Flex } from "@tremor/react";
import { FaApple, FaAndroid } from "react-icons/fa"
import Reaper from '../comps/Reaper';
import InsightsCard from '../comps/InsightsCard';
import { HomeType, PerfType, VersionType, AppConfType } from '../interfaces';
import appPerformance from '../data/appInfo'

const Home = ({ data }: HomeType) => {
  const [appConf, setAppConf]: [AppConfType, any] = useState({ app: '1Password', platform: 'apple', version: '7.2.0', platformVersion: "iOS15" })

  const platformData = (platform: string): Array<VersionType> => (data.data as any)[platform]


  const e = platformData(null!!)
  const size = platformData(appConf.platform)?.find((i: VersionType) => i.version == appConf.version)?.size

  function changeApp(newApp: string) {
    const defaultAppVersion = platformData(appConf.platform).map((p: VersionType) => p.version)[0] ?? "no version"
    setAppConf((oldAppConf: AppConfType) => ({
      ...oldAppConf,
      app: newApp,
      version: defaultAppVersion
    }));
  }
  function getDefaultOSVersion(platform = appConf.platform, version = appConf.version) {
    const perAppVersion = platformData(platform).filter((e: VersionType) => e.version == version)[0]
    const osVersions = Array.from(new Set(perAppVersion?.perf.map((i: PerfType) => Object.keys(i.time)).flat()))
    return osVersions[0]
  }

  function changePlatform(newPlatform: string) {
    const defaultAppVersion = platformData(newPlatform).map(p => p.version)[0] ?? "no version"

    setAppConf((oldAppConf: AppConfType) => ({
      ...oldAppConf,
      platform: newPlatform,
      version: defaultAppVersion,
      platformVersion: getDefaultOSVersion(newPlatform, defaultAppVersion)
    }));
  }

  function changeVersion(newVersion: string) {
    setAppConf((oldAppConf: AppConfType) => ({
      ...oldAppConf,
      version: newVersion,
      platformVersion: getDefaultOSVersion(appConf.platform, newVersion)
    }));
  }

  function changePlatformVersion(newVersion: string) {
    setAppConf((oldAppConf: AppConfType) => ({
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
        <TabList defaultValue={"1Password"} handleSelect={(value) => { changeApp(value) }} marginTop="mt-6">
          <Tab value="1Password" text="1Password" />
          <Tab value="Apollo" text="Apollo" />
        </TabList>


        {appConf.app === "1Password" ?

          <Block>


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
              <VersionChooser data={data} appConf={appConf} handleSelect={changeVersion} />

            </Flex>
            <ColGrid numColsMd={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6" marginTop="mt-6">
              <StartupCard data={data} appConf={appConf} platformVersionHandler={changePlatformVersion} />
              <SizeCard size={size!} />
              <Reaper />
            </ColGrid>

            <Block marginTop="mt-6">
              <InsightsCard insights={data.insights} />
            </Block>
          </Block>
          :
          <Block marginTop="mt-6">
            <Card><Title>No uploads for Apollo</Title>
              <Footer height="h-16">
                <Flex justifyContent="justify-end">
                  <Button text="Upload" size="xs" importance="secondary" handleClick={() => alert("Hire me")} />
                </Flex>
              </Footer>
            </Card>
          </Block>
        }

      </div>
      <p>This website is for training purposes only</p>
    </main>
  );
}

export default Home;

export async function getStaticProps() {
  return {
    props: { data: appPerformance },
  }
}