
export type InsightCardType = {
  insights: Array<InsightType>
}

export type InsightType = {
  insight: string,
  detail: string,
  gain: string
}

export type SizeInfo = {
  name: string,
  size: string,
}
export type SizeCardType = {
  size: Array<SizeInfo>
}

export type AppConfType = {
  app: string, platform: string, version: string, platformVersion: string
}

export type PerfType = {
  model: string,
  time: any
}

export type VersionType = {
  perf: Array<PerfType>,
  version: string,
  size: Array<SizeInfo>
}

export type PlatformType = {
  apple: Array<VersionType>,
  android: Array<VersionType>
}

export type DataType = {
  app: string,
  metric: string,
  timeLimit: number,
  insights: Array<InsightType>,
  data: PlatformType
}

export type HomeType = {
  data: DataType
}
export type StartupCardType = { 
  data : DataType, 
  appConf: AppConfType, 
  platformVersionHandler: (value: any) => void;
}

export type VersionChooserType = {
  data: DataType,
  appConf: AppConfType,
  handleSelect: (value: any) => void;
}