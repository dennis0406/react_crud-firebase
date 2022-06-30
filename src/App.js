import "./assets/styles/app.css";
import { Route, Routes} from "react-router-dom";
import { routes } from "./routes";

function App() {
  return (
    <div className="container">
      <Routes>
          {routes.map((route,index)=>(
         <Route key={index} path={route.path} element={route.main} exact={route.exact} />
         )
         )}
        </Routes>
    </div>
  );
}

export default App;
