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
import { type TreeDataNode } from 'antd'
import { AddUserModal } from '@Pimcore/modules/user/management/modals/add-user-modal'
import { useConfirmationModal } from '@Pimcore/modules/user/management/modals/confirmation-modal'

const TreeContainer = ({ ...props }): React.JSX.Element => {
  const { getUserTree } = useUserHelper()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [activeNode, setActiveNode] = React.useState<string | number | undefined>(undefined)
  const [addUserModalOpen, setaddUserModalOpen] = React.useState<boolean>(false)

  // todo should we set this initial state here?
  const [treeData, setTreeData] = React.useState<any[]>([
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
  const createNodeByResponse = (items: any): TreeDataNode[] => {
    return items.map((item: any) => ({
      title: item.name,
      key: item.id,
      icon: item.type === 'user' ? <Icon name={ 'user-01' } /> : <Icon name={ 'folder' } />,
      actions: item.type === 'user'
        ? [
            { key: 'clone', icon: 'copy-03' },
            { key: 'remove-user', icon: 'trash' }
          ]
        : [
            { key: 'add-folder', icon: 'PlusCircleOutlined' },
            { key: 'add-user', icon: 'PlusCircleOutlined' },
            { key: 'remove', icon: 'trash' }
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

  // todo
  // const createNewUser = async (name): Promise<any> => {
  //   await addNewUser({ parentId: 7, name })
  //
  //   getUserTree({ parentId: 7 }).then(response => {
  //     updateTreeData(7, response.items)
  //   }).catch(e => {
  //     console.error(e)
  //   })
  //
  //   setaddUserModalOpen({ key: 0, open: false })
  // }

  const onRemoveUser = async (): Promise<any> => {
    console.log('remove user')
  }

  const { confirm, confirmationModal } = useConfirmationModal(onRemoveUser, {
    title: 'Remove User',
    content: 'Are you sure you want to remove this user?'
  })

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
            onActionsClick={ (key: string | number, action: string) => {
              setActiveNode(key)
              // todo check if a callback modal is needed
              switch (action) {
                case 'add-folder':
                  console.log('add-folder clicked:', key)
                  break
                case 'add-user':
                  setaddUserModalOpen(true)
                  break
                case 'clone':
                  console.log('clone clicked:', key)
                  break
                case 'remove-user':
                  confirm()
                  break
                case 'remove':
              }
            }
                }
            onLoadData={ handleOnLoadData }
            onSelected={ (key) => { console.log('open user or folder', key) } }
            treeData={ treeData }
          />

          <AddUserModal
            onCancel={ () => { setaddUserModalOpen(false) } }
            onConfirm={ (parentId, id, name, type) => {
              updateTreeData(parentId, [{ id, name, type, children: false }], true)
              setaddUserModalOpen(false)
            } }
            open={ addUserModalOpen }
            parentId={ activeNode }
          />

          {confirmationModal}
        </>
        )
      : <></>
  )
}

export { TreeContainer }
