import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'mastodon/components/icon';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../../../components/button';

const ColumnLink = ({ icon, text, to, href, method, badge, is_admin, is_private, join }) => {
  const badgeElement = typeof badge !== 'undefined' ? <span className='column-link__badge'>{badge}</span> : null;
  const AdminIcon = <Icon id={'star'} fixedWidth className='column-link__icon' />;
  const LockIcon = <Icon id={'lock'} fixedWidth className='column-link__icon' />;
  const GlobeIcon = <Icon id={'globe'} fixedWidth className='column-link__icon' />;
  return (
    <>
      {href ? (
        <a href={href} className='column-link' data-method={method}>
          <Icon id={icon} fixedWidth className='column-link__icon' />
          {text}
          {badgeElement}
        </a>
      ) : (
        <>
          {/* <div className='column'>
            <div className='col-sm-6'> */}
              <Link to={to} className='column-link'>
                <Icon id={icon} fixedWidth className='column-link__icon' />
                {text}
                {is_admin === 1 ? AdminIcon : ''}
                {/* {is_private ? LockIcon : GlobeIcon} */}

                {badgeElement}
              </Link>
            {/* </div>

            <div className='col-sm-6'>
              <Button>Join</Button>
            </div>
          </div> */}
        </>
      )}
    </>
  );

};

ColumnLink.propTypes = {
  join: PropTypes.number,
  is_admin: PropTypes.number,
  is_private: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  method: PropTypes.string,
  badge: PropTypes.node,
};

export default ColumnLink;
