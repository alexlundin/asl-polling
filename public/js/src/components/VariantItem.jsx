import React, { useState, useEffect } from 'react';
import classNames from "classnames";
import { __ } from '@wordpress/i18n';
import axios from "axios";

const VariantItem = ( {data, id, first} ) => {
    const nonce = asl_poll.nonce
    const uri = asl_poll.url
    const {text, rating} = data

    const [ disable, setDisable ] = useState( false )
    const [ numbers, setNumbers ] = useState( Number( rating ) )


    const submitRatingHandler = async () => {
        setDisable( true )
        setNumbers( Number( rating ) + 1 )

        try {
            const body = new FormData();
            body.append( 'action', 'update_rating' );
            body.append( 'id', id )
            body.append( 'idPoll', data.id )
            body.append( 'rating', numbers + 1 )
            axios.post( uri, body ).then( function ( response ) {
                if (response.status !== 200) {
                    throw new Error( 'Can\'t add poll. Server error.' );
                }
            } )
        } catch (e) {
            console.log( e )
        }

    }

    return (
        <li>
            <div className="asl-poll-item">
                <div className="asl-poll-subtitle">
                    <span className="under"> {text} </span>
                    <sup className="nov"> {__( 'thinking', 'asl-polling' )} {numbers} {disable && <span>+1</span>}</sup>
                </div>
                <div className="content voting">
                    <button className={classNames( "form-submit add_vote", {'is-disabled': disable} )}
                            onClick={submitRatingHandler} disabled={disable}>+1
                    </button>
                </div>
            </div>
        </li>
    );
};

export default VariantItem;
