import React from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Divider, message, Modal, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePoll } from "../redux/pollSlice/pollSlice";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const {confirm} = Modal;

const PoolTable = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {error, loading, polls} = useSelector( state => state.polls )
    const showDeleteConfirm = ( id ) => {
        confirm( {
            title: __( 'Are you sure, You want to delete this poll?', 'asl-polling' ),
            icon: <ExclamationCircleOutlined/>,
            okText: __( 'Yes, delete', 'asl-polling' ),
            okType: 'danger',
            cancelText: __( 'Cancel', 'asl-polling' ),
            onOk() {
                dispatch( deletePoll( id ) )
                if (!loading) {
                    message.success( {
                        content: __( 'Successfully deleted the poll.', 'asl-polling' ), style: {
                            marginTop: '20px',
                        },
                    } );
                }
            },
            onCancel() {
                message.info( {
                    content: __( 'Delete canceled', 'asl-polling' ), style: {
                        marginTop: '20px',
                    },
                } );

            },
        } );
    };

    const columns = [
        {
            title: 'ID', dataIndex: 'id', width: 80, sorter: ( a, b ) => a.id - b.id, render: ( id ) => {
                return (<Button type="link" onClick={() => navigate( `/poll/${id}` )}>{id}</Button>)
            }
        },
        {
            title: __( 'Title', 'asl-polling' ),
            dataIndex: 'title',
            width: 500,
            sorter: ( a, b ) => a.title.localeCompare( b.title ),
            render: ( title ) => {
                let item = polls.find( poll => poll.name === title )
                return (<Button type="link" onClick={() => navigate( `/poll/${item['id']}` )}>{title}</Button>)
            }
        },
        {
            title: __( 'Description', 'asl-polling' ), dataIndex: 'description', width: 650
        },
        {
            title: __( 'Count variants under moderation', 'asl-polling' ), dataIndex: 'status', width: 450,
            render: ( counts ) => (
                <>
                    {(counts[0] === 0 && counts[1] === 0) &&
                        <span><Tag color='blue' key={3}>{__( 'No items on moderation', 'asl-polling' )}</Tag></span>}
                    {counts.map( ( count, index ) => {
                            if (index === 1) {
                                if (count !== 0) {
                                    return (
                                        <Tag color='green' key={index}>
                                            {__( 'Pluses: ', 'asl-polling' )}
                                            {count}
                                        </Tag>
                                    );
                                }
                            } else if (index === 0) {
                                if (count !== 0) {
                                    return (
                                        <Tag color='red' key={index}>
                                            {__( 'Minuses: ', 'asl-polling' )}
                                            {count}
                                        </Tag>
                                    );
                                }
                            }
                        }
                    )}
                </>

            ),
        },
        {
            title: __( 'Actions', 'asl-polling' ), dataIndex: 'actions', render: ( id ) => {
                return (<>
                    <Button type="link" onClick={() => navigate( `/poll/${id}` )}>{__( 'Edit', 'asl-polling' )}</Button>
                    <Divider type='vertical'/>
                    <Button
                        danger
                        type="link"
                        onClick={() => {
                            showDeleteConfirm( id )
                        }}
                    >{__( 'Delete', 'asl-polling' )}</Button>
                </>)
            }
        }
    ];


    let data = []

    if (polls !== undefined) {
        for (const item of polls) {
            data.unshift( {
                key: item['id'],
                id: item['id'],
                title: item['name'],
                description: item['description'],
                status: [ item['moderateMinusCount'], item['moderatePlusCount'] ],
                actions: item['id']
            } );
        }
    }

    return (<div>
        {error && message.error( error )}
        <div className="flex justify-between">
            <h1>{__( 'All Polls', 'asl-polling' )}</h1>
            <div className="right_block">
                <Button
                    type="primary"
                    className="bg-sky-500 hover:bg-sky-400 active:bg-sky-400 focus:outline-none focus:bg-sky-400 ml-2 border-0"
                    onClick={() => {
                        navigate( '/add' );
                    }}
                >
                    {__( 'Add a Poll', 'asl-polling' )}
                </Button>
            </div>
        </div>
        <Divider/>
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            bordered={true}
            pagination={{
                pageSize: 10,
            }}/>
    </div>);
};

export default PoolTable;
