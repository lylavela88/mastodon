import React from 'react';

import GroupHome from './components/home'
import JoinGroup from './components/joinGroup'
import GroupTimeline from './components/group-timeline'
import { useSelector, useDispatch } from 'react-redux';
import { fetchGroupDetail } from '../../actions/groups';
import { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { prototype } from 'http-link-header';

const GroupDetail = (props) => {
  const dispatch = useDispatch()
  const [groupDetail, setDetail] = useState(null)
  const [user, setUser] = useState(null)
  const data = useSelector(state => state.get("group_detail"));
  const getData = () => {
    dispatch(fetchGroupDetail(props.params.id))
  }
  useEffect(() => {
    if (data) {
      setDetail(data.group_detail)
    }
  }, [data])
  useEffect(() => {
    getData();
  }, []);
  const group_member = useSelector(state => (state.get('group_member')));

  useEffect(() => {
    if (group_member && group_member.status === 'confirmed' && group_member.group_id == props.params.id) {
      setDetail({ ...groupDetail, joined: true })
    }
  }, [group_member])


  return (
    <>
      {(groupDetail && groupDetail.joined) ? (

        <GroupTimeline group_id={props.params.id} title={groupDetail ? groupDetail.title : ""} />)
        :
        <JoinGroup group_id={props.params.id} is_private={groupDetail ? groupDetail.is_private : true} title={groupDetail ? groupDetail.title : ""} />}
    </>
  );

}
GroupDetail.propTypes = {
  params: PropTypes.object
};

export default GroupDetail;
