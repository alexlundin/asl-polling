import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPoll, updatePoll } from "../redux/pollSlice/pollSlice";
import { __ } from "@wordpress/i18n";
import { Badge, Button, Divider, Form, Input, InputNumber, message, Space, Spin, Switch, Tabs } from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";

const {TabPane} = Tabs;


const EditPoll = ( {id} ) => {
    const dispatch = useDispatch()
    const {error, loading, poll} = useSelector( state => state.polls )
    const [ form ] = Form.useForm();
    const [ publishPlus, setPublishPlus ] = useState( 0 );
    const [ publishMinus, setPublishMinus ] = useState( 0 );


    useEffect( () => {
        dispatch( fetchPoll( id ) );
    }, [ dispatch ] );

    useEffect( () => {
        form.setFieldsValue( poll )
        if (poll) {
            setPublishPlus( poll['moderatePlusCount'] )
            setPublishMinus( poll['moderateMinusCount'] )
        }
    }, [ poll ] )


    function onFinish( values ) {
        dispatch( updatePoll( JSON.stringify( values ) ) )
        message.success( {
            "content": __( 'Update poll success', 'asl-polling' ),
            "style": {
                "marginTop": '20px',
            }
        } );
    }

    function onFinishFailed() {
        message.error( {
            "content": error,
            "style": {
                "marginTop": '20px',
            }
        } );
    }

    return (
        <div>
            {error && message.error( error )}
            <div className='flex-head'>
                <h1>{__( 'Edit a poll', 'asl-polling' )}</h1>
            </div>
            <Divider/>
            <Spin spinning={loading}>
                <Form
                    name='editPoll'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout='horizontal'
                    form={form}
                >
                    <Form.Item
                        hidden={true}
                        name="id"

                    >
                        <Input/>
                    </Form.Item>
                    <Tabs>
                        <TabPane
                            forceRender={true}
                            tab={
                                <span>
                              <EditOutlined/>
                                    {__( 'Description poll', 'asl-polling' )}
                            </span>
                            }
                            key="1"
                        >
                            <Form.Item
                                label={__( 'Poll name', 'asl-polling' )}
                                name="name"
                                rules={[ {
                                    "required": true,
                                    "message": __( 'Please input poll name!', 'asl-polling' )
                                } ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label={__( 'Description', 'asl-polling' )}
                                name="description"
                            >
                                <Input.TextArea/>
                            </Form.Item>
                        </TabPane>
                        <TabPane
                            forceRender={true}
                            tab={
                                <Badge count={publishPlus} status="processing">
                                    <PlusCircleOutlined/>
                                    {__( 'Pluses', 'asl-polling' )}
                                </Badge>
                            }
                            key="2">
                            <Form.Item
                                label={__( 'Heading pluses', 'asl-polling' )}
                                name="headPlus"
                                initialValue={__( 'Advantages', 'asl-polling' )}
                            >
                                <Input/>
                            </Form.Item>
                            <Divider/>
                            <Form.List name="pluses">
                                {( fields, {add, remove} ) => (
                                    <>
                                        {fields.map( ( {key, name, ... restField} ) => (
                                            <Space key={key} style={{"display": 'flex', "marginBottom": 8}}
                                                   align="baseline">
                                                <Form.Item
                                                    {... restField}
                                                    name={[ name, 'text' ]}
                                                    label={__( 'Text plus', 'asl-polling' )}
                                                    initialValue=''
                                                >
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item
                                                    {... restField}
                                                    name={[ name, 'rating' ]}
                                                    label={__( 'Rating', 'asl-polling' )}
                                                    initialValue={1}
                                                >

                                                    <InputNumber
                                                        maxLength={25}
                                                        min={0}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[ name, 'publish' ]}
                                                    label={__( 'Publish', 'asl-polling' )}
                                                    valuePropName="checked"
                                                    initialValue={true}
                                                >

                                                    <Switch checkedChildren={<CheckOutlined/>}
                                                            unCheckedChildren={<CloseOutlined/>}
                                                    />
                                                </Form.Item>

                                                <MinusCircleOutlined onClick={() => remove( name )}/>
                                            </Space>
                                        ) )}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                {__( 'Add variant', 'asl-polling' )}
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </TabPane>
                        <TabPane
                            forceRender={true}
                            tab={
                                <Badge count={publishMinus} status="processing">
                                    <MinusCircleOutlined/>
                                    {__( 'Minuses', 'asl-polling' )}
                                </Badge>
                            }
                            key="3">
                            <Form.Item
                                label={__( 'Heading minuses', 'asl-polling' )}
                                name="headMinus"
                                initialValue={__( 'Disadvantages', 'asl-polling' )}
                            >
                                <Input/>
                            </Form.Item>
                            <Divider/>
                            <Form.List name="minuses">
                                {( fields, {add, remove} ) => (
                                    <>
                                        {fields.map( ( {key, name, ... restField} ) => (
                                            <Space key={key} style={{"display": 'flex', "marginBottom": 8}}
                                                   align="baseline">
                                                <Form.Item
                                                    {... restField}
                                                    name={[ name, 'text' ]}
                                                    label={__( 'Text minus', 'asl-polling' )}
                                                    initialValue=''
                                                >
                                                    <Input/>
                                                </Form.Item>
                                                <Form.Item
                                                    {... restField}
                                                    name={[ name, 'rating' ]}
                                                    label={__( 'Rating', 'asl-polling' )}
                                                    initialValue={1}
                                                >

                                                    <InputNumber
                                                        min={0}
                                                        maxLength={25}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name={[ name, 'publish' ]}
                                                    label={__( 'Publish', 'asl-polling' )}
                                                    valuePropName="checked"
                                                    initialValue={true}

                                                >

                                                    <Switch checkedChildren={<CheckOutlined/>}
                                                            unCheckedChildren={<CloseOutlined/>}
                                                    />
                                                </Form.Item>

                                                <MinusCircleOutlined onClick={() => remove( name )}/>
                                            </Space>
                                        ) )}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                {__( 'Add variant', 'asl-polling' )}
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </TabPane>
                    </Tabs>
                    <Divider/>
                    <Form.Item>
                        <Button type="primary"
                                loading={loading}
                                htmlType="submit">
                            {__( 'Submit', 'asl-polling' )}
                        </Button>
                        <Button htmlType="button" onClick={() => {
                            form.resetFields()
                        }}>
                            {__( 'Reset', 'asl-polling' )}
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </div>
    );
};

export default EditPoll;
