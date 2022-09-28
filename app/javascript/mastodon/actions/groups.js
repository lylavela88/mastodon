import api from '../api';
import { importFetchedAccounts } from './importer';
import { showAlertForError } from './alerts';

export const GROUP_FETCH_REQUEST = 'GROUP_FETCH_REQUEST';
export const GROUP_FETCH_SUCCESS = 'GROUP_FETCH_SUCCESS';
export const GROUP_FETCH_FAIL    = 'GROUP_FETCH_FAIL';

export const GROUPS_FETCH_REQUEST = 'GROUPS_FETCH_REQUEST';
export const GROUPS_FETCH_SUCCESS = 'GROUPS_FETCH_SUCCESS';
export const GROUPS_FETCH_FAIL    = 'GROUPS_FETCH_FAIL';

export const GROUP_EDITOR_TITLE_CHANGE = 'GROUP_EDITOR_TITLE_CHANGE';
export const GROUP_EDITOR_RESET        = 'GROUP_EDITOR_RESET';
export const GROUP_EDITOR_SETUP        = 'GROUP_EDITOR_SETUP';

export const GROUP_CREATE_REQUEST = 'GROUP_CREATE_REQUEST';
export const GROUP_CREATE_SUCCESS = 'GROUP_CREATE_SUCCESS';
export const GROUP_CREATE_FAIL    = 'GROUP_CREATE_FAIL';

// export const LIST_UPDATE_REQUEST = 'LIST_UPDATE_REQUEST';
// export const LIST_UPDATE_SUCCESS = 'LIST_UPDATE_SUCCESS';
// export const LIST_UPDATE_FAIL    = 'LIST_UPDATE_FAIL';

export const GROUP_DELETE_REQUEST = 'GROUP_DELETE_REQUEST';
export const GROUP_DELETE_SUCCESS = 'GROUP_DELETE_SUCCESS';
export const GROUP_DELETE_FAIL    = 'GROUP_DELETE_FAIL';

export const GROUP_MEMBERS_FETCH_REQUEST = 'GROUP_MEMBERS_FETCH_REQUEST';
export const GROUP_MEMBERS_FETCH_SUCCESS = 'GROUP_MEMBERS_FETCH_SUCCESS';
export const GROUP_MEMBERS_FETCH_FAIL    = 'GROUP_MEMBERS_FETCH_FAIL';

// export const LIST_EDITOR_SUGGESTIONS_CHANGE = 'LIST_EDITOR_SUGGESTIONS_CHANGE';
// export const LIST_EDITOR_SUGGESTIONS_READY  = 'LIST_EDITOR_SUGGESTIONS_READY';
// export const LIST_EDITOR_SUGGESTIONS_CLEAR  = 'LIST_EDITOR_SUGGESTIONS_CLEAR';

export const GROUP_MEMBER_ADD_REQUEST = 'GROUP_MEMBER_ADD_REQUEST';
export const GROUP_MEMBER_ADD_SUCCESS = 'GROUP_MEMBER_ADD_SUCCESS';
export const GROUP_MEMBER_ADD_FAIL    = 'GROUP_MEMBER_ADD_FAIL';

export const GROUP_MEMBER_REMOVE_REQUEST = 'GROUP_MEMBER_REMOVE_REQUEST';
export const GROUP_MEMBER_REMOVE_SUCCESS = 'GROUP_MEMBER_REMOVE_SUCCESS';
export const GROUP_MEMBER_REMOVE_FAIL    = 'GROUP_MEMBER_REMOVE_FAIL';

export const GROUP_ADDER_RESET = 'GROUP_ADDER_RESET';
export const GROUP_ADDER_SETUP = 'GROUP_ADDER_SETUP';

export const GROUP_MEMBER_GROUPS_FETCH_REQUEST = 'GROUP_MEMBER_GROUPS_FETCH_REQUEST';
export const GROUP_MEMBER_GROUPS_FETCH_SUCCESS = 'GROUP_MEMBER_GROUPS_FETCH_SUCCESS';
export const GROUP_MEMBER_GROUPS_FETCH_FAIL    = 'GROUP_MEMBER_GROUPS_FETCH_FAIL';


export const fetchList = id => (dispatch, getState) => {
  if (getState().getIn(['groups', id])) {
    return;
  }

  dispatch(fetchGroupRequest(id));

  api(getState).get(`/api/v1/groups/${id}`)
    .then(({ data }) => dispatch(fetchGroupSuccess(data)))
    .catch(err => dispatch(fetchGroupFail(id, err)));
};

export const fetchGroupRequest = id => ({
  type: GROUP_FETCH_REQUEST,
  id,
});

