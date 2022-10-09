import {
  GROUP_DETAIL_FETCH_SUCCESS,
}
  from '../actions/groups';
import { Map as ImmutableMap, fromJS, List as ImmutableList } from 'immutable';

const initialState = ImmutableMap();

export default function groupDetail(state = initialState, action) {
  switch (action.type) {
    case GROUP_DETAIL_FETCH_SUCCESS:
      console.log(action.type)
      state =  Object.assign({}, state, {
        group_detail: action.groupdetail
      });
      return state;

    default:
      return state;
  }
};
