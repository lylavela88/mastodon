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
  useSelector(state => {
    state.remove("statuses"); 
    
    state.remove("timelines"); 
    state.set("statuses",[]); 
    
    state.remove("timelines"); 
 })
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
    const _user = localStorage.getItem('user')
    setUser(JSON.parse(_user))
  }, []);


  return (
    <>
      {(groupDetail && groupDetail) ? (

        <GroupTimeline group_id={props.params.id} title={groupDetail ? groupDetail.title : ""} />)
        :
        <JoinGroup />}
    </>
  );

}
GroupDetail.propTypes = {
  params: PropTypes.object
};

export default GroupDetail;
