import React from 'react'

import { ScreenContainer } from 'components/ScreenContainer'

import { Bot, InChatPreview, ChatHeaders } from './components'

export const Home = () => {
  return (
    <ScreenContainer topInsetColor={'black'} bottomInsetColor={'black'}>
      <ChatHeaders />
      <Bot />
      <Bot />
      <InChatPreview />
      <InChatPreview />
    </ScreenContainer>
  )
}
