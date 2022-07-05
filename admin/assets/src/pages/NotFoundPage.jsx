import React from 'react';
import { Button, Empty } from "antd";
import { __ } from "@wordpress/i18n";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    let navigate = useNavigate()
    return (
        <Empty
            className='empty-height'
            // image='https://downloader.disk.yandex.ru/preview/bed7222bc21b970a010b53954b2b8a07d93f1b84d26621576d569be073d36668/62a9273d/mYB9JC-nxa5-lmXBvX-SSh4JTLGpdXOA-CXGAMSfmZuk3hqQCM9F3b3xqc3o5_jsqFvIXGEfVMt-MhniVLZtyQ%3D%3D?uid=0&filename=error-404.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048'
            imageStyle={{
                height: 200,
            }}
            description={
                <>
                    <div className='dev_description'>
                        {__( 'This page not found', 'asl-polling' )}

                    </div>
                    <Button type="primary"
                            size={'large'}
                            onClick={() => {navigate( '/home' )}}>{__( 'Back to Main page', 'asl-polling' )}</Button>
                </>
            }
        />
    );
};

export default NotFoundPage;
