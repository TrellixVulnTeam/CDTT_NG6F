import { Module } from 'vuex'
import memberKyc from './user'

const MemberStores: Record<string, Module<any, any>> = {
    memberKyc
}

export default MemberStores
