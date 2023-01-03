import React from 'react'

import { ScreenContainer } from 'components/ScreenContainer'

import { ChatPreview } from './components/ChatPreview'
import { InChatPreview } from './components/InChatPreview'
import { ChatHeaders } from './components/Bot'

export const Home = () => {
  return (
    <ScreenContainer topInsetColor={'black'} bottomInsetColor={'black'}>
      <ChatHeaders />
      <ChatPreview />
      <ChatPreview />
      <InChatPreview />
      <InChatPreview />
    </ScreenContainer>
  )
}
