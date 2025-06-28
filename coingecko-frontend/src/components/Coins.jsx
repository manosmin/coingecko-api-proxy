import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import coinsService from "../services/coins";


const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: end;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  padding: 0.4rem 0.6rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #282c34;
  color: white;
`;

const Th = styled.th`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
`;

const TdLink = styled(Td)`
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f4f4f4;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 3rem auto;
  border: 4px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #ff0000;
  text-align: center;
  margin: 2rem 0;
`;

const PriceChange = styled.span`
  color: ${({ $positive }) => ($positive ? "green" : "red")};
  font-weight: bold;
`;

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await coinsService.getCoins(params);
        setCoins(data);
      } catch (error) {
        setError("Error loading coins market data")
        console.error("Error loading coins market data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [params]);

  const handlePrevious = () => {
    setParams((prev) => ({
      ...prev,
      page: Math.max(prev.page - 1, 1),
    }));
  };

  const handleNext = () => {
    setParams((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleLimitChange = (e) => {
    setParams({
      page: 1,
      limit: Number(e.target.value),
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (!coins.length) {
    return <Message>{error}</Message>;
  }

  return (
    <>
    <Title>Coin Market</Title>
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>Current Price</Th>
          <Th>Highest (24h)</Th>
          <Th>Lowest (24h)</Th>
          <Th>Price Change % (24h)</Th>
        </Tr>
      </Thead>
      <tbody>
        {coins.map((coin) => (
          <Tr key={coin.symbol}>
            <TdLink>
              <Link to={`/${coin.id}`}>{coin.name}</Link>
            </TdLink>
            <Td>{coin.symbol.toUpperCase()}</Td>
            <Td>${coin.current_price}</Td>
            <Td>${coin.high_24h}</Td>
            <Td>${coin.low_24h}</Td>
            <Td>
              <PriceChange $positive={coin.price_change_percentage_24h >= 0}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </PriceChange>
            </Td>
          </Tr>
        ))}
      </tbody>
    </Table>
    <Controls>
        <Button
          onClick={() => setParams((prev) => ({ ...prev, page: 1 }))}
          disabled={params.page === 1}
        >
          First
        </Button>
        <Button onClick={handlePrevious} disabled={params.page === 1}>
          Previous
        </Button>
        <Button onClick={handleNext}>Next</Button>

        <Label>Coins: </Label>
        <Select value={params.limit} onChange={handleLimitChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </Controls>
      </>
  );
};

export default Coins;
