// import store from '../../../rootReducer';
// import ShuffleObjCollection from './ShuffleCillection';

// export default async function StartGame(
// ) {
//     const globalStore = store.getState();
//     const { token } = globalStore.navigation.auth;

//     funcSetDefaultState();

//     funcSetResult(false);

//     const response = await fetch(url, {
//         method: 'GET',
//         withCredentials: true,
//         headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json',
//         },
//     });
//     const wordsCollection = [];
//     const responseJson = await response.json();
//     const responseCollection = responseJson[0].paginatedResults;

//     for (let i = 0; i < responseCollection.length; i += 1) {
//         const { image } = responseCollection[i];
//         const collectionWords = {
//             id: responseCollection[i].id,
//             word: responseCollection[i].word,
//             image: image ? `${linkImg}${responseCollection[i].image.slice(6)}` : null,
//             wordTranslate: responseCollection[i].wordTranslate,
//         };
//         wordsCollection.push(collectionWords);
//     }

//     const shuffleCollection = ShuffleObjCollection(wordsCollection);
//     funcSetGameWordsCollection(shuffleCollection);
//     funcSetIsStarted(true);

//     funcUpdateWord(shuffleCollection[turn].word);
//     funcSetShowedImage(shuffleCollection[turn].image);
// }
