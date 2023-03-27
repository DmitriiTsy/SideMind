import React, { FC } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Svg } from 'components/ui/Svg'
import { deviceHeight, deviceWidth } from 'utils/dimentions'
import { IShareOption } from 'components/Chat/utils/useShareOptions'

interface IModalShareOptions {
  modalVisible: boolean
  setModalVisible: (value: boolean) => () => void
  shareOptions: IShareOption[]
}

export const ModalShareOptions: FC<IModalShareOptions> = ({
  modalVisible,
  setModalVisible,
  shareOptions
}) => {
  return (
    <Modal transparent visible={modalVisible}>
      <View style={{ position: 'relative' }}>
        <Pressable style={SS.pressModal} onPress={setModalVisible(false)} />
        <View style={SS.viewModal}>
          {shareOptions.map((item, index) => (
            <TouchableOpacity
              onPress={item.onPress}
              key={index}
              style={[
                SS.shareOption,
                {
                  borderBottomWidth: index !== shareOptions.length - 1 ? 0.5 : 0
                }
              ]}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 15,
                  lineHeight: 21,
                  letterSpacing: 0.5
                }}
              >
                {item.text}
              </Text>
              <View style={{ marginRight: 34 }}>
                <Svg name={item.icon} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const SS = StyleSheet.create({
  pressModal: {
    flex: 1,
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight
  },
  viewModal: {
    backgroundColor: '#2C2C2D',
    borderRadius: 12,
    marginTop: 100,
    width: 226,
    position: 'absolute',
    right: 0
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 226,
    marginLeft: 18,
    paddingVertical: 11,
    borderBottomColor: '#444444'
  }
})
