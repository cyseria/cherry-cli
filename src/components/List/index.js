/*
 * @Author: Cyseria
 * @Date: 2018-06-08 11:33:39
 * @LastEditors: Cyseria
 * @LastEditTime: 2018-06-08 14:44:28
 * @Description: 脚手架列表
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import galleryDir from '../../gallery/config.js';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }
    componentWillMount() {
        let galleryList = [];
        // 存入头部信息
        galleryDir.forEach(element => {
            const scaffoldInfo = require(`../../gallery/${element}/readme.md`);
            galleryList.push(scaffoldInfo.default);
        });
        this.setState({
            galleryList
        })
    }
    render() {
        const { galleryList } = this.state;
        return (
            <ul>
                {galleryList.map((ele) => {
                    const { content, data } = ele;
                    return (
                        <Link to={`/detail/${data.title}`}>
                            <li key={data.title} className="card">
                                <h2>{data.title}</h2>
                                <div>tag: {data.tag}</div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        );
    }
}
