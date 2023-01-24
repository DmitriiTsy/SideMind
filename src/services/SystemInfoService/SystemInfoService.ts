import { getUniqueId, isTablet } from 'react-native-device-info'

import { Injectable } from 'IoC'

export const ISystemInfoServiceTid = Symbol.for('ISystemInfoServiceTid')

export interface ISystemInfoService {
  deviceId: string
  isTablet: boolean

  init(): Promise<void>
}

@Injectable()
export class SystemInfoService implements ISystemInfoService {
  deviceId: string
  isTablet: boolean

  async init() {
    this.deviceId = await getUniqueId()
    this.isTablet = isTablet()
  }
}
