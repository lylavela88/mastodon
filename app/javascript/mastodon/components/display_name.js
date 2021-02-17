import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import {GiNinjaHead, GiCricket} from 'react-icons/gi';
import {GrStar} from 'react-icons/gr';
import { IconContext } from "react-icons";

export default class DisplayName extends React.PureComponent {

  static propTypes = {
    account: ImmutablePropTypes.map.isRequired,
    others: ImmutablePropTypes.list,
    totalDings: PropTypes.number,
    localDomain: PropTypes.string    
  };


  render () {
    const { others, localDomain, totalDings } = this.props;
    let displayName, suffix, account, rewardIcon, rewardMessage, rewardBadge;
    

    if (others && others.size > 1) {
      displayName = others.take(2).map(a => <bdi key={a.get('id')}><strong className='display-name__html' dangerouslySetInnerHTML={{ __html: a.get('display_name_html') }} /></bdi>).reduce((prev, cur) => [prev, ', ', cur]);

      if (others.size - 2 > 0) {
        suffix = `+${others.size - 2}`;
      }
    } else {
      if (others && others.size > 0) {
        account = others.first();
      } else {
        account = this.props.account;
      }
        
      let acct = account.get('acct');     
       //eg add 02.16.2021   
       rewardIcon      = totalDings >= 1000 ? <GiNinjaHead /> : totalDings >= 500 ? <GrStar  /> : totalDings >= 100 ? <GiCricket /> : null;
       rewardMessage   = totalDings >= 1000 ? "Ninja (1000+ Dings)"  
                            : totalDings >= 500 ? "Superstar (500+ Dings)" 
                            : totalDings >= 100 ? "Grasshopper (100+ Dings)"  : null;
       rewardBadge     = rewardIcon != null ? 
                            (
                              <IconContext.Provider value={{ color: "#1ab595", size: "1.1em"}}>
                                   <span style={{paddingLeft: "3px"}}
                                        title={rewardMessage}>
                                    {rewardIcon}
                                  </span>
                                </IconContext.Provider>
                            ) : null;
  //eg add 02.16.2021

      if (acct.indexOf('@') === -1 && localDomain) {
        acct = `${acct}@${localDomain}`;
      }

      displayName = <bdi><strong className='display-name__html' dangerouslySetInnerHTML={{ __html: account.get('display_name_html') }} /></bdi>;
      suffix      = <span className='display-name__account'>@{acct}</span>;
    }

    return (
      <span className='display-name'>
        {displayName} {suffix} {rewardBadge} 
      </span>
    );
  }

}
