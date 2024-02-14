import { React, useContext } from "react";
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
import {
  fertilizersInput,
  guideInputs,
  marketInputs,
  userInputs,
} from "./formSource";
import { AuthContext } from "./context/AuthContext";
import GuideList from "./pages/list/GuideList";
import NewGuide from "./pages/new/NewGuide";
import MarketNearMeList from "./pages/list/MarketNearMeList";
import NewMarket from "./pages/new/NewMarket";
import UpdateGuide from "./pages/single/UpdateGuide";
import UpdateMarket from "./pages/single/UpdateMarket";
import NewFertilizers from "./pages/new/NewFertilizers";
import FertilizersList from "./pages/list/FertilizersList";
import UpdateFertilizers from "./pages/single/UpdateFertilizers";
import NewPrice from "./pages/new/NewPrice";
import UpdatePrice from "./pages/single/UpdatePrice";
import PriceList from "./pages/list/PriceList";
import { Toaster } from "react-hot-toast";
import ProductList from "./pages/list/ProductList";
import OrderList from "./pages/list/OrderList";
import SingleOrder from "./pages/single/SingleOrder";
import SingleUser from "./pages/single/SingleUser";
import SingleItem from "./pages/single/SingleItem";
import SingleGuide from "./pages/single/SingleGuide";
import SingleMarket from "./pages/single/SingleMarket";
import SinglePriceListing from "./pages/single/SinglePriceListing";
import SingleFertilizer from "./pages/single/SingleFertilizer";
import TransportCompanyList from "./pages/list/TransportCompanyList";
import SingleTransportCompany from "./pages/single/SingleTransportCompany";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <Router>
        <Toaster position="top-center" />
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
                    <SingleUser />
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
                    <ProductList />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <SingleItem />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="Add New Product" />
                  </RequireAuth>
                }
              /> */}
            </Route>

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
                    {/* <UpdateGuide /> */}
                    <SingleGuide />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:guideId"
                element={
                  <RequireAuth>
                    <UpdateGuide />
                    {/* <SingleGuide /> */}
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

            <Route path="orders">
              <Route
                index
                element={
                  <RequireAuth>
                    <OrderList />
                  </RequireAuth>
                }
              />
              <Route
                path=":ordersId"
                element={
                  <RequireAuth>
                    <SingleOrder />
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
                    <SingleMarket />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:nearmeId"
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
                    <SingleFertilizer />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:fertilizersId"
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
                    <NewFertilizers
                      fertilizers={fertilizersInput}
                      title="Add New Fertilizer"
                    />
                  </RequireAuth>
                }
              />
            </Route>

            <Route path="pricelisting">
              <Route
                index
                element={
                  <RequireAuth>
                    <PriceList />
                  </RequireAuth>
                }
              />
              <Route
                path=":pricelistingId"
                element={
                  <RequireAuth>
                    <SinglePriceListing />
                  </RequireAuth>
                }
              />
              <Route
                path="update/:pricelistingId"
                element={
                  <RequireAuth>
                    <UpdatePrice />
                  </RequireAuth>
                }
              />
              <Route
                path="newpricelisting"
                element={
                  <RequireAuth>
                    <NewPrice
                      fertilizers={fertilizersInput}
                      title="Add New Fertilizer"
                    />
                  </RequireAuth>
                }
              />
              
            </Route>

            <Route path="transportcompany">
              <Route
                index
                element={
                  <RequireAuth>
                    <TransportCompanyList />
                  </RequireAuth>
                }
              />
              <Route
                path=":transportcompanyId"
                element={
                  <RequireAuth>
                    <SingleTransportCompany />
                  </RequireAuth>
                }
              />
              
            </Route>


            

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
