import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';
import {
    __experimentalRadio as Radio,
    __experimentalRadioGroup as RadioGroup,
    __experimentalText as Text,
    __experimentalSpacer as Spacer,
    Card,
    CardBody,
    CardHeader,
    Flex,
    FlexBlock,
    SelectControl,
    ToggleControl
} from '@wordpress/components';


registerBlockType(
    'asl/asl-polls', {
        title: __( 'WP Polls', 'asl-polling' ),
        category: 'text',
        icon: 'format-status',
        attributes: {
            pollId: {
                type: 'string'
            },
            displayHead: {
                type: 'boolean',
                default: false
            },
            displayDescription: {
                type: 'boolean',
                default: false
            },
            skin: {
                type: 'string',
                default: 'columns'
            }
        },
        edit: ( {attributes, setAttributes} ) => {
            const {
                pollId,
                displayHead,
                displayDescription,
                skin
            } = attributes
            const [ pollData, setPollData ] = useState( null )
            const [ design, setDesign ] = useState( skin )
            let polls = [ {
                label: __( 'No Polls found. Please add a poll first', 'asl-polling' )
            } ]
            useEffect( () => {
                apiFetch( {path: '/asl-polls/v1/polls'} ).then( ( posts ) => {
                    if (posts.length !== 0) {
                        setAttributes( {pollId: posts[0]['id']} )
                    } else {
                        setAttributes( {pollId: undefined} )
                    }
                    setPollData( posts )
                } )
            }, [] );
            if (pollData) {
                polls = []
                for (const post of pollData) {
                    polls.push( {
                        label: post['name'], value: post['id']
                    } )
                }

                if (pollData.length === 0) {
                    polls.push( {
                        label: __( 'No Polls found. Please add a poll first', 'asl-polling' )
                    } )
                }
            }

            const blockProps = useBlockProps( {
                className: 'asl-polls-block',
            } );

            return (
                <div {... blockProps}>
                    <Card>
                        <CardHeader isShady={true} size='large'>
                            <FlexBlock>
                                <SelectControl
                                    label={__( 'Select a poll', 'asl-polling' )}
                                    value={pollId}
                                    options={polls}
                                    onChange={( newId ) => setAttributes( {pollId: newId} )}
                                />
                            </FlexBlock>
                        </CardHeader>
                        <CardBody isShady={true}>
                            <Flex>
                                <ToggleControl
                                    label={__( 'Show Heading', 'asl-polling' )}
                                    checked={displayHead}
                                    onChange={( val ) => {
                                        setAttributes( {displayHead: val} );
                                    }}
                                />

                                <ToggleControl
                                    label={__( 'Show Description', 'asl-polling' )}
                                    checked={displayDescription}
                                    onChange={( val ) => {
                                        setAttributes( {displayDescription: val} );
                                    }}
                                />
                            </Flex>
                            <Spacer marginY={5}/>
                            <Flex justify='start' gap={5}>
                                <Text>{__('Choose a design:', 'asl-polling')}</Text>
                                <RadioGroup label={__( 'Choose a design', 'asl-polling' )}
                                            onChange={( skin ) => setAttributes( {skin: skin} )}
                                            checked={skin}>
                                    <Radio value="columns">{__( 'Column (default)', 'asl-polling' )}</Radio>
                                    <Radio value="table">{__( 'Table', 'asl-polling' )}</Radio>
                                </RadioGroup>
                            </Flex>
                        </CardBody>
                    </Card>
                </div>
            )
        }
    }
);
