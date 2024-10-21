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

import { useAppSelector } from '@Pimcore/app/store'
import { selectUserById } from '@Pimcore/modules/user/user-slice'

interface UseUserReturn {
  user: undefined | ReturnType<typeof selectUserById>
}

export const useUser = (id: number): UseUserReturn => {
  const user = useAppSelector(state => selectUserById(state, id))

  return { user }
}
