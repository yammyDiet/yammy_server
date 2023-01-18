
import Layout from "./component/layout/layout";
import { Route, Routes } from "react-router-dom";
import SortDiet from "./component/SortDiet";

function App() {
  return (
    <Layout>
      <Routes>
        <Route to='/sortDiet' element={<SortDiet />} />
      </Routes>
    </Layout>

  );
}
export default App;