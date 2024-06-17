import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";


const initialState = {
  isLoading: true,
  query: "HTML",
  page: 0,
  nbPages: 50,
  hits: [],
};


const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  let API = "http://hn.algolia.com/api/v1/search?";

  async function fetchAPI(url) {

    dispatch({ type: "SET_LOADING" });

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      dispatch({
        type: "GET_STORIES",
        payload:
        {
          hits: data.hits,
          nbPages: data.nbPages,
        }
      });
    }
    catch
    {
      console.log("Error in fetching data");
    }
  }

  const removePost = (post_id) => {
    dispatch({ type: "REMOVE_POST", payload: post_id });
  }

  const searchPost = (searchQuery) => {
    dispatch({ 
      type: "SEARCH_QUERY",
      payload:searchQuery,
     })
  }

  const getNextPage=()=>{
    dispatch({
      type:"NEXT_PAGE",
    })
  }

  const getPrevPage=()=>{
    dispatch({
      type:"PREV_PAGE",
    })
  }


  useEffect(() => {
    fetchAPI(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query,state.page])

  return (
    <AppContext.Provider value={{ ...state, removePost,searchPost,getNextPage,getPrevPage}}> {children} </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };