import {
  GROUPMEMBER_FAIL,
  GROUPMEMBER_REQUEST,
  GROUPMEMBER_SUCCESS
} from '../actions/group_member';
import { Map as ImmutableMap, fromJS, List as ImmutableList } from 'immutable';
const initialState = ImmutableMap();


export default function groups(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case GROUPMEMBER_SUCCESS:
    return state.group_member = action.payload      
    case GROUPMEMBER_FAIL:
      return state.group_member = action.payload;
    default:
      return state;
  }
};
