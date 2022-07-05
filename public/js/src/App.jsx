import React, { useEffect, useState } from 'react'
import { Flex, Spinner } from '@wordpress/components';
import 'react-loading-skeleton/dist/skeleton.css'
import axios from "axios";
import VariantItem from "./components/VariantItem";
import Form from "./components/Form";
import { __ } from '@wordpress/i18n';
import Columns from "./skins/Columns";
import Table from "./skins/Table";


const App = ( {id, skin, showDescription, showHead} ) => {
    const {asl_rest_uri, nonce} = asl_poll
    const [ poll, setPoll ] = useState( null )

    const updateData = ( value ) => {
        try {
            const body = new FormData();
            body.append( 'action', 'add_item' );
            body.append( 'id', id )
            body.append( 'value', value['itemPlus'] !== undefined ? 'plus' : 'minus' )
            body.append( 'text', value['itemPlus'] !== undefined ? value['itemPlus'] : value['itemMinus'] )
            body.append( '_wpnonce', nonce )
            axios.post( asl_poll.url, body ).then( function ( response ) {
                if (response.status !== 200) {
                    throw new Error( 'Can\'t add poll. Server error.' );
                }

            } )
        } catch (e) {
            console.log( e )
        }
    }

    function compareNumeric( a, b ) {
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
    }


    useEffect( () => {
        axios.get( `${asl_rest_uri}asl-polls/v1/polls/${id}`, {} ).then( ( response ) => {
            if (response.data.pluses.length > 1) {
                response.data.pluses.sort( ( a, b ) => parseFloat( b.rating ) - parseFloat( a.rating ) );
            }
            if (response.data.minuses.length > 1) {
                response.data.minuses.sort( ( a, b ) => parseFloat( b.rating ) - parseFloat( a.rating ) );
            }
            setPoll( response.data )
        } )

    }, [] );


    const Skin = () => {
        if (skin === 'table') {
            return (
                <Table poll={poll} id={id} showDescription={showDescription} showHead={showHead}
                       updateData={updateData}/>
            )
        } else {
            return (
                <Columns updateData={updateData} poll={poll} id={id} showDescription={showDescription}
                         showHead={showHead}/>
            )
        }

    }

    return (
        <>
            {poll !== null ?
                <Skin poll={poll}/>
                :
                <Flex justify='center' align='center'>
                    <Spinner/>
                </Flex>
            }
        </>
    );
};

export default App;
