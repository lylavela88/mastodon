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

  return (<>
    <Column icon='list-ul' heading={props ? props.title : ""} >
      <ColumnBackButtonSlim />
    </Column >
  </>
  )

}
GroupHome.propTypes = {
  title: PropTypes.string
};


export default GroupHome;
