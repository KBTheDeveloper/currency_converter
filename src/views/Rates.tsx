import { Card, Col, Row, List, Select } from 'antd';
import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '../components/Container';
import { useGetRatesQuery } from '../store/api/rates';
import { RatesType } from '../store/reducers/ratesReducer';
import { colors } from '../utils/colors';

const Rates: React.FC = memo(() => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState(10);
  const title = "Курсы валют";
  const baseCurrency = useSelector((state: RatesType) => state.rates.baseCurrency);
  const ratesResult = useGetRatesQuery(baseCurrency);
  const baseCurrencyRate = ratesResult?.data?.rates[baseCurrency];
  const data = ratesResult?.data?.rates ? Object.entries(ratesResult.data.rates) : [];
  const initialItems = data.slice(0, items);
  const { Option } = Select;
  const currenciesOptions = ["RUB", "USD", "EUR"].map(currency => <Option data-testid={`option-${currency}`} key={currency}>{currency}</Option>);
  const onChange = useCallback((value: string) => {
    dispatch({ type: "SET_BASE_CURRENCY", payload: value });
  }, [dispatch]);
  const loadMore = (data: any[]) => {
    const elements = data.slice(items, items + 10);
    setItems(store => store + 10);
    return elements;
  };
  const onScroll = () => {
    const ref: any = scrollContainerRef;
    if (
      ref.current?.scrollTop + ref?.current.clientHeight >=
      ref?.current?.scrollHeight
    ) {
      loadMore(data);
    }
  };
  useEffect(() => {
    let ref = scrollContainerRef?.current;
    ref?.addEventListener("scroll", onScroll);
    return function cleanup() {
      ref?.removeEventListener("scroll", onScroll);
      ref = null;
    }
  });

  useEffect(() => {
    return function cleanup() {
      dispatch({type: "SET_AMOUNT", payload: 0})
    }
  })
  return (
    <Container>
      <Card title={title} style={{ width: "100%", marginTop: 50 }}>
        <Row style={{ marginTop: 40 }} justify='center'>
          <Col
            xl={{ span: 24 }}
            md={{ span: 24 }}
            xs={{span: 24}}
          >
            <Card bodyStyle={{padding: 0}} title={<span>Базовая валюта: <Select defaultValue={baseCurrency} onChange={onChange} style={{ width: 100, marginLeft: 10 }}>
                      {currenciesOptions}
                    </Select></span>}>
              <div style={{ width: "100%", overflow: "auto", height: "400px" }} ref={scrollContainerRef}>
                <List
                  dataSource={initialItems}
                  style={{ padding: "0 20px" }}
                  renderItem={([key, value]) => (
                    key !== baseCurrency && <List.Item key={key}>
                      <List.Item.Meta
                        description={
                          <span><b style={{ color: colors.blue }}>1 {key}</b>  =  <b
                            style={{ color: colors.dark }}>{(( baseCurrencyRate / Number(value)) * 1).toFixed(3)} {baseCurrency}</b>
                          </span>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </Container>)
});

export default Rates;