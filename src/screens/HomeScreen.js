import React, { useEffect } from "react";
import { listProduct } from "../redux/actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import { Container, Row, Col } from "react-bootstrap";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import BannersCarousel from "../components/bannersCarousel";
import ProductCarousel from "../components/ProductCarousel";
import FeaturesSection from "../components/featuresSection";

const HomeScreen = () => {
  let params = useParams();
  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { products, loading, error, page, pages } = productList;

  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title="Clothshop | Home" />
      {/* {!keyword && <ProductCarousel />}*/}
      <BannersCarousel />
      <FeaturesSection />
      <Container>
        <h2 className="text-center display-2">Featured Products</h2>
        <Row>
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            products.map((product, index) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product product={product} key={index} />
              </Col>
            ))
          )}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
      </Container>
    </>
  );
};

export default HomeScreen;
