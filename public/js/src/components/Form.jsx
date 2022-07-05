import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/all";


const Form = ( {label, name, updateData} ) => {
    const [ value, setValue ] = React.useState( '' )
    const [ success, setSuccess ] = useState( false )
    const [ error, setError ] = useState( false )
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => {
        if (data.itemPlus == '' || data.itemMinus == '' ) {
            setError( true )
            setSuccess( false )
        } else {
            updateData( data )
            setValue( '' )
            setSuccess( true )
        }
        //
        // if (data.itemMinus == '') {
        //     setError( true )
        //     setSuccess( false )
        // } else {
        //     updateData( data )
        //     setValue( '' )
        //     setSuccess( true )
        // }

    };

    React.useEffect( () => {
        // setTimeout( () => {
        //     setError( false )
        // }, 3000 )
    })

    return (
        <>
            <form onSubmit={handleSubmit( onSubmit )}>
                <hr/>
                <div className="form-item">
                    <label className="form-item-label">{label}</label>
                    <div className="form-item-content">
                        <div className="asl-input">
                            <div className="asl-input-wrapper">
                                <input
                                    {... register( name )}
                                    name={name}
                                    className="asl-input-inner"
                                    type="text"
                                    onChange={( e ) => {
                                        setValue( e.target.value )
                                        setError(false)
                                        setSuccess(false)
                                    }}
                                    value={value}
                                    tabIndex="0"
                                />

                            </div>
                            <button type="submit" className="form-submit"> <AiOutlineSend/></button>
                        </div>
                        {success && <span
                            className='success'>{__( 'Your review has been accepted and will be published after moderation', 'asl-polling' )}</span>}
                        {error && <span className='error'>{__( 'The field cannot be empty', 'asl-polling' )}</span>}
                    </div>
                </div>



            </form>
        </>
    );
};

export default Form;
