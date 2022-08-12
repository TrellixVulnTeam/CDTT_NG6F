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

export interface ITabBlockchain {
  totalSupply: string
  totalMint: string
  contractAddress: string
  tokenId: string | number
  network: string
  networkName: string
  creatorName: string
  creatorUsername: string
  creatorId: number
}

export interface ITabSetting {
  serviceFee: string | number
  creatorFee: string | number
  hotPosition: string | number
  topPosition: string | number
  isHot: boolean
  isTop: boolean
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

export interface IMetaDataFile {
  [x: string]: any
  id: number
  itemId: null | number
  metaDescription: string
  metaIcon: string
  metaMaximum: null | number
  metaMinimum: null | number
  metaName: string
  metaStatisValue: string
  metaStaticValue: string
  metaType: string
  metaTypeAvatar: null | string
  metaTypeId: number
  metaTypePosition: number
  metaValue: string
  metaValueType: 'FILE'
}

export interface IMetaMap {
  metaName?: string
  metaAnnotation?: string
  metaValueType?: string
  metaValue?: string
  metaDescription?: string
  [x: string]: any
}
