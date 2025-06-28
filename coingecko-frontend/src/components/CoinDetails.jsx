import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import coinsService from "../services/coins";

const Container = styled.div`
  max-width: 1440px;
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
`;

const Symbol = styled.span`
  font-weight: bold;
  color: #666;
  font-size: 1.1rem;
  text-transform: uppercase;
`;

const Price = styled.span`
  font-size: 1.6rem;
  float: right;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  margin-top: 1rem;
`;

const Description = styled.p`
  line-height: 1.6;
  margin: 2.5rem 0;
  white-space: pre-line;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  text-align: left;
  padding: 10px 12px;
  background-color: #282c34;
  color: white;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px 12px;
  border: 1px solid #ddd;
  color: ${({ $positive }) =>
    $positive === undefined ? "#333" : $positive ? "green" : "red"};
  font-weight: ${({ $positive }) =>
    $positive === undefined ? "normal" : "bold"};
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 4rem auto;
  border: 5px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #ff0000;
  text-align: center;
  margin: 2rem 0;
`;

const CoinDetails = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await coinsService.getCoinById(id);
        setCoin(data);
      } catch (error) {
        setError(error.response?.data?.error)
        console.error("Error fetching coin data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) return <Spinner />;
  if (!coin) return <Message>{error}</Message>;

  const { name, symbol, description, high_24h, low_24h, price_changes, current_price } = coin;

  return (
    <Container>
      <Title>
        {name} <Symbol>({symbol})</Symbol> <Price>${current_price}</Price>
      </Title>
      <Description>{description}</Description>

      <Table>
        <thead>
          <tr>
            <Th>24h</Th>
            <Th>Value</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Highest</Td>
            <Td>${high_24h}</Td>
          </tr>
          <tr>
            <Td>Lowest</Td>
            <Td>${low_24h}</Td>
          </tr>
        </tbody>
      </Table>

      {price_changes && (
        <>
          <h3 style={{ marginTop: "2rem" }}>Price Changes</h3>
          <Table>
            <thead>
              <tr>
                <Th>Period</Th>
                <Th>Price Change %</Th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(price_changes).map(([period, value]) => (
                <tr key={period}>
                  <Td>{period.replace("pc_", "")}</Td>
                  <Td $positive={value >= 0}>{value.toFixed(2)}%</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      <Button onClick={() => navigate('/')}>Back</Button>
    </Container>
  );
};

export default CoinDetails;
