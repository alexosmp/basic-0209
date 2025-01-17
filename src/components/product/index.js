import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./product.module.css";
import { decrement, increment } from "../../redux/ac";
import { productAmountSelector, productSelector } from "../../redux/selectors";

function Product({ product, amount, handleIncrement, handleDecrement }) {
  if (!product) return null;

  return (
    <Card className={styles.productDetailedOrderCard}>
      <Row type="flex" justify="space-between">
        <Col xs={16} md={16} lg={20} align="left">
          <Typography.Title level={4} className={styles.title}>
            {product.name}
          </Typography.Title>
          <Typography.Paragraph className={styles.description}>
            {product.ingredients.join(", ")}
          </Typography.Paragraph>
          <div className={styles.price}>{product.price} $</div>
        </Col>
        <Col xs={8} md={6} lg={4} align="right">
          <div className={styles.counter}>
            <div className={styles.count} data-id="product-amount">
              {amount}
            </div>
            <Button.Group>
              <Button
                className={styles.button}
                icon="minus"
                onClick={() => handleDecrement(product.id)}
              />
              <Button
                className={styles.button}
                icon="plus"
                onClick={() => handleIncrement(product.id)}
                data-id="product-increment-btn"
              />
            </Button.Group>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.array.isRequired
  }),
  // from amount decorator
  amount: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func
};

const mapStateToProps = (storeState, ownProps) => ({
  amount: productAmountSelector(storeState, ownProps),
  product: productSelector(storeState, ownProps)
});

const mapDispatchToProps = {
  handleDecrement: decrement, //handleDecrement = (...args) => dispatch(decrement(...args))
  handleIncrement: increment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
