import { Routes, Route, Link } from "react-router-dom";
import { CreateDeal } from "./pages/CreateDeal";
import { DealDetail } from "./pages/DealDetail";
import { EditDeal } from "./pages/EditDeal";
import { HomePage } from "./pages/HomePage";
import { AppNavBar } from "./components/AppNavBar";
import { AppFooter } from "./components/AppFooter";
import { DisplayPage } from "./pages/DisplayPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginLink } from './components/LoginLink';
import { SearchBox } from './components/SearchBox';
import { SearchPage } from './pages/SearchPage';
import { UserCreatedPage } from './pages/UserCreatedPage';
import { UserLikedPage } from './pages/UserLikedPage.jsx';
import "./asset/style/App.css";

export default function App() {


  return (
    <div>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-7 text-center">
            <h1 className="page-heading">GoodDeals</h1>
            <p className="lead">
              The best place to discover and share deals online!
            </p>
          </div>
          <div className="col-md-5 text-center">
            <div className="user-functions">
        <Link to="/createdeal" className="btn btn-primary">
          Create a Deal
        </Link>
        <SearchBox />
        <LoginLink />
        </div>
          </div>
        </div>
      </div>

      <AppNavBar />

      <Routes>
        <Route path="/" element={<HomePage category="/" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/createdeal" element={<CreateDeal />} />
        <Route path={`/deals/id/:dealId`} element={<DealDetail />} />
        <Route path={`/deals/edit/id/:dealId`} element={<EditDeal />} />
        <Route
          path="/category/beauty"
          element={<DisplayPage category="/category/beauty" />}
        />
        <Route
          path="/category/grocery"
          element={<DisplayPage category="/category/grocery" />}
        />
        <Route
          path="/category/fashion"
          element={<DisplayPage category="/category/fashion" />}
        />
        <Route
          path="/category/electronics"
          element={<DisplayPage category="/category/electronics" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/usercreated" element={<UserCreatedPage />} />
        <Route path="/userliked" element={<UserLikedPage />} />
      </Routes>
      <AppFooter />
    </div>
  );
}


