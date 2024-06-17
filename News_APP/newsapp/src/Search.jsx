import React from 'react'
import { useGlobalContext } from './Context'
const Search = () => {

const {query, searchPost}=useGlobalContext(); 

  return (
    <>
    <h1>News App</h1>
    <form>
      <div>
        <input
        type="text" 
        placeholder='Search Here...' 
        onSubmit={(e)=>e.preventDefault()}
        value={query}
        onChange={(e)=>searchPost(e.target.value)}
        />
      </div>
    </form>
    </>
  )
}

export default Search
