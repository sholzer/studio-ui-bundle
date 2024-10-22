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
import { Accordion } from '@Pimcore/components/accordion/accordion'
import { Switch } from '@Pimcore/components/switch/switch'
import { useTranslation } from 'react-i18next'
import { useUserDraft } from '@Pimcore/modules/user/hooks/use-user-draft'
import { useUser } from '@Pimcore/modules/user/hooks/use-user'
import { Content } from '@Pimcore/components/content/content'

const UserSettings = ({ ...props }): React.JSX.Element => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  const { id } = useUser()
  const { user, isLoading } = useUserDraft(id)

  form.setFieldsValue({
    active: user?.active,
    username: user?.name,
    password: user?.password,
    twoFactorAuthenticationEnabled: user?.twoFactorAuthenticationEnabled,
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    welcomeScreen: user?.welcomeScreen,
    memorizeTabs: user?.memorizeTabs,
    allowDirtyClose: user?.allowDirtyClose,
    closeWarning: user?.closeWarning
  })

  const generalAccordion = [
    {
      key: '1',
      title: <>{ t('user-management.general') }</>,
      subtitle: <span className="ant-collapse-header-text__subtitle">ID: {id}</span>,
      children: <>
        <Form.Item
          name="active"
        >
          <Switch
            labelRight={ 'Active' }
          />
        </Form.Item>

        <Form.Item
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

        <Form.Item
          name="twoFactorAuthenticationEnabled"
        >
          <Switch
            labelRight={ t('user-management.2fa') }
          />
        </Form.Item>
      </>
    }
  ]

  const customisation = [
    {
      key: '1',
      title: <>{ t('user-management.customisation') }</>,
      children: <>
        <Form.Item
          label={ t('user-management.first-name') }
          name="firstname"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={ t('user-management.last-name') }
          name="lastname"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={ t('user-management.email') }
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="welcomeScreen"
        >
          <Switch
            labelRight={ t('user-management.welcome-screen') }
          />
        </Form.Item>

        <Form.Item
          name="memorizeTabs"
        >
          <Switch
            labelRight={ t('user-management.memorize-open-tabs') }
          />
        </Form.Item>

        <Form.Item
          name="allowDirtyClose"
        >
          <Switch
            labelRight={ t('user-management.allow-dirty-close') }
          />
        </Form.Item>

        <Form.Item
          name="closeWarning"
        >
          <Switch
            labelRight={ t('user-management.show-closed-warning') }
          />
        </Form.Item>
      </>
    }
  ]

  return (
    <>
      {!isLoading
        ? (
          <div className={ 'scrolling-area' }>
            <Form
              form={ form }
              layout="vertical"
            >
              <Row gutter={ [10, 10] }>
                <Col span={ 8 }>
                  <Accordion
                    activeKey={ '1' }
                    className={ 'accordion--card' }
                    items={ generalAccordion }
                    size={ 'small' }
                  >
                  </Accordion>

                  {/* <Card */}
                  {/*  title="General" */}
                  {/* > */}
                  {/*  <Form.Item */}
                  {/*    name="active" */}
                  {/*  > */}
                  {/*    <Switch */}
                  {/*      labelRight={ 'Active' } */}
                  {/*    /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    label={ t('user-management.username') } */}
                  {/*    name="username" */}
                  {/*  > */}
                  {/*    <Input /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    label={ t('user-management.password') } */}
                  {/*    name="password" */}
                  {/*  > */}
                  {/*    <Input type="password" /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    name="twoFactorAuthenticationEnabled" */}
                  {/*  > */}
                  {/*    <Switch */}
                  {/*      labelRight={ t('user-management.2fa') } */}
                  {/*    /> */}
                  {/*  </Form.Item> */}
                  {/* </Card> */}
                </Col>
                <Col span={ 8 }>
                  <Card title={ 'Avatar' }>
                    todo avatar
                  </Card>
                </Col>
                <Col span={ 16 }>
                  <Accordion
                    activeKey={ '1' }
                    className={ 'accordion--card' }
                    items={ customisation }
                    size={ 'small' }
                  >
                  </Accordion>

                  {/* <Card title="Customisation"> */}
                  {/*  <Form.Item */}
                  {/*    label={ t('user-management.first-name') } */}
                  {/*    name="firstname" */}
                  {/*  > */}
                  {/*    <Input /> */}
                  {/*  </Form.Item> */}
                  {/*  <Form.Item */}
                  {/*    label={ t('user-management.last-name') } */}
                  {/*    name="lastname" */}
                  {/*  > */}
                  {/*    <Input /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    label={ t('user-management.email') } */}
                  {/*    name="email" */}
                  {/*  > */}
                  {/*    <Input /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    name="welcomeScreen" */}
                  {/*  > */}
                  {/*    <Switch */}
                  {/*      labelRight={ t('user-management.welcome-screen') } */}
                  {/*    /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    name="memorizeTabs" */}
                  {/*  > */}
                  {/*    <Switch */}
                  {/*      labelRight={ t('user-management.memorize-open-tabs') } */}
                  {/*    /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    name="allowDirtyClose" */}
                  {/*  > */}
                  {/*    <Switch */}
                  {/*      labelRight={ t('user-management.allow-dirty-close') } */}
                  {/*    /> */}
                  {/*  </Form.Item> */}

                  {/*  <Form.Item */}
                  {/*    name="closeWarning" */}
                  {/*  > */}
                  {/*    <Switch */}
                  {/*      labelRight={ t('user-management.show-closed-warning') } */}
                  {/*    /> */}
                  {/*  </Form.Item> */}
                  {/* </Card> */}
                </Col>
                <Col span={ 16 }>
                  <Card title={ 'Roles' }>
                    todo roles
                  </Card>
                </Col>
              </Row>
            </Form>
          </div>
          )
        : <Content loading></Content>}
    </>
  )
}

export { UserSettings }
