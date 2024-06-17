import Stories from "./Stories.jsx";
import Search from "./Search.jsx";
import Pagination from "./Pagination.jsx";

import './App.css'

function App() {
  return (
    <div className="App">
      <Search/>
      <Pagination/>
      <Stories/>
    </div>
  );
}

export default App;
