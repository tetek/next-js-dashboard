import { SelectBox, SelectBoxItem } from "@tremor/react";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline"

export default function VersionChooser({data, platform, version, handleSelect}) {
  console.log('versions')
  const getVersions = () => data.data[platform].map(p => p.version );
  const defaultVersion = () => version? version: getVersions()[0];
  return (
  <SelectBox
    handleSelect={handleSelect}
    defaultValue={defaultVersion()}
    maxWidth="max-w-xs"
    // marginTop="mt-6"
  >
    {getVersions().map(v => 
      (<SelectBoxItem key={v} value={v} text={v}  />)
    )}        
  </SelectBox>
  )
}