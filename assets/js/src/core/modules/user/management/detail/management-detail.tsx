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
import { UserDetailTab } from '@Pimcore/modules/user/management/detail/tabs/user-detail-tab'
// import { useUser } from '@Pimcore/modules/user/hooks/use-user'

const ManagementDetail = ({ ...props }): React.JSX.Element => {
  // should come from state
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'User 1',
      children: <UserDetailTab
        id={ 1 }
        key={ 1 }
                />
    },
    {
      key: '2',
      label: 'User 2',
      children: <UserDetailTab
        id={ 2 }
        key={ 2 }
                />
    },
    {
      key: '3',
      label: 'User 3',
      children: <UserDetailTab
        id={ 3 }
        key={ 3 }
                />
    }
  ]

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={ items }
        onChange={ (key) => { console.log('switch to user tab', key) } }
      >
      </Tabs>
    </>
  )
}

export { ManagementDetail }
