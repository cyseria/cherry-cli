/*
 * @Author: Cyseria
 * @Date: 2018-06-08 11:33:39
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 15:10:07
 * @Description: Detail
 */
import React, { Component } from 'react';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            html: ''
        }
    }
    componentWillMount() {
        const id = this.props.match.params.id;
        const res = require(`../gallery/${id}/readme.md`);
        this.setState({
            html: res.default.content || ''
        });
    }
    render() {
        return (
            <div
                className="detail"
                dangerouslySetInnerHTML={{__html: this.state.html}}
            >
            </div>
        );
    }
}
