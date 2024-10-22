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
import { UserDetailTab } from '@Pimcore/modules/user/management/detail/tabs/user-detail-tab'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { Content } from '@Pimcore/components/content/content'

const ManagementDetail = ({ ...props }): React.JSX.Element => {
  const { getAllIds, activeId } = useUserHelper()
  const { openUser } = useUserHelper()

  return (
    <>
      {getAllIds?.map((id) => (
        <button
          key={ id }
          onClick={ () => { openUser(id) } }
          type={ 'button' }
        >
          todo title {id}

        </button>
      ))}

      {activeId !== undefined
        ? (
          <UserDetailTab id={ activeId } />
          )
        : (
          <Content none></Content>
          )}
    </>
  )
}

export { ManagementDetail }
