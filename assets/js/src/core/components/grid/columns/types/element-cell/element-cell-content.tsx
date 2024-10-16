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

import React, { forwardRef, type MutableRefObject } from 'react'
import { type DefaultCellProps } from '@Pimcore/components/grid/columns/default-cell'
import { Tag } from '@Pimcore/components/tag/tag'
import { Icon } from '@Pimcore/components/icon/icon'
import { useStyle } from './element-cell.styles'
import { useDroppable } from '@Pimcore/components/drag-and-drop/hooks/use-droppable'
import { useElementHelper } from '@Pimcore/modules/element/hooks/use-element-helper'

export const ElementCellContent = forwardRef(function ElementCellContent (props: DefaultCellProps, ref: MutableRefObject<HTMLDivElement>): React.JSX.Element {
  const { styles } = useStyle()
  const { openElement } = useElementHelper()
  const propertyData = props.row.original
  const { getStateClasses } = useDroppable()

  function openElementWidget (): void {
    if (props !== undefined) {
      openElement({
        id: propertyData.data.id,
        type: 'data-object'
      }).catch(() => {})
    }
  }

  const tagText = propertyData.data !== null && `${propertyData.data.path}${propertyData.data.filename ?? propertyData.data.key}`

  return (
    <div
      className={ [styles.link, ...getStateClasses()].join(' ') }
      ref={ ref }
    >
      {tagText !== false && (
        <Tag
          bordered={ false }
          color="processing"
          onClick={ openElementWidget }
        >
          {tagText}
        </Tag>
      )}

      <Icon
        className={ styles.dropTargetIcon }
        name={ 'copy-07' }
      />
    </div>
  )
})
