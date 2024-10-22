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
import { SplitLayout } from '@Pimcore/components/split-layout/split-layout'
import { TreeContainer } from '@Pimcore/modules/user/management/tree/tree-container'
import { ManagementDetail } from '@Pimcore/modules/user/management/detail/management-detail'
import { Content } from '@Pimcore/components/content/content'
import { Toolbar } from '@Pimcore/modules/user/management/toolbar/toolbar'

const ManagementContainer = ({ ...props }): React.JSX.Element => {
  const sidebar = {
    id: 'user-tree',
    size: 25,
    minSize: 200,
    children: [
      <TreeContainer key="user-tree" />
    ]
  }

  const main = {
    id: 'user-detail',
    size: 75,
    minSize: 600,
    children: [
      <ManagementDetail key="user-detail" />
    ]
  }

  return (
    <>
      <Content padded>
        <SplitLayout
          leftItem={ sidebar }
          rightItem={ main }
          withDivider
        />
      </Content>

      <Toolbar />
    </>
  )
}

export { ManagementContainer }
