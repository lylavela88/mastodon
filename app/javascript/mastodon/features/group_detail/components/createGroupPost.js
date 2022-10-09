import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Column from '../../ui/components/column';
import ColumnBackButtonSlim from '../../../components/column_back_button_slim';
import { fetchGroupDetail } from '../../../actions/groups';
import { useState } from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const GroupHome = (props) => {
  //  const dispatch = useDispatch();

  const [groupDetail, setDetail] = useState(null)
  const [user, setUser] = useState(null)
  const data = useSelector(state => state.get("group_detail"));
  const getData = () => {
    props.dispatch(fetchGroupDetail(props.id))
  }
  useEffect(() => {
    if (data) {

      setDetail(data.group_detail)
    }
  }, [data])
  useEffect(() => {
    getData();
    const  _user = localStorage.getItem('users')
    setUser(JSON.parse(_user))
  }, []);


  return (<>
    < Column icon='list-ul' heading={groupDetail ? groupDetail.title : ''} >
      <ColumnBackButtonSlim />
    </Column >
  </>
  )

}
GroupHome.propTypes = {
  id: PropTypes.string
};

export default GroupHome;
