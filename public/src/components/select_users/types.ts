import { UserDetailInfo } from '@store/users/types';

export interface ISelectUsersProps {
  className?: string
  items: UserDetailInfo[]
  selectedValue?: string[]
  displayName?: string
  valueName?: string

  placeholder?: string
  dropdownWidth?: number | 'auto'

  onSelect?: (value?: string[]) => void
  renderItem?: (item: UserDetailInfo) => string | JSX.Element
}

export interface ISelectUsersState {
  selectedValue?: string []
}
