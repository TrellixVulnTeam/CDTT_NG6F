export interface ITabInfo {
  itemName: string
  avatar: string
  avatarType: string
  productCode: string
  thumb: string
  medias: Array<Record<string, any>>
  collectionId: number | string | null
  categoryId: number | string | null
  shortDescription: string
  description: string
}

export interface ITabSetting {
  serviceFee: string | number
  creatorFee: string | number
  hotPosition: string | number
  topPosition: string | number
  statusTop: boolean
  statusHot: boolean
}

type TabType = 'TEXT' | 'HTML' | 'FILE' | 'MAP' | 'BOOLEAN'

export interface IMetaTypes {
  metaTypeId: number
  metaType: string
  displayType: string
  metaTypePosition: number
  metaTypeName: string
  templateId: number
  typeTab: TabType
  [x: string]: any
}
