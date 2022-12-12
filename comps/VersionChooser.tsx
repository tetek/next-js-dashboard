import { SelectBox, SelectBoxItem } from "@tremor/react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline"

export default function VersionChooser({ data, appConf, handleSelect }) {
  const versions =  data.data[appConf.platform].map(p => p.version);
  const defaultVersion =  appConf.version ? appConf.version : versions[0];
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