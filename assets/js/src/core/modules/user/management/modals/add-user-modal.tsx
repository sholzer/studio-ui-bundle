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
import { Modal } from '@Pimcore/components/modal/modal'
import { Form, Input } from 'antd'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { useTranslation } from 'react-i18next'

export interface AddUserModalProps {
  open: boolean
  onCancel: () => void
  parentId: string | number | undefined
  onConfirm?: (parentId: string | number | undefined, id: number, name: string, type: string) => void
}

export const AddUserModal = ({ open, parentId, onCancel, onConfirm, ...props }: AddUserModalProps): React.JSX.Element => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const { addNewUser } = useUserHelper()

  const handleOnOk = async (): Promise<any> => {
    if (parentId !== undefined) {
      const { id, name, type } = await addNewUser({ parentId, name: form.getFieldValue('name') })

      onConfirm?.(parentId, id, name, type)
    }
  }

  return (
    <Modal
      onCancel={ () => { onCancel() } }
      onOk={ handleOnOk }
      open={ open }
      title={ t('user-management.add-user') }
    >
      <Form
        form={ form }
        layout="vertical"
      >
        <Form.Item
          label={ 'todo' }
          name="name"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
