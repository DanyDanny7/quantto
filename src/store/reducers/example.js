// import {
//     FAVORITES,
//     GET_CHARACTERS_LOADING,
//     GET_CHARACTERS_SUCCESS,
//     GET_CHARACTERS_FAIL,
//     COMIC_BY_CHARACTER_LOADING,
//     COMIC_BY_CHARACTER_SUCCESS,
//     COMIC_BY_CHARACTER_FAIL,
//     STORIES_BY_CHARACTER_LOADING,
//     STORIES_BY_CHARACTER_SUCCESS,
//     STORIES_BY_CHARACTER_FAIL
// } from '../actions/charactersActions';

const stateInit = {
    favorites: {
        data: {results: []},
    },
    getCharacters: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: {results: []}
    },
    comicByCharacter: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: []
    },
    storiesByCharacter: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: []
    },
}

const charactersReducer = (state = stateInit, action) => {
    switch (action.type) {
        // case FAVORITES: return {
        //     ...state,
        //     favorites: {
        //         data: action.payload,
        //     }
        // }
        
        // case GET_CHARACTERS_LOADING: return {
        //     ...state,
        //     getCharacters: {
        //         ...state.getCharacters,
        //         isLoading: true,
        //         isSuccess: false,
        //         isError: false,
        //     }
        // }
        // case GET_CHARACTERS_SUCCESS: return {
        //     ...state,
        //     getCharacters: {
        //         isLoading: false,
        //         isSuccess: true,
        //         isError: false,
        //         data: action.payload,
        //     }
        // }
        // case GET_CHARACTERS_FAIL: return {
        //     ...state,
        //     getCharacters: {
        //         isLoading: false,
        //         isSuccess: false,
        //         isError: true,
        //         data: action.payload,
        //     }
        // }

        // case COMIC_BY_CHARACTER_LOADING: return {
        //     ...state,
        //     comicByCharacter: {
        //         ...state.comicByCharacter,
        //         isLoading: true,
        //         isSuccess: false,
        //         isError: false,
        //     }
        // }
        // case COMIC_BY_CHARACTER_SUCCESS: return {
        //     ...state,
        //     comicByCharacter: {
        //         isLoading: false,
        //         isSuccess: true,
        //         isError: false,
        //         data: action.payload,
        //     }
        // }
        // case COMIC_BY_CHARACTER_FAIL: return {
        //     ...state,
        //     comicByCharacter: {
        //         isLoading: false,
        //         isSuccess: false,
        //         isError: true,
        //         data: action.payload,
        //     }
        // }

        // case STORIES_BY_CHARACTER_LOADING: return {
        //     ...state,
        //     storiesByCharacter: {
        //         ...state.storiesByCharacter,
        //         isLoading: true,
        //         isSuccess: false,
        //         isError: false,
        //     }
        // }
        // case STORIES_BY_CHARACTER_SUCCESS: return {
        //     ...state,
        //     storiesByCharacter: {
        //         isLoading: false,
        //         isSuccess: true,
        //         isError: false,
        //         data: action.payload,
        //     }
        // }
        // case STORIES_BY_CHARACTER_FAIL: return {
        //     ...state,
        //     storiesByCharacter: {
        //         isLoading: false,
        //         isSuccess: false,
        //         isError: true,
        //         data: action.payload,
        //     }
        // }

        default: return state;
    }
}

export default charactersReducer