import {
  GROUP_FETCH_SUCCESS,
  GROUP_FETCH_FAIL,
  GROUPS_FETCH_SUCCESS,
  GROUP_CREATE_SUCCESS,
  GROUP_UPDATE_SUCCESS,
  GROUP_DELETE_SUCCESS,
  GROUPS_FETCH_CLEAR,
  GROUPS_SUGGESTED_FETCH_SUCCESS
} from '../actions/groups';
import { Map as ImmutableMap, fromJS, List as ImmutableList } from 'immutable';

const initialState = ImmutableMap();

const normalizeGroup = (state, group) => state.set(group.id, fromJS(group));

const normalizeGroups = (state, groups) => {
  groups.forEach(group => {
    state = normalizeGroup(state, group);
  });

  return state;
};

const normalizeSuggestedGroup = (state, suggestedgroup) => state.set(suggestedgroup.id, fromJS(suggestedgroup));

const normalizeSuggestedGroups = (state, suggestedgroups) => {
  suggestedgroups.forEach(suggestedgroup => {
    state = normalizeSuggestedGroup(state, suggestedgroup);
  });

  return state;
};
export default function groups(state = initialState, action) {
  switch (action.type) {
    case GROUP_FETCH_SUCCESS:
    case GROUP_CREATE_SUCCESS:
    case GROUP_UPDATE_SUCCESS:
      return normalizeGroup(state, action.group);
    case GROUPS_FETCH_SUCCESS:
      return normalizeGroups(state, action.groups);
    case GROUPS_FETCH_CLEAR:
    case GROUP_DELETE_SUCCESS:
    case GROUP_FETCH_FAIL:
      return state.set(action.id, false);
    default:
      return state;
  }
};
