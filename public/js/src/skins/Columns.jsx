import React from 'react';
import VariantItem from "../components/VariantItem";
import Form from "../components/Form";
import { __ } from "@wordpress/i18n";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Columns = ( {poll, id, showDescription, showHead, updateData} ) => {
    return (
        <div className='asl-poll-columns'>
            {showHead === 'yes' && poll['name'].trim() !== '' && <h2 className='asl-poll-head'>{poll['name']}</h2>}
            {showDescription === 'yes' && poll['description'].trim() !== '' && <p>{poll['description']}</p>}
            <div className='asl-poll-content'>
                <div className='asl-poll-left asl-poll-column'>
                    <div className='asl-poll-wrapper'>
                        <div className='asl-poll-content-inner'>
                            <h2 className='asl-poll-heading'><AiOutlineCheck />{poll['headPlus']}</h2>
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
                        <Form label={__( 'Add advantage', 'asl-polling' )} name='itemPlus' updateData={updateData}/>
                    </div>
                </div>
                <div className="asl-poll-right asl-poll-column">
                    <div className="asl-poll-wrapper">
                        <div className="asl-poll-content-inner">
                            <h2 className="asl-poll-heading"><AiOutlineClose/>{poll['headMinus']}</h2>

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

                        <Form label={__( 'Add disadvantages', 'asl-polling' )} name='itemMinus'
                              updateData={updateData} id={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Columns;
