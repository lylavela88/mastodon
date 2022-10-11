import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/button';
import Column from '../../../components/column';
import ColumnHeader from '../../../components/column_header';

import { joinGroupApi } from '../../../actions/group_member';
import PropTypes from 'prop-types';

const JoinGroup = (props) => {
    const dispatch = useDispatch();
    const { title, is_private } = props;
    const joinAsMember = () => {
        dispatch(joinGroupApi(props))
    }

    return (

        <Column label={title}>
            <ColumnHeader
                icon='globe'
                active={true}
                title={title}
                onPin={() => { }}
                onMove={() => { }}
                onClick={() => { }}
                pinned={true}
                multiColumn={false}
            >
            </ColumnHeader>
            {!is_private ?
                <Button style={{ color: 'white' }} active icon='unlock' className="" block={true} onClick={joinAsMember} text={"Join Group"} />
                :
                <Button style={{ color: 'white' }} active icon='unlock' className="" block={true} onClick={() => { }} text={"Request to Group"} />
            }
        </Column>
    )

}


export default JoinGroup;
