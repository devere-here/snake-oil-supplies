import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ProductSummary} from './index'

class CategoryPage extends Component {
  constructor() {
    super()
    this.state = {selectedProducts: []}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProducts) this.setState({selectedProducts: nextProps.selectedProducts})
  }
  render() {

    let title = this.props.match.params.name;
    title = title[0].toUpperCase() + title.slice(1);
    return (
      <div>
        <div className={`titleAndSearchBarContainer ${this.props.match.params.name}`}>
          <div className="titleAndSearchBar">
            <h1>{title}</h1>
            <span>Filter By Name:</span>
            <input onChange={event => {
              const newProducts = this.props.selectedProducts.filter( product => {
                return product.name.includes(event.target.value)
                })
              this.setState({selectedProducts: newProducts})
            }} />
          </div>
        </div>
        <div id="thumbNailContainer">
          { this.state.selectedProducts.map((product) => {
            return (
              <div className="thumbNail" key={product.name}>
                <ProductSummary product={product} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = ({products}, ownProps) => {
  const categoryName = ownProps.match.params.name
  let selectedProducts = categoryName === 'all' ? products : products.filter(product => product.category === categoryName);
  return {
    selectedProducts
  }
}
const mapDispatch = null
export default connect(mapState, mapDispatch)(CategoryPage);
