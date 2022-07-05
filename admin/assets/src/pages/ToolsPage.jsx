import React from 'react';
import { Empty } from "antd";
import { __ } from "@wordpress/i18n";

const ToolsPage = () => {
    return (
        <Empty
            className='empty-height'
            // image='https://downloader.disk.yandex.ru/preview/11574a7722ebf1138f48ea4b2daf8695d3677c8b3a1978bd840a00f033eceb5a/62a926e9/qon52Sf7T6TFM98wccUJea90SpHhdE-LjHEUaiUuernNHd2hz8MPZYDiBGI62inC8MM191LEShHfhOf960mZ2w%3D%3D?uid=0&filename=development.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048'
            imageStyle={{
                height: 200,
            }}
            description={
                <span className='dev_description'>
                    {__('This page will be available soon', 'asl-polling')}
                </span>
            }
        />
    );
};

export default ToolsPage;
