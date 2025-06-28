import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router";
import Coins from "./components/coins";
import CoinDetails from "./components/CoinDetails";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Coins />}/>
          <Route path="/coins/:id" element={<CoinDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
