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

import { useAppDispatch, useAppSelector } from '@Pimcore/app/store'
import {
  api,
  type UserCreateApiResponse,
  type UserGetTreeApiResponse,
  type UserDeleteByIdApiResponse,
  type UserCloneByIdApiResponse,
  type UserFolderCreateApiResponse, type UserFolderDeleteByIdApiResponse, type UserGetByIdApiResponse
} from '@Pimcore/modules/user/user-api-slice.gen'
import { userOpened, userFetched } from '@Pimcore/modules/user/user-slice'

interface UseUserReturn {
  openUser: (id) => void
  fetchUser: (id) => Promise<UserGetByIdApiResponse>
  getUserTree: (props) => Promise<UserGetTreeApiResponse>
  addNewUser: ({ parentId, name }) => Promise<UserCreateApiResponse>
  removeUser: (props) => Promise<UserDeleteByIdApiResponse>
  removeFolder: (props) => Promise<UserFolderDeleteByIdApiResponse>
  cloneUser: (props) => Promise<UserCloneByIdApiResponse>
  addNewFolder: ({ parentId, name }) => Promise<UserFolderCreateApiResponse>
  activeId: number | undefined
  getAllIds: number[]
}

export const useUserHelper = (): UseUserReturn => {
  const dispatch = useAppDispatch()

  function openUser (id: number): void {
    dispatch(userOpened(id))
  }

  async function fetchUser (id: number): Promise<UserGetByIdApiResponse> {
    const { data }: any = await dispatch(api.endpoints.userGetById.initiate({ id }))
    dispatch(userFetched(data))

    openUser(id)

    return data
  }

  async function getUserTree (props): Promise<UserGetTreeApiResponse> {
    const { parentId } = props
    const { data }: any = await dispatch(api.endpoints.userGetTree.initiate({ parentId }))

    return data
  }

  async function addNewUser ({ parentId, name }): Promise<UserCreateApiResponse> {
    const { data }: any = await dispatch(api.endpoints.userCreate.initiate({ body: { parentId, name } }))

    return data
  }

  async function addNewFolder ({ parentId, name }): Promise<UserCreateApiResponse> {
    const { data }: any = await dispatch(api.endpoints.userFolderCreate.initiate({ body: { parentId, name } }))
    return data
  }

  async function removeUser (props): Promise<UserDeleteByIdApiResponse> {
    const { id } = props
    const { data }: any = await dispatch(api.endpoints.userDeleteById.initiate({ id }))

    return data
  }

  async function removeFolder (props): Promise<UserFolderDeleteByIdApiResponse> {
    const { id } = props
    const { data }: any = await dispatch(api.endpoints.userFolderDeleteById.initiate({ id }))

    return data
  }

  async function cloneUser (props): Promise<UserCloneByIdApiResponse> {
    const { id, name } = props
    const { data }: any = await dispatch(api.endpoints.userCloneById.initiate({ id, body: { name } }))

    return data
  }

  const activeId = useAppSelector(state => state.user.activeId)
  const getAllIds = useAppSelector(state => state.user.ids)

  return { openUser, fetchUser, getUserTree, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder, activeId, getAllIds }
}
