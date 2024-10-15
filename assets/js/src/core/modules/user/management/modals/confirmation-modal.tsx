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

import React, { useCallback, useState } from 'react'
import { Modal } from '@Pimcore/components/modal/modal'

export interface ConfirmationModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  children?: React.ReactNode
}

export const ConfirmationModal = ({ open, onCancel, onConfirm, children, ...props }: ConfirmationModalProps): React.JSX.Element => {
  return (
    <Modal
      onCancel={ onCancel }
      onOk={ onConfirm }
      open={ open }
      title="TODO"
    >
      {children}
    </Modal>
  )
}

export const useConfirmationModal = (callback: (...args: any[]) => void, props: any): { isOpen: boolean, open: () => void, confirm: () => void, confirmationModal: JSX.Element } => {
  const [value, setValue] = useState('init')
  const [isOpen, setIsOpen] = useState(false)

  const open = (): void => {
    setIsOpen(true)
  }

  const onCancel = useCallback((): void => { setIsOpen(false) }, [])
  const onConfirm = useCallback((): void => {
    setIsOpen(false)
    callback()
  }, [callback])

  const confirmationModal = (
    <ConfirmationModal
      onCancel={ onCancel }
      onConfirm={ onConfirm }
      open={ isOpen }
      setValue={ setValue }
      value={ value }
      { ...props }
    />
  )

  return {
    isOpen,
    open,
    confirm: open,
    confirmationModal
  }
}
