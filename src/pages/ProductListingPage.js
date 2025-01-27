import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { productList } from '../assets/productsList';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import Pricefilter from '../components/PriceFilter';
/**
 * Page contains
 *  - ProductCard
 *  - Filter (Category, Price)
 * 
 * Purpose
 *  - get all the pro
 */

class ProductListingPage extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.setState({
      data: productList.data,
      selectedCategories: [],
    })
  }

  onProductClick = (product = {}) => {
    alert(product?.name)
  }

  onAdd2Cart = (product = {}) => {
    alert(product?.id)
  }

  getCategoriesList = () => {
    const result = [];
    this.state.data.forEach(item => {
      if(!result.includes(item.category))
        result.push(item.category)
    })

    return result;
  }

  onCategoryClick = (category) => {
    console.log(category)
    this.setState(prevState => {
      const isPresent = prevState.selectedCategories.includes(category);
      console.log(isPresent)
      let result = [];
      if(isPresent) {
        result = prevState.selectedCategories.filter(item => item !== category);
      } else {
        result = prevState.selectedCategories.concat(category)
      }

      return {
        selectedCategories: result
      }
    })
  }

  render() {
    
    return (
      <Container>
        <Row>
          <Col>
            <CategoryFilter
              data={this.getCategoriesList()}
              selectedCategories={this.state.selectedCategories}
              onChange={this.onCategoryClick}
              />
          </Col>
        </Row>
      <Row>
        <Pricefilter/>
      </Row>
        <Row>
          {
            Array.isArray(this.state.data) &&
            this.state.data
              .filter(product => this.state.selectedCategories.length ? this.state.selectedCategories.includes(product.category) : true)
              .map(product => {
              return (
                <Col key={product.id}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price ? product.price : product.variants?.[0].price}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      this.onProductClick(product)
                    }}
                    onAdd2Cart={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      this.onAdd2Cart(product)
                    }}
                  />
                </Col>
              )
            })
          }
        </Row>
      </Container>
    )
  }
}

export default ProductListingPage