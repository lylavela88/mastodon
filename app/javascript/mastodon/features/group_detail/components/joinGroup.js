import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/button';

import { fetchGroupDetail } from '../../../actions/groups';
import PropTypes from 'prop-types';

const JoinGroup = (props) => {
    const dispatch = useDispatch();

    console.log(props)
    return (<>``
        <>
            <Button style={{color:'white'}} active icon='unlock'  className="" block={true} onClick={()=>{}} text={"Join Group"} />
        </>
    </>
    )

}


export default JoinGroup;
