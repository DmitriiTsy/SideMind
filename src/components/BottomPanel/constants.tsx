import React from 'react'

import { EBottomPanelContent } from 'components/BottomPanel/types'
import { AddMind, CreateMind } from 'components/BottomPanel/content'

export const BOTTOM_PANEL_CONTENT = {
  [EBottomPanelContent.AddMind]: <AddMind />,
  [EBottomPanelContent.CreateMind]: <CreateMind />
}
