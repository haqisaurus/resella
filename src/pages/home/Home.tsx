import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 3600 }}>
                    dashboard
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: any) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
