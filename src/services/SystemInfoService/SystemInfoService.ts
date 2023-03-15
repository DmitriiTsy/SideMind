import { getUniqueId, getVersion, isTablet } from 'react-native-device-info'

import { Injectable } from 'IoC'

export const ISystemInfoServiceTid = Symbol.for('ISystemInfoServiceTid')

export interface ISystemInfoService {
  deviceId: string
  isTablet: boolean
  versionString: string
  init(): Promise<void>
}

@Injectable()
export class SystemInfoService implements ISystemInfoService {
  versionString: string
  deviceId: string
  isTablet: boolean

  async init() {
    this.deviceId = await getUniqueId()
    this.isTablet = isTablet()
    this.versionString = getVersion()
  }
}
