import './App.css';
import { Suspense, lazy } from 'react';
import "antd/dist/antd.min.css";
import Route from './components/Routing/Route';
import Header from './components/header';

const Converter = lazy(() => import("./views/Converter"));
const Rates = lazy(() => import("./views/Rates"));
const divStyles = {
  width: "100%",
  height: "100%"
}
function App() {
  return (
    <Suspense fallback={<div style={divStyles}>...Loading</div>}>
      <div className="App">
        <Header></Header>
        <Route path="/converter">
          <Converter />
        </Route>
        <Route path="/">
          <Rates />
        </Route>
      </div>
    </Suspense>
  );
}

export default App;


// Решил задачку, которую не осилил на собеседовании :)
const words = [ 'grapefruit', 'banana', 'banana', 'orange', 'banana', "banana", "orange", "orange", 'grapefruit', 'grapefruit', "orange"];
const sortCb = ([n1, v1]: [string, any], [n2, v2]: [string,any]) => {
  const sortByCount = v1 - v2;
  let sortByName = 0;
  if(n1 > n2) sortByName = 1;
  if(n1 < n2) sortByName = -1;
  return sortByName && sortByCount;
};

function sort(arr: any[]) {
  return Object.entries(arr
    .reduce((prev, val) => ({ ...prev, [val]: (prev[val] || 0) + 1}), {}))
    .sort(sortCb)
    .map(item => item[0]);
}

console.log(sort(words));