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

import { store, useAppDispatch } from '@Pimcore/app/store'
import {
  api,
  type UserCreateApiResponse,
  type UserGetTreeApiResponse
  // type TreeNode,
  // type UserCreateApiArg
} from '@Pimcore/modules/user/user-api-slice.gen'

interface UseUserReturn {
  openUser: (props) => void
  getUserTree: (props) => Promise<UserGetTreeApiResponse>
  addNewUser: ({ parentId, name }) => Promise<UserCreateApiResponse>
}

export const useUserHelper = (): UseUserReturn => {
  const dispatch = useAppDispatch()
  async function openUser (props): Promise<void> {
    console.log('openUser', props)
    const { id } = props
    const user = await store.dispatch(api.endpoints.userGetById.initiate({ id }))

    console.log('call open User', user)

    // openMainWidget({
    //     name: asset.data?.filename,
    //     icon: asset.data?.icon?.value,
    //     id: `asset-${config.id}`,
    //     component: 'asset-editor',
    //     config
    // })
  }

  async function getUserTree (props): Promise<UserGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.userGetTree.initiate({ parentId }))

    return data
  }

  async function addNewUser ({ parentId, name }): Promise<UserCreateApiResponse> {
    console.log('call add new user', parentId, name)
    const { data }: any = await dispatch(api.endpoints.userCreate.initiate({ body: { parentId, name } }))

    return data
  }

  return { openUser, getUserTree, addNewUser }
}
