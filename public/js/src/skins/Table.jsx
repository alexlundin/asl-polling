import React from 'react';
import VariantItem from "../components/VariantItem";
import { __ } from "@wordpress/i18n";
import Form from "../components/Form";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Table = ( {poll, id, showDescription, showHead, updateData} ) => {
    return (
        <>
            {showHead === 'yes' && poll['name'].trim() !== '' && <h2 className='asl-poll-head'>{poll['name']}</h2>}
            {showDescription === 'yes' && poll['description'].trim() !== '' && <p>{poll['description']}</p>}
            <div className='asl-poll-tables'>
                <div className="asl-poll-tables-left">
                    <div className="pluses">
                        <h3>

                            <AiOutlineCheck/>
                            <span>{poll['headPlus']}</span>

                        </h3>
                        <div className="plus-text">
                            <ul className='asl-poll-list'>
                                {poll['pluses'] && poll['pluses'].map( ( item, index ) => {
                                    if (item['publish']) {
                                        return (
                                            <VariantItem key={item['id']} data={item} id={id} first={index === 0}/>
                                        )
                                    }
                                } )}
                            </ul>
                        </div>
                    </div>

                    <Form label={__( 'Add advantage', 'asl-polling' )} name='itemMinus'
                          updateData={updateData} id={id}/>
                </div>
                <div className="asl-poll-tables-right">
                    <div className="minuses">
                        <h3>
                            <AiOutlineClose/>
                            <span>{poll['headMinus']}</span>
                        </h3>
                        <div className="minus-text">
                            <ul className='asl-poll-list'>
                                {poll['minuses'] && poll['minuses'].map( ( item, index ) => {
                                    if (item['publish']) {
                                        return (
                                            <VariantItem key={item['id']} data={item} id={id} first={index === 0}/>
                                        )
                                    }
                                } )}
                            </ul>
                        </div>
                    </div>
                    <Form label={__( 'Add disadvantages', 'asl-polling' )} name='itemMinus'
                          updateData={updateData} id={id}/>
                </div>
            </div>
            <div className="gray"></div>
        </>

    );
};

export default Table;