export const fetchGroupSuccess = group => ({
  type: GROUP_FETCH_SUCCESS,
  group,
});

export const fetchGroupFail = (id, error) => ({
  type: GROUP_FETCH_FAIL,
  id,
  error,
});

export const fetchGroups = () => (dispatch, getState) => {
  dispatch(fetchGroupsRequest());

  api(getState).get('/api/v1/groups')
    .then(({ data }) => dispatch(fetchGroupsSuccess(data)))
    .catch(err => dispatch(fetchGroupsFail(err)));
};

export const fetchGroupsRequest = () => ({
  type: GROUPS_FETCH_REQUEST,
});

export const fetchGroupsSuccess = groups => ({
  type: GROUPS_FETCH_SUCCESS,
  groups,
});

export const fetchGroupsFail = error => ({
  type: GROUPS_FETCH_FAIL,
  error,
});

export const submitListEditor = shouldReset => (dispatch, getState) => {
  const groupId = getState().getIn(['listEditor', 'listId']);
  const title  = getState().getIn(['listEditor', 'title']);

  if (listId === null) {
    dispatch(createGroup(title, shouldReset));
  } else {
    // dispatch(updateList(listId, title, shouldReset));
  }
};

export const setupListEditor = listId => (dispatch, getState) => {
  dispatch({
    type: LIST_EDITOR_SETUP,
    list: getState().getIn(['lists', listId]),
  });

  dispatch(fetchListAccounts(listId));
};

export const changeListEditorTitle = value => ({
  type: LIST_EDITOR_TITLE_CHANGE,
  value,
});

export const createGroup = (value, shouldReset) => (dispatch, getState) => {
  dispatch(createGroupRequest());

  api(getState).post('/api/v1/groups', value).then(({ data }) => {
    console.log(data)
    dispatch(createGroupSuccess(data));

    // if (shouldReset) {
    //   dispatch(resetListEditor());
    // }
  }).catch(err => dispatch(createGroupFail(err)));
};

export const createGroupRequest = () => ({
  type: GROUP_CREATE_REQUEST,
});

export const createGroupSuccess = group => ({
  type: GROUP_CREATE_SUCCESS,
  group,
});

export const createGroupFail = error => ({
  type: GROUP_CREATE_FAIL,
  error,
});

export const updateGroup = (id, title, shouldReset) => (dispatch, getState) => {
  dispatch(updateGroupRequest(id));

  api(getState).put(`/api/v1/groups/${id}`, { title }).then(({ data }) => {
    dispatch(updateGroupSuccess(data));

    // if (shouldReset) {
    //   dispatch(resetListEditor());
    // }
  }).catch(err => dispatch(updateGroupFail(id, err)));
};

// export const updateGroupRequest = id => ({
//   type: GROUP_UPDATE_REQUEST,
//   id,
// });

// export const updateGroupSuccess = list => ({
//   type: LIST_UPDATE_SUCCESS,
//   list,
// });

// export const updateListFail = (id, error) => ({
//   type: LIST_UPDATE_FAIL,
//   id,
//   error,
// });

// export const resetListEditor = () => ({
//   type: LIST_EDITOR_RESET,
// });

export const deletegGroup = id => (dispatch, getState) => {
  dispatch(deleteGroupRequest(id));

  api(getState).delete(`/api/v1/groups/${id}`)
    .then(() => dispatch(deleteGroupSuccess(id)))
    .catch(err => dispatch(deleteGroupFail(id, err)));
};

export const deleteGroupRequest = id => ({
  type: GROUP_DELETE_REQUEST,
  id,
});

export const deleteGroupSuccess = id => ({
  type: GROUP_DELETE_SUCCESS,
  id,
});

export const deleteGroupFail = (id, error) => ({
  type: GROUP_DELETE_FAIL,
  id,
  error,
});

export const fetchGroupMembers = groupId => (dispatch, getState) => {
  dispatch(fetchGroupMembersRequest(groupId));

  api(getState).get(`/api/v1/groups/${groupId}/members`, { params: { limit: 0 } }).then(({ data }) => {
    dispatch(importFetchedAccounts(data));
    dispatch(fetchGroupMembersSuccess(groupId, data));
  }).catch(err => dispatch(fetchGroupMembersFail(groupId, err)));
};

export const fetchGroupMembersRequest = id => ({
  type: GROUP_MEMBERS_FETCH_REQUEST,
  id,
});

export const fetchGroupMembersSuccess = (id, accounts, next) => ({
  type: GROUP_MEMBERS_FETCH_SUCCESS,
  id,
  accounts,
  next,
});

export const fetchGroupMembersFail = (id, error) => ({
  type: GROUP_MEMBERS_FETCH_FAIL,
  id,
  error,
});

