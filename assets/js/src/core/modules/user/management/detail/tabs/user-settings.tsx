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
import { Form, Input, Col, Row } from 'antd'
import { Card } from '@Pimcore/components/card/card'
import { Switch } from '@Pimcore/components/switch/switch'
import { useTranslation } from 'react-i18next'
import { useUser } from '@Pimcore/modules/user/hooks/use-user'

export interface UserSettingsProps {
  id: number
}

const UserSettings = ({ id, ...props }: UserSettingsProps): React.JSX.Element => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const { user } = useUser(id)

  console.log(user)

  return (
    <div className={ 'scrolling-area' }>
      <Form
        form={ form }
        layout="vertical"
      >
        <Row gutter={ [10, 10] }>
          <Col span={ 8 }>
            <Card title="General">
              <Switch
                defaultChecked
                labelRight={ 'Active' }
              />

              <Form.Item
                initialValue={ user?.name }
                label={ t('user-management.username') }
                name="username"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={ t('user-management.password') }
                name="password"
              >
                <Input type="password" />
              </Form.Item>

              <Switch
                defaultChecked
                labelRight={ t('user-management.2fa') }
              />
            </Card>
          </Col>
          <Col span={ 8 }>
            <Card title={ 'Avatar' }>
              todo avatar
            </Card>
          </Col>
          <Col span={ 16 }>
            <Card title="Customisation">
              <Form.Item
                label={ t('user-management.first-name') }
                name="first-name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={ t('user-management.last-name') }
                name="last-name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={ t('user-management.email') }
                name="email"
              >
                <Input />
              </Form.Item>

              <Switch
                labelRight={ t('user-management.welcome-screen') }
              />

              <Switch
                defaultChecked
                labelRight={ t('user-management.memorize-open-tabs') }
              />

              <Switch
                defaultChecked
                labelRight={ t('user-management.disable-unsaved-content-warning') }
              />

              <Switch
                defaultChecked
                labelRight={ t('user-management.show-closed-warning') }
              />
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export { UserSettings }
