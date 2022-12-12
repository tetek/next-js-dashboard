import { SelectBox, SelectBoxItem } from "@tremor/react";
import { VersionChooserType, VersionType } from "../interfaces";

export default function VersionChooser({ data, appConf, handleSelect }: VersionChooserType) {
  const versions = (data.data as any)[appConf.platform].map((p: VersionType): string => p.version) as Array<string>
  const defaultVersion = appConf.version ? appConf.version : versions[0];
  return (
    <SelectBox
      key={appConf.platform}
      handleSelect={handleSelect}
      defaultValue={defaultVersion}
      maxWidth="max-w-xs"
    >
      {versions.map(v =>
        (<SelectBoxItem key={v} value={v} text={v} />)
      )}
    </SelectBox>
  )
}