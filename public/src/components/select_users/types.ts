import { CSSObject } from '@emotion/react';
import { UserDetailInfo } from '@store/users/types';
import { CSSProperties } from 'react';

export interface ISelectUsersProps {
  className?: string
  items: UserDetailInfo[]
  selectedValue?: string[]
  displayName?: string
  valueName?: string
  style?: CSSProperties

  placeholder?: string
  dropdownWidth?: number | 'auto'

  onSelect?: (value?: string[]) => void
  renderItem?: (item: UserDetailInfo) => string | JSX.Element
}

export interface ISelectUsersState {
  selectedValue?: string []
}
