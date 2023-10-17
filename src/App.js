import {React , useContext} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
<<<<<<< HEAD
import { fertilizersInput, guideInputs, marketInputs, productInputs, updateGuideInputs, userInputs } from "./formSource";
import { AuthContext } from "./context/AuthContext";
import GuideList from "./pages/list/GuideList";
import SingleGuide from "./pages/single/UpdateGuide";
import NewGuide from "./pages/new/NewGuide";
import MarketNearMeList from "./pages/list/MarketNearMeList";
import NewMarket from "./pages/new/NewMarket";
import UpdateGuide from "./pages/single/UpdateGuide";
import UpdateMarket from "./pages/single/UpdateMarket";
import NewFertilizers from "./pages/new/NewFertilizers";
import FertilizersList from "./pages/list/FertilizersList";
import UpdateFertilizers from "./pages/single/UpdateFertilizers";
=======
import { productInputs, userInputs } from "./formSource";
import { AuthContext } from "./context/AuthContext";
import ProductList from "./pages/list/ProductList";
import NewProduct from "./pages/new/NewProduct";
>>>>>>> e06c6d5b1fab4b867e2a612356feaa5aa9cc6fb1

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
<<<<<<< HEAD
=======
  console.log(currentUser)
>>>>>>> e06c6d5b1fab4b867e2a612356feaa5aa9cc6fb1
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />

            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
<<<<<<< HEAD
                    <List />
=======
                    <ProductList />
>>>>>>> e06c6d5b1fab4b867e2a612356feaa5aa9cc6fb1
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
<<<<<<< HEAD
                    <New inputs={productInputs} title="Add New Product" />
=======
                    <NewProduct productInputs={productInputs} title="Add New Product" />
>>>>>>> e06c6d5b1fab4b867e2a612356feaa5aa9cc6fb1
                  </RequireAuth>
                }
              />
            </Route>
<<<<<<< HEAD

            <Route path="guide">
              <Route
                index
                element={
                  <RequireAuth>
                    <GuideList />
                  </RequireAuth>
                }
              />
               {/* <Route path="guide/update/:guideId" element={<UpdateGuide />} /> */}
              <Route
                path=":guideId"
                element={
                  <RequireAuth>
                    <UpdateGuide />
                  </RequireAuth>
                }
              />
              <Route
                path="newguide"
                element={
                  <RequireAuth>
                    <NewGuide guide={guideInputs} title="Add New Guide" />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="marketnearme">
              <Route
                index
                element={
                  <RequireAuth>
                    <MarketNearMeList />
                  </RequireAuth>
                }
              />
              <Route
                path=":nearmeId"
                element={
                  <RequireAuth>
                    <UpdateMarket />
                  </RequireAuth>
                }
              />
              <Route
                path="newmarket"
                element={
                  <RequireAuth>
                    <NewMarket market={marketInputs} title="Add New Market" />
                  </RequireAuth>
                }
              />
            </Route>


            <Route path="fertilizers">
              <Route
                index
                element={
                  <RequireAuth>
                    <FertilizersList />
                  </RequireAuth>
                }
              />
              <Route
                path=":fertilizersId"
                element={
                  <RequireAuth>
                    <UpdateFertilizers />
                  </RequireAuth>
                }
              />
              <Route
                path="newfertilizers"
                element={
                  <RequireAuth>
                    <NewFertilizers fertilizers={fertilizersInput} title="Add New Fertilizer" />
                  </RequireAuth>
                }
              />
            </Route>


            
=======
>>>>>>> e06c6d5b1fab4b867e2a612356feaa5aa9cc6fb1
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
