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
import { Icon } from '@Pimcore/components/icon/icon'
import { SimpleTree as Tree, type TreeDataItem } from '@Pimcore/components/simple-tree/simple-tree'
import { useUserHelper } from '@Pimcore/modules/user/hooks/use-user-helper'
import { type TreeDataNode, type FormInstance } from 'antd'
// import { useTranslation } from 'react-i18next'
import { useFormModal } from '@Pimcore/components/modal/form-modal/hooks/use-form-modal'

const TreeContainer = ({ ...props }): React.JSX.Element => {
  // const { t } = useTranslation()
  const { fetchUser, getUserTree, addNewUser, addNewFolder, removeUser, cloneUser, removeFolder } = useUserHelper()
  const [loading, setLoading] = React.useState<boolean>(true)

  // todo should we set this initial state here?
  const [treeData, setTreeData] = React.useState<TreeDataNode[]>([
    {
      title: 'All users',
      key: 'all',
      icon: <Icon name={ 'folder' } />,
      children: []
    }
  ])

  const [expandedKeys, setExpandedKeys] = React.useState<string[]>([])

  const updateTreeData = (key, items, add?): void => {
    setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
      const parentNode = findNodeByKey(data, key)
      if (parentNode !== undefined) {
        parentNode.children = parentNode.children ?? []

        if (add === true) {
          parentNode.children.push(...createNodeByResponse(items))
        } else {
          parentNode.children = createNodeByResponse(items)
        }
      }
      return [...data]
    })
  }
  const findNodeByKey = (data: TreeDataNode[], key: any): TreeDataItem | undefined => {
    for (const node of data) {
      if (node.key === key) {
        return node
      }
      if (node.children !== undefined && node.children !== null) {
        const found = findNodeByKey(node.children, key)
        if (found !== undefined) {
          return found
        }
      }
    }
    return undefined
  }

  const findParentByKey = (data: TreeDataNode[], key: any, parent: TreeDataNode | null = null): TreeDataNode | null => {
    for (const node of data) {
      if (node.key === key) {
        return parent
      }
      if (node.children !== undefined && node.children !== null) {
        const found = findParentByKey(node.children, key, node)
        if (found !== null) {
          return found
        }
      }
    }
    return null
  }

  const createNodeByResponse = (items: any): TreeDataNode[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      icon: item.type === 'user' ? <Icon name={ 'user-01' } /> : <Icon name={ 'folder' } />,
      actions: item.type === 'user'
        ? [
            { key: 'clone-user', icon: 'copy-03' },
            { key: 'remove-user', icon: 'delete-outlined' }
          ]
        : [
            { key: 'add-folder', icon: 'folder-plus' },
            { key: 'add-user', icon: 'user-plus-01' },
            { key: 'remove-folder', icon: 'delete-outlined' }
          ],
      children: [],
      isLeaf: item.children === false
    }))
  }
  const handleOnLoadData = async (node: TreeDataNode): Promise<void> => {
    await getUserTree({ parentId: node.key }).then(response => {
      updateTreeData(node.key, response.items)
    })
  }

  const [renderModalSettings, setRenderModalSettings] = React.useState<any>({
    type: 'confirmation',
    title: '',
    label: ''
  })

  const { renderModal: RenderModal, showModal } = useFormModal({ type: renderModalSettings.type })

  const callbackManager = (form: FormInstance<any>, props): void => {
    renderModalSettings.callback(form, props)
  }

  // React.useEffect((): void => {
  //   console.log('expandedKeys', expandedKeys)
  // }, [expandedKeys])

  // load initial tree data
  React.useEffect((): void => {
    // todo parentId is required ist the first tree always 0 ?
    getUserTree({ parentId: 0 }).then(response => {
      updateTreeData('all', response.items)
      setExpandedKeys(['all'])

      setLoading(false)
    }).catch(e => {
      console.error(e)
    })
  }, [])

  return (
    !loading
      ? (
        <>
          <Tree
            defaultExpandedKeys={ expandedKeys }
            onActionsClick={ (key: string, action: string) => {
              // todo handle errors and show error message

              switch (action) {
                case 'add-folder':
                  setRenderModalSettings({
                    type: 'input',
                    title: 'Add Folder',
                    label: 'Please enter the new name',
                    callback: async (form: FormInstance<any>) => {
                      const data = await addNewFolder({ parentId: key, name: form.getFieldValue('input') })
                      updateTreeData(key, [data], true)
                      // setExpandedKeys([...expandedKeys, key])
                    }
                  })

                  break
                case 'add-user':
                  setRenderModalSettings({
                    type: 'input',
                    title: 'Add User',
                    label: 'Please enter the new name',
                    callback: (form: FormInstance<any>) => {
                      addNewUser({ parentId: key, name: form.getFieldValue('input') }).then(newUser => {
                        updateTreeData(key, [newUser], true)
                        // setExpandedKeys([...expandedKeys, key])
                      }).catch(e => {
                        console.error(e)
                      })
                    }
                  })

                  break
                case 'clone-user':
                  setRenderModalSettings({
                    type: 'input',
                    title: 'Clone User',
                    label: 'Please enter the new name',
                    callback: (form: FormInstance<any>) => {
                      cloneUser({ id: key, name: form.getFieldValue('input') }).then(newUser => {
                        const parentId = findParentByKey(treeData, key)?.key
                        updateTreeData(parentId, [newUser], true)
                      }).catch(e => {
                        console.error(e)
                      })
                    }
                  })

                  break
                case 'remove-user':
                  setRenderModalSettings({
                    type: 'confirmation',
                    title: 'Remove User',
                    content: 'Are you sure',
                    callback: async () => {
                      await removeUser({ id: key })

                      const parent = findParentByKey(treeData, key)
                      if (parent?.children !== undefined) {
                        const updatedTreeData = parent.children.filter((child: TreeDataNode) => child.key !== key)
                        setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
                          parent.children = updatedTreeData
                          return [...data]
                        })
                      }
                    }
                  })

                  break
                case 'remove-folder':
                  setRenderModalSettings({
                    type: 'confirmation',
                    title: 'Remove Folder',
                    content: 'Are you sure',
                    callback: async () => {
                      await removeFolder({ id: key })

                      const parent = findParentByKey(treeData, key)
                      if (parent?.children !== undefined) {
                        const updatedTreeData = parent.children.filter((child: TreeDataNode) => child.key !== key)
                        setTreeData((data: TreeDataNode[]): TreeDataNode[] => {
                          parent.children = updatedTreeData
                          return [...data]
                        })
                      }
                    }
                  })

                  break
              }

              showModal()
            }
          }
            onLoadData={ handleOnLoadData }
            onSelected={ fetchUser }
            treeData={ treeData }
          />

          <RenderModal
            { ...renderModalSettings }
            onSubmit={ callbackManager }
          />
        </>
        )
      : <></>
  )
}

export { TreeContainer }