// export const fetchListSuggestions = q => (dispatch, getState) => {
//   const params = {
//     q,
//     resolve: false,
//     limit: 4,
//     following: true,
//   };

//   api(getState).get('/api/v1/accounts/search', { params }).then(({ data }) => {
//     dispatch(importFetchedAccounts(data));
//     dispatch(fetchListSuggestionsReady(q, data));
//   }).catch(error => dispatch(showAlertForError(error)));
// };

// export const fetchListSuggestionsReady = (query, accounts) => ({
//   type: LIST_EDITOR_SUGGESTIONS_READY,
//   query,
//   accounts,
// });

// export const clearListSuggestions = () => ({
//   type: LIST_EDITOR_SUGGESTIONS_CLEAR,
// });

// export const changeListSuggestions = value => ({
//   type: LIST_EDITOR_SUGGESTIONS_CHANGE,
//   value,
// });

export const addToGroupEditor = accountId => (dispatch, getState) => {
  dispatch(addToGroup(getState().getIn(['listEditor', 'listId']), accountId));
};

export const addToGroup = (groupId, accountId) => (dispatch, getState) => {
  dispatch(addToGroupRequest(groupId, accountId));

  api(getState).post(`/api/v1/groups/${groupId}/accounts`, { account_ids: [accountId] })
    .then(() => dispatch(addToGroupSuccess(groupId, accountId)))
    .catch(err => dispatch(addToGroupFail(groupId, accountId, err)));
};

export const addToGroupRequest = (groupId, accountId) => ({
  type: GROUP_MEMBER_ADD_REQUEST,
  groupId,
  accountId,
});

export const addToGroupSuccess = (groupId, accountId) => ({
  type: GROUP_MEMBER_ADD_SUCCESS,
  groupId,
  accountId,
});

export const addToGroupFail = (groupId, accountId, error) => ({
  type: GROUP_MEMBER_ADD_FAIL,
  groupId,
  accountId,
  error,
});

export const removeFromGroupEditor = accountId => (dispatch, getState) => {
  dispatch(removeFromGroup(getState().getIn(['listEditor', 'listId']), accountId));
};

export const removeFromGroup = (groupId, accountId) => (dispatch, getState) => {
  dispatch(removeFromGroupRequest(groupId, accountId));

  api(getState).delete(`/api/v1/groups/${groupId}/accounts`, { params: { account_ids: [accountId] } })
    .then(() => dispatch(removeFromGroupSuccess(groupId, accountId)))
    .catch(err => dispatch(removeFromGroupFail(groupId, accountId, err)));
};

export const removeFromGroupRequest = (groupId, accountId) => ({
  type: GROUP_MEMBER_REMOVE_REQUEST,
  groupId,
  accountId,
});

export const removeFromGroupSuccess = (groupId, accountId) => ({
  type: GROUP_MEMBER_REMOVE_SUCCESS,
  groupId,
  accountId,
});

export const removeFromGroupFail = (groupId, accountId, error) => ({
  type: GROUP_MEMBER_REMOVE_FAIL,
  groupId,
  accountId,
  error,
});

export const resetGroupAdder = () => ({
  type: GROUP_ADDER_RESET,
});

// export const setupListAdder = accountId => (dispatch, getState) => {
//   dispatch({
//     type: LIST_ADDER_SETUP,
//     account: getState().getIn(['accounts', accountId]),
//   });
//   dispatch(fetchLists());
//   dispatch(fetchAccountLists(accountId));
// };

// export const fetchAccountLists = accountId => (dispatch, getState) => {
//   dispatch(fetchAccountListsRequest(accountId));

//   api(getState).get(`/api/v1/accounts/${accountId}/lists`)
//     .then(({ data }) => dispatch(fetchAccountListsSuccess(accountId, data)))
//     .catch(err => dispatch(fetchAccountListsFail(accountId, err)));
// };

export const fetchAccountGroupsRequest = id => ({
  type: GROUP_MEMBER_GROUPS_FETCH_REQUEST,
  id,
});

export const fetchAccountGroupsSuccess = (id, groups) => ({
  type: GROUP_MEMBER_GROUPS_FETCH_SUCCESS,
  id,
  lists,
});

export const fetchAccountGroupsFail = (id, err) => ({
  type: GROUP_MEMBER_GROUPS_FETCH_FAIL,
  id,
  err,
});

export const addToGroupAdder = groupId => (dispatch, getState) => {
  dispatch(addToGroup(groupId, getState().getIn(['listAdder', 'accountId'])));
};

export const removeFromGroupAdder = groupId => (dispatch, getState) => {
  dispatch(removeFromGroup(groupId, getState().getIn(['listAdder', 'accountId'])));
};