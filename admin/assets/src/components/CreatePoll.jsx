import React from 'react';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Divider,
    Form,
    Input, InputNumber,
    message,
    Space,
    Switch,
    Tabs
} from "antd";
import {
    CheckOutlined,
    CloseOutlined,
    EditOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { addNewPoll } from "../redux/pollSlice/pollSlice";
import { useNavigate } from "react-router-dom";

const {TabPane} = Tabs;

const CreatePoll = () => {
    const {polls, error, loading} = useSelector( state => state.polls )
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ form ] = Form.useForm();
    const onFinish = ( values ) => {
        dispatch( addNewPoll( JSON.stringify( values ) ) )
       if(!loading) {
           navigate( '/home' )
           message.success( {
               "content": __( 'Add poll success', 'asl-polling' ),
               "style": {
                   "marginTop": '20px',
               }
           } );
       }
    }
    const onFinishFailed = ( errorInfo ) => {
        errorInfo['errorFields'].map( ( field ) => {
            if (Object.keys( field.errors ).length !== 0) {
                message.error( {
                    "content": field.errors,
                    "style": {
                        "marginTop": '20px',
                    },
                } );
            }
            if (Object.keys( field.warnings ).length !== 0) {
                message.warning( {
                    "content": field.warnings,
                    "style": {
                        "marginTop": '20px',
                    },
                } );
            }
        } )
    };

    return (
        <div>
            {error && message.error( error )}

            <h1>{__( 'Create a New Poll', 'asl-polling' )}</h1>
            <Divider/>
            <Form
                name='createPoll'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout='horizontal'
                form={form}
                fields={polls}
            >
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
                            initialValue=''
                            rules={[ {"required": true, "message": __( 'Please input poll name!', 'asl-polling' )} ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label={__( 'Description', 'asl-polling' )}
                            name="description"
                            initialValue=''
                        >
                            <Input.TextArea/>
                        </Form.Item>
                    </TabPane>
                    <TabPane
                        forceRender={true}
                        tab={
                            <>
                                <PlusCircleOutlined/>
                                {__( 'Pluses', 'asl-polling' )}
                            </>
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
                                                        defaultChecked={true}
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
                            <>
                                <MinusCircleOutlined/>
                                {__( 'Minuses', 'asl-polling' )}
                            </>
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
                                                        defaultChecked={true}
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
        </div>
    );
};

export default CreatePoll;
