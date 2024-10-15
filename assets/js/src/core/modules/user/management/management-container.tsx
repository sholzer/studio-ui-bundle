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

// export interface ManagementContainerProps {
// }

const ManagementContainer = ({ ...props }): React.JSX.Element => {
  // const { openAsset } = useAssetHelper()

  // async function onSelect (node: TreeNodeProps): Promise<void> {
  //     await store.dispatch(api.endpoints.assetGetById.initiate({ id: parseInt(node.id) }))
  //
  //     openAsset({
  //         config: {
  //             id: parseInt(node.id)
  //         }
  //     })
  // }

  const sidebar = {
    id: 'test-sidebar',
    size: 25,
    minSize: 200,
    children: [
      <TreeContainer key="test-1" />
    ]
  }

  const main = {
    id: 'test-main',
    size: 75,
    minSize: 600,
    children: [
      <ManagementDetail key="test-2" />
    ]
  }

  return (
    <>
      <SplitLayout
        leftItem={ sidebar }
        rightItem={ main }
        withDivider
      />
    </>
  )
}

export { ManagementContainer }
