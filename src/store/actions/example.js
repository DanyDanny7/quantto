// import axios from 'axios';
// import {
//     getCharacters,
//     getComicByCharacter,
//     getStoriesByCharacter,
// } from '../../helpers/paths';

// export const FAVORITES = 'FAVORITES';

// export const GET_CHARACTERS_LOADING = 'GET_CHARACTERS_LOADING';
// export const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
// export const GET_CHARACTERS_FAIL = 'GET_CHARACTERS_FAIL';

// export const COMIC_BY_CHARACTER_LOADING = 'COMIC_BY_CHARACTER_LOADING';
// export const COMIC_BY_CHARACTER_SUCCESS = 'COMIC_BY_CHARACTER_SUCCESS';
// export const COMIC_BY_CHARACTER_FAIL = 'COMIC_BY_CHARACTER_FAIL';

// export const STORIES_BY_CHARACTER_LOADING = 'STORIES_BY_CHARACTER_LOADING';
// export const STORIES_BY_CHARACTER_SUCCESS = 'STORIES_BY_CHARACTER_SUCCESS';
// export const STORIES_BY_CHARACTER_FAIL = 'STORIES_BY_CHARACTER_FAIL';

// const favoritesSuccess = (payload) => ({ type: FAVORITES, payload });

// const getCharactersLoading = () => ({ type: GET_CHARACTERS_LOADING });
// const getCharactersSuccess = (payload) => ({ type: GET_CHARACTERS_SUCCESS, payload });
// const getCharactersFail = (payload) => ({ type: GET_CHARACTERS_FAIL, payload });

// const comicByCharacterLoading = () => ({ type: COMIC_BY_CHARACTER_LOADING });
// const comicByCharacterSuccess = (payload) => ({ type: COMIC_BY_CHARACTER_SUCCESS, payload });
// const comicByCharacterFail = (payload) => ({ type: COMIC_BY_CHARACTER_FAIL, payload });

// const storiesByCharacterLoading = () => ({ type: STORIES_BY_CHARACTER_LOADING });
// const storiesByCharacterSuccess = (payload) => ({ type: STORIES_BY_CHARACTER_SUCCESS, payload });
// const storiesByCharacterFail = (payload) => ({ type: STORIES_BY_CHARACTER_FAIL, payload });

// const getFavorites = (character, action, bool) => async (dispatch, getState) => {
//   const oldList = getState().charactersReducer.favorites.data;
//   const list = oldList.results;
//   if (action === 'add/remove') {
//     if (bool) {
//       list.push(character);
//       localStorage.setItem('characters', JSON.stringify(list))
//     } else {
//       for (let i = 0; i < list.length; i++) {
//         if (list[i].id === character.id) {
//           list.splice(i, 1);
//         }
//       }
//       localStorage.setItem('characters', JSON.stringify(list))
//     }
//     JSON.parse(localStorage.getItem('characters'))
//   }
//   const newData = localStorage.getItem('characters') ? JSON.parse(localStorage.getItem('characters')) : [];
//   dispatch(favoritesSuccess({results: newData}));
// }

// const getAllCharacters = (parameters, action) => async (dispatch, getState) => {
//   const { isLoading } = getState().charactersReducer.getCharacters;
//   const { results } = getState().charactersReducer.getCharacters.data;
//   if (!isLoading) {
//     dispatch(getCharactersLoading());
//     try {
//       let flag = false;
//       let local = localStorage.getItem('characters') ? JSON.parse(localStorage.getItem('characters')) : {results: []}
//       if (parameters.orderBy === '♥ favorites') {
//           flag = true;

//       }
//       const response = !flag &&  await axios.get(getCharacters(parameters));
//       const { data } = !flag && response.data;
//       const oldArray = results;

//       !flag && oldArray.push(...data.results)
//       const current = {
//         offset: !flag && data.offset + data.limit,
//         limit: !flag && data.limit,
//         total: !flag && data.total,
//         count: !flag && data.count,
//         results: !flag ? (action === 'new' ? data.results : oldArray) : local,
//       }
//       console.log("ACIONT", current)
//       await dispatch(getCharactersSuccess(current))
//     } catch (error) {
//       dispatch(getCharactersFail({results: []}));
//     }
//   }
//     return Promise.resolve();
//   };


// const comicByCharacter = (id) => async (dispatch, getState) => {
//   const { isLoading } = getState().charactersReducer.comicByCharacter;
//   if (!isLoading) {
//     dispatch(comicByCharacterLoading());
//     try {
//       const response = await axios.get(getComicByCharacter(id));
//       const { results } = response.data.data;

//       await dispatch(comicByCharacterSuccess(results))
//     } catch (error) {
//       console.log("error charactersAction comicByCharacter", error.response ? error.response : error)
//       dispatch(comicByCharacterFail([]));
//     }
//   }
//     return Promise.resolve();
//   };

// const storiesByCharacter = (id) => async (dispatch, getState) => {
//   const { isLoading } = getState().charactersReducer.storiesByCharacter;
//   if (!isLoading) {
//     dispatch(storiesByCharacterLoading());
//     try {
//       const response = await axios.get(getStoriesByCharacter(id));
//       const { results } = response.data.data;
//       await dispatch(storiesByCharacterSuccess(results))
//     } catch (error) {
//       console.log("error charactersAction storiesByCharacter", error.response ? error.response : error)
//       dispatch(storiesByCharacterFail([]));
//     }
//   }
//     return Promise.resolve();
//   };

//   export {
//     getFavorites,
//     getAllCharacters,
//     comicByCharacter,
//     storiesByCharacter
//   }