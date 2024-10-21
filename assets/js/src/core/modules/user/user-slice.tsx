/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import type { EntityAdapter } from '@reduxjs/toolkit/src/entities/models'
import { createEntityAdapter, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { injectSliceWithState, type RootState } from '@Pimcore/app/store'

export const userAdapter: EntityAdapter<any, any> = createEntityAdapter({})

export const slice = createSlice({
  name: 'user',
  initialState: userAdapter.getInitialState({
    activeId: undefined as number | undefined
  }),
  reducers: {
    userReceived: userAdapter.upsertOne,
    userOpened: (state, action: PayloadAction<number>) => {
      console.log('TEST', action.payload)
      // state.openIds.push(action.payload)
      state.activeId = action.payload
    },
    userFetched: (state, action: PayloadAction<any>) => {
      userAdapter.upsertOne(state, action)
    }
  }
})

injectSliceWithState(slice)

export const {
  userReceived,
  userOpened,
  userFetched
} = slice.actions

export const { selectById } = userAdapter.getSelectors((state: RootState) => state.user)
