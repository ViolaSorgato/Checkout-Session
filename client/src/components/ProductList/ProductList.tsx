import "./ProductList.css";
import { Card, Col, Row } from "antd";

export default function ProductList() {
  return (
    <div className="ProductList">
      <h3>Here I should map my products:</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Product" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Product 2" bordered={true}>
            Card content
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Product 3" bordered={true}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
}
