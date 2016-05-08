import React from 'react';
import {Link} from 'react-router';

export default class HomeView extends React.Component {

    render () {
        return (
            <div>
                <h1>GoodTimes</h1>
                <p><Link to='/protected'>My smooth moves</Link></p>
            </div>
        );
    }

}
