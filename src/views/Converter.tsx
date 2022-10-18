import { Col, Row, Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../components/Container';
import CurrencyInput from '../components/Converter/Input';
import { RatesType } from '../store/reducers/ratesReducer';

import { colors } from '../utils/colors';

export const Converter: React.FC = () => {
  const title = "Конвертер валют";
  const rates = useSelector((state: RatesType) => state.rates);
  const {amount, baseCurrency} = rates;
  return <>
    <Container>
      <Card title={title} style={{ width: "100%", marginTop: 50 }}>
        <Row align="middle" style={{ marginTop: 40 }} justify='center'>
          <Col
            style={{marginBottom: 20}}
            md={{ span: 12 }}
            xs={{ span: 12 }}>
            <CurrencyInput></CurrencyInput>  
          </Col>
          <Col
            xl={{ span: 24 }}
            md={{ span: 24 }}
            sm={{ span: 24 }}
            xs={{ span: 24 }}
          >
           <div style={{
              color: colors.blue,
              fontSize: 30,
              textAlign: "center",
              padding: 10,
              lineHeight: "1em"
            }}>
              <b>{amount} {baseCurrency}</b></div>
          </Col>
        </Row>
      </Card>
    </Container>
  </>
};

export default Converter