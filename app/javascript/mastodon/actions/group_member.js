import api from '../api';

export const GROUPMEMBER_REQUEST = 'GROUPMEMBER_REQUEST';
export const GROUPMEMBER_SUCCESS = 'GROUPMEMBER_SUCCESS';
export const GROUPMEMBER_FAIL = 'GROUPMEMBER_FAIL';

export const joinGroupApi = ({ member_id, group_id, status, can_post = true }) => (dispatch, getState) => {
  dispatch(groupMemberRequest());

  api(getState).post(`/api/v1/group_members`, {
    member_id,
    group_id,
    status,
    can_post
  })
    .then(({ data }) => dispatch(groupRequestSuccess(data, group_id)))
    .catch(err => dispatch(groupRequestFail(err)));
}


export const groupRequestFail = (data) => ({
  type: GROUPMEMBER_FAIL,
  payload: data,
  group_id
});


export const groupRequestSuccess = (data) => ({
  type: GROUPMEMBER_SUCCESS,
  payload: data
});

export const groupMemberRequest = () => ({
  type: GROUPMEMBER_REQUEST
});
