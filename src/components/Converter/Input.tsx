import { useState } from "react";
import { Input } from "antd";
import { ratesUrl } from '../../store/reducers/ratesReducer';
import { useDispatch } from "react-redux";

const CurrencyInput: React.FC = () => {
  const [status, setStatus] = useState<"error" | undefined>(undefined);
  const placeholderText = 'Введите выражение типа "15 usd in rub"';
  const dispatch = useDispatch();
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const matches = e.currentTarget.value.match(/(?<amount>\d+) (?<firstCurrency>[\w]{3}) in (?<secondCurrency>[\w]{3})/);
    setStatus("error");
    if (!matches) return;
    setStatus(undefined);
    const { firstCurrency, secondCurrency, amount }: any = matches.groups;
    try {
      const result = await fetch(`${ratesUrl}?base=${firstCurrency.toUpperCase()}`);
      const rates = await result.json();
      const convertedResult = +(Number(amount) * rates?.rates[secondCurrency.toUpperCase()]).toFixed(3);
      dispatch({type: "SET_AMOUNT", payload: convertedResult});
      dispatch({type: "SET_BASE_CURRENCY", payload: secondCurrency.toUpperCase()});
    } catch (e: any) {
      console.log(e);
    }
  };
  return (<Input
    type='text'
    status={status}
    placeholder={placeholderText}
    onChange={onChange}></Input>);
}

export default CurrencyInput;