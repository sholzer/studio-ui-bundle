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
  userReceived,
  selectUserById
} from '@Pimcore/modules/user/user-slice'
import { useEffect, useState } from 'react'

import { api as userApi, type UserGetByIdApiResponse } from '@Pimcore/modules/user/user-api-slice.gen'

interface UseUserReturn {
  isLoading: boolean
  isError: boolean
  user: undefined | ReturnType<typeof selectUserById>
  fetchUser: () => void
}

export const useUser = (id: number): UseUserReturn => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => selectUserById(state, id))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  async function getUser (): Promise<UserGetByIdApiResponse> {
    const { data } = await dispatch(userApi.endpoints.userGetById.initiate({ id }))

    if (data !== undefined) {
      return data
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {} as any
  }

  useEffect(() => {
    console.log({ user })

    if (user === undefined) {
      fetchUser()
    }
  }, [user])

  const fetchUser = (): void => {
    setIsLoading(true)

    getUser().then((userData) => {
      console.log('userData', userData)
      dispatch(userReceived(userData));

    }).catch(() => {
      setIsError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return {
    isLoading,
    isError,
    user,
    fetchUser
  }
}
