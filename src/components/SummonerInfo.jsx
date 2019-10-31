import React from 'react';
import Navigation from './Navigation.jsx';

class SummonerInfo extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <Navigation searchShow={true} />
                소환사 검색결과
            </div>
        )
    }
}

export default SummonerInfo;