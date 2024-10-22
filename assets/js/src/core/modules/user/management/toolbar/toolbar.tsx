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

import React, { useContext } from 'react'
import { Toolbar as ToolbarView } from '@Pimcore/components/toolbar/toolbar'
import { useTranslation } from 'react-i18next'
import { Button } from '@Pimcore/components/button/button'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { UserContext } from '@Pimcore/modules/user/user-provider'
// import { type ComponentRegistry } from '@Pimcore/modules/app/component-registry/component-registry'
// import { serviceIds } from '@Pimcore/app/config/services'
// import { container } from '@Pimcore/app/depency-injection'

export const Toolbar = (): React.JSX.Element => {
  const { t } = useTranslation()
  const { id } = useContext(UserContext)
  const { user, isLoading } = useUserDraft(id)
  const hasChanges = user?.modified === true
  // const componentRegistry = container.get<ComponentRegistry>(serviceIds['App/ComponentRegistry/ComponentRegistry'])
  // const ContextMenu = componentRegistry.get('editorToolbarContextMenuAsset')

  return (
    <ToolbarView>
      {/* <ContextMenu /> */}

      <Button
        disabled={ !hasChanges || isLoading }
        loading={ isLoading }
        onClick={ onSaveClick }
        type="primary"
      >
        {t('toolbar.save-and-publish')}
      </Button>
    </ToolbarView>
  )

  function onSaveClick (): void {
    console.log('SAVE USER')
  }
}
