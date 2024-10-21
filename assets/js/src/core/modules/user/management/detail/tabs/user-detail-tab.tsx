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

import React from 'react'
import { Tabs, type TabsProps } from 'antd'
import { UserSettings } from '@Pimcore/modules/user/management/detail/tabs/user-settings'
import { UserWorkspaces } from '@Pimcore/modules/user/management/detail/tabs/user-workspaces'
import { UserKeyBindings } from '@Pimcore/modules/user/management/detail/tabs/user-key-bindings'
import { UserReferences } from '@Pimcore/modules/user/management/detail/tabs/user-references'
import { useTranslation } from 'react-i18next'
// import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'

export interface UserDetailTabProps {
  id: number
}

const UserDetailTab = (props: UserDetailTabProps): React.JSX.Element => {
  const { t } = useTranslation()
  // const { fetchUser } = useUserHelper()
  // const [user, setUser] = React.useState<any>(null)

  const items: TabsProps['items'] = [
    {
      key: `${props.id}-settings`,
      label: t('user-management.settings'),
      children: <UserSettings id={ props.id } />
    },
    {
      key: `${props.id}-workspaces`,
      label: t('user-management.workspaces'),
      children: <UserWorkspaces />
    },
    {
      key: `${props.id}-key-bindings`,
      label: t('user-management.key-bindings'),
      children: <UserKeyBindings />
    },
    {
      key: `${props.id}-user-references`,
      label: t('user-management.user-references'),
      children: <UserReferences />
    }
  ]

  // React.useEffect(() => {
  //   fetchUser(props.id).then((user) => {
  //     setUser(user)
  //   }).catch((error) => {
  //     console.error(error)
  //   })
  // }, [props.id])

  return (
    <>
      <Tabs
        className={ 'widget__content__detail' }
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={ items }
      >
      </Tabs>
    </>
  )
}

export { UserDetailTab }
