import React, { useState, useReducer } from 'react';
// This line imports the React library and the useState and useReducer hooks from it.
import {getRickAndMortyCharacters} from "../../services/services";
// This line imports a function called getRickAndMortyCharacters from a file called services.
import {useQuery} from "@tanstack/react-query";
// This line imports the useQuery hook from the @tanstack/react-query library.

export const Feed = () => {
  const feedReducer = (state, action) => {
    switch(action.type) {
      case "showList" : {return {...state, showList: !state.showList}}
    }
  }
  // This defines a state reducer function that takes in a state and an action and returns a new state based on the action. The only action it handles is "showList" and when that happens it returns a new state with showList property toggled.(Step 4)
  const {showChar, setShowChar} = useState(false);
  // This line uses the useState hook to define a state variable called showChar and a state setter function called setShowChar. The initial value of showChar is false.
  const [state, dispatch ] = useReducer(feedReducer, {showList: false} )
  // This line uses the useReducer hook to define a state variable called state and a state dispatch function called dispatch. The initial value of state is an object with a property showList set to false. The state is managed by the feedReducer function defined in step 4.
  const { status, data, error } = useQuery({
    queryKey: ['characters'],
    queryFn: getRickAndMortyCharacters,
  })
  // This line uses the useQuery hook to fetch data from the getRickAndMortyCharacters function. The hook returns the query's status, the fetched data, and any error that may have occurred.
  if (status === 'loading') {
    return <span>Loading...</span>
  }
  // If the query is in the loading state, this block returns a <span> with the text "Loading...".
  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }
  // If the query has an error, this block returns a <span> with an error message.
  return <>
    <h2>Feed</h2>
    {/* <button onClick= { () => setShowChar}>"Hit me!"</button> */}
    <button onClick= { () => dispatch({type: "showList"})}>"Hit me!"</button>
    {state?.showList && data?.data?.results?.map(({id, name}) => (
        <li key={id}>{name}</li>
    ))}
    {/* If state.showList is truthy, this block maps through the data.data.results array and creates a list item for each item in the array with the id as the key and the name as the text. */}
  </>;
};