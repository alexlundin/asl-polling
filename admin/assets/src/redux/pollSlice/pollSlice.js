import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// eslint-disable-next-line no-undef
const {asl_rest_uri: uri, nonce} = asl_polling_admin

export const fetchPolls = createAsyncThunk(
    'polls/fetchPolls',
    async ( _, {rejectWithValue} ) => {
        try {
            const response = await fetch( `${uri}asl-polls/v1/polls`, {
                method: 'GET'
            } )

            if (!response.ok) {
                throw new Error( 'Server Error!' );
            }

            let data = await response.json();
            if (data) {
                data.map( item => {
                    if (item['minuses']) {
                        item['moderateMinusCount'] = item['minuses'].filter( val => val['publish'] === false ).length
                    } else if (!item['minuses']) {
                        item['moderateMinusCount'] = 0
                    }
                    if (item['pluses']) {
                        item['moderatePlusCount'] = item['pluses'].filter( val => val['publish'] === false ).length
                    } else if (!item['pluses']) {
                        item['moderatePlusCount'] = 0
                    }

                } )
            } else {
                data = []
            }
            return data;
        } catch (error) {
            return rejectWithValue( error.message );
        }
    }
)

export const fetchPoll = createAsyncThunk(
    'polls/fetchPoll',
    async ( id, {rejectWithValue} ) => {
        try {
            const form = new FormData()
            form.append( 'id', id )

            const response = await fetch( `${uri}asl-polls/v1/polls/${id}`, {
                method: 'GET'
            } )

            if (!response.ok) {
                throw new Error( 'Server Error!' );
            }

            const data = await response.json();
            if (data['pluses']) {
                data['moderatePlusCount'] = data['pluses'].filter( item => item['publish'] === false ).length
            } else {
                data['moderatePlusCount'] = 0
            }

            if (data['minuses']) {
                data['moderateMinusCount'] = data['minuses'].filter( item => item['publish'] === false ).length
            } else {
                data['moderateMinusCount'] = 0
            }
            return data;

        } catch (error) {
            return rejectWithValue( error.message );
        }
    }
)

export const deletePoll = createAsyncThunk(
    'polls/deletePoll',
    async function ( id, {rejectWithValue} ) {
        try {
            const data = new FormData()
            data.append( 'id', id )
            data.append( '_wpnonce', nonce )

            const response = await fetch( `${uri}asl-polls/v1/polls/${id}`, {
                method: 'DELETE',
                body: data
            } )

            if (!response.ok) {
                throw new Error( 'Can\'t delete poll. Server error.' );
            }
            return id

        } catch (error) {
            return rejectWithValue( error.message );
        }
    }
)

export const addNewPoll = createAsyncThunk(
    'polls/addNewPoll',
    async function ( values, {rejectWithValue, dispatch} ) {
        try {
            const formData = new FormData()
            formData.append( 'data', values )
            formData.append( '_wpnonce', nonce )
            axios.post( `${uri}asl-polls/v1/polls`, formData ).then( function ( response ) {
                if (response.status !== 200) {
                    throw new Error( 'Can\'t add poll. Server error.' );
                }
                dispatch( addPoll( response.data ) );
            } )

        } catch (error) {
            return rejectWithValue( error.message );
        }
    }
)

export const updatePoll = createAsyncThunk(
    'polls/updatePoll',
    async function ( values, {rejectWithValue, dispatch, getState} ) {
        let id = getState().polls.poll.id
        try {
            const formData = new FormData()
            formData.append( 'data', values )
            formData.append( '_wpnonce', nonce )
            formData.append( 'id', id )

            axios.post( `${uri}asl-polls/v1/polls/${id}`, formData ).then( function ( response ) {
                if (response.status !== 200) {
                    throw new Error( 'Can\'t add poll. Server error.' );
                }

                const data = response.data;
                if (data['pluses']) {
                    data['moderatePlusCount'] = data['pluses'].filter( item => item['publish'] === false ).length
                } else {
                    data['moderatePlusCount'] = 0
                }

                if (data['minuses']) {
                    data['moderateMinusCount'] = data['minuses'].filter( item => item['publish'] === false ).length
                } else {
                    data['moderateMinusCount'] = 0
                }
                dispatch( editPoll( data ) );
                return data
            } )

        } catch (error) {
            return rejectWithValue( error.message );
        }
    }
)

const setError = ( state, action ) => {
    state.status = 'rejected';
    state.error = action.payload;
    state.loading = false;
}

const pollSlice = createSlice( {
    name: 'polls',
    initialState: {
        polls: [],
        loading: false,
        error: null,
        poll: null
    },
    reducers: {
        addPoll( state, action ) {
            state.polls.push( action.payload )
        },
        editPoll( state, action ) {
            let item = state.polls.filter( function ( item ) {
                return item.id === action.payload.id
            } )[0];
            state.polls[state.polls.indexOf( item )] = action.payload
            state.poll = action.payload

        }
    },
    extraReducers: {
        [fetchPolls.pending]: ( state ) => {
            state.loading = true
            state.error = null
        },
        [fetchPolls.fulfilled]: ( state, action ) => {
            state.loading = false
            state.polls = action.payload;

        },
        [fetchPoll.pending]: ( state ) => {
            state.loading = true
            state.error = null
        },
        [fetchPoll.fulfilled]: ( state, action ) => {
            state.loading = false
            state.poll = action.payload;
        },
        [addNewPoll.pending]: ( state ) => {
            state.loading = true
            state.error = null

        },
        [addNewPoll.fulfilled]: ( state ) => {
            state.loading = false
        },
        [updatePoll.pending]: ( state ) => {
            state.loading = true
            state.error = null
        },
        [updatePoll.fulfilled]: ( state ) => {
            state.loading = false
        },
        [deletePoll.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [deletePoll.fulfilled]: (state, action) => {
            state.polls = state.polls.filter( poll => poll.id !== action.payload )
            state.loading = false
        },
        [fetchPolls.rejected]: setError,
        [fetchPoll.rejected]: setError,
        [updatePoll.rejected]: setError,
        [deletePoll.rejected]: setError,
        [addNewPoll.rejected]: setError,
    }
} )


export const {addPoll, editPoll} = pollSlice.actions

export default pollSlice.reducer
