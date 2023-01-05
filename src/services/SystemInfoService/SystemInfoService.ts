import { getUniqueId } from 'react-native-device-info'

import { Injectable } from 'IoC'

export const ISystemInfoServiceTid = Symbol.for('ISystemInfoServiceTid')

export interface ISystemInfoService {
  deviceId: string

  init(): Promise<void>
}

@Injectable()
export class SystemInfoService implements ISystemInfoService {
  deviceId: string

  async init() {
    this.deviceId = await getUniqueId()
  }
}
