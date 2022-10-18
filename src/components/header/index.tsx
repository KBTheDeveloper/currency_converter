import { Col, Row  } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "../Container";
import Link from "../Routing/Link";

const Header: React.FC = () => {
  const [colsAlign, setColsAlign] = useState<{left: string, right: string}>({left: "start", right: "end"});
  const backgroundColor = "#212121";
  const items = [{ name: "Курсы валют", href: "/" }, { name: "Конвертер валют", href: "/converter" }];
  const menuLinks = items.map((item, i) => <Link style={{ marginRight: i < items.length - 1 && 10 }} href={item.href} key={item.name + i}>{item.name}</Link>);
  const onResize = () => {
    if (window.innerWidth < 600) {
      setColsAlign({left: "center", right: "center"});
    } else {
      setColsAlign({left: "start", right: "end"});
    }
  }
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return function cleanup() {
      window.removeEventListener("resize", onResize);
    }
  });
  useEffect(() => onResize, []);
  return (
    <>
      <div className="header" style={{ backgroundColor, padding: "20px" }}>
        <Container>
          <div className="header__menu">
            <Row justify="space-between" align="middle">
              <Col
                style={{ display: "flex", justifyContent: colsAlign.left, alignItems: "center" }}
                xl={12}
                md={12}
                sm={12} xs={24}>
                <Row justify="start">
                  <Col xl={24} >{menuLinks}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>)
}

export default Header;