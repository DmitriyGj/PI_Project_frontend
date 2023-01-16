import { UserDetailInfo,UserInfo } from '@store/users/types';
import { CSSProperties } from 'react';

export interface ISelectUsersProps {
  className?: string
  items: UserInfo[]
  selectedValue?: string[]
  displayName?: string
  valueName?: string
  style?: CSSProperties
  disabled: boolean

  placeholder?: string
  dropdownWidth?: number | 'auto'

  onSelect?: (value?: string[]) => void
  renderItem?: (item: UserDetailInfo) => string | JSX.Element
}

export interface ISelectUsersState {
  selectedValue?: string []
}
