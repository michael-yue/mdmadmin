import request from '@/utils/request'

export function listAll(branchid, currentpage, limit) {
  return request({
    url: '/api/listCardsAll',
    method: 'get',
    params: {
      branchid,
      currentpage,
      limit
    }
  })
}
export function listStatByBranch(startdate, enddate, amount) {
  return request({
    url: '/api/listStatByBranch',
    method: 'get',
    params: {
      startdate,
      enddate,
      amount
    }
  })
}

export function listCardRechargeSum(branchid, startdate, enddate) {
  return request({
    url: '/api/listCardRechargeSum',
    method: 'get',
    params: {
      branchid,
      startdate,
      enddate
    }
  })
}

export function listCardRechargeGroup(branchid, startdate, enddate) {
  return request({
    url: '/api/listCardRechargeGroup',
    method: 'get',
    params: {
      branchid,
      startdate,
      enddate
    }
  })
}

export function getCardByNo(memberNumber) {
  return request({
    url: '/api/queryMemberInfoByCardnumber',
    method: 'get',
    params: {
      memberNumber
    }
  })
}

export function getCardRechargeList(cardid) {
  return request({
    url: '/api/getCardRechargeList',
    method: 'get',
    params: {
      cardid
    }
  })
}

export function getCardConsumeList(cardid) {
  return request({
    url: '/api/getCardConsumeList',
    method: 'get',
    params: {
      cardid
    }
  })
}

export function getCardTransferList(cardid) {
  return request({
    url: '/api/getCardTransferList',
    method: 'get',
    params: {
      cardid
    }
  })
}

export function rechargeCard(userid, cardid, amount) {
  return request({
    url: '/api/rechargeCard',
    method: 'get',
    params: {
      userid,
      cardid,
      amount
    }
  })
}

export function createCard(card) {
  return request({
    url: '/api/createCard',
    method: 'get',
    params: {
      card
    }
  })
}
