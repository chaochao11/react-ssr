import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

interface AboutState {
    data: string
}

class About extends Component<any, AboutState>{

    static loadData (store) {
        return new Promise((resolve => {
            axios.get('http://localhost:3000/getData').then(res => {
                // 修改store
                store.dispatch({
                    type: 'CHANGE_DATA',
                    payload: {
                        data: res.data.data
                    }
                });
                resolve();
            })
        }));
    };

    componentDidMount(): void {
        if(!this.props.data) {
            axios.get('http://localhost:3000/getData').then(res => {
                this.props.changeData(res.data.data);
            })
        }
    }

    render(): React.ReactNode {
        return (
            <div>
                <div>About</div>
                <div>{this.props.data}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        changeData (data) {
            dispatch({
                type: 'CHANGE_DATA',
                payload: {
                    data: data
                }
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
