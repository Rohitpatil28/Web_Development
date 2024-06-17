const reducer=(state,action)=>
{
  switch(action.type){

    case "SET_LOADING":
      return {
        ...state,
        isLoading:true,
      }


    case "GET_STORIES":
      return {
        ...state,
        hits:action.payload.hits,
        nbpages:action.payload.nbPages,
        isLoading:false,
      }


    case "REMOVE_POST":
      return {
        ...state,
        hits:state.hits.filter((curElement)=>curElement.objectID !== action.payload
        )
      }

    case "SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      }

    case "NEXT_PAGE":
  
    let pageNumInc=state.page+1;

    if(pageNumInc>=state.nbPages)
    {
      pageNumInc=1;
    }

    return{
      ...state,
      page:state.page+1,
    }

    case "PREV_PAGE":
        let pageNum=state.page;

        if(pageNum<=0)
        {
         pageNum=0;
        }
        else
        {
          pageNum=pageNum-1;
        }

      return{
        ...state,
        page:pageNum,
        
      }

  }
  return state;
}

export default reducer;

