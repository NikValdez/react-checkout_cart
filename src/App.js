import React, { Component } from 'react'
import './App.css'
import SubTotal from './components/subtotal'
import PickUpSavings from './components/pickup_savings'
import TaxesFees from './components/taxes_fees'
import EstimatedTotal from './components/estimated_total'
import ItemDetails from './components/item_detail'
import PromoCode from './components/promo_code'
import { Grid } from 'react-bootstrap'
import { connect } from 'react-redux'
import { handleChange } from './actions/promo_code_actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      total: 100,
      PickupSavings: -3.85,
      taxes: 0,
      estimatedTotal: 0,
      disablePromoButton: false
    }
  }

  componentDidMount = () => {
    this.setState(
      {
        taxes: (this.state.total + this.state.PickupSavings) * 0.0875
      },
      function() {
        this.setState({
          estimatedTotal:
            this.state.total + this.state.PickupSavings + this.state.taxes
        })
      }
    )
  }

  giveDiscountHandler = () => {
    if (this.props.promoCode === 'DISCOUNT') {
      this.setState(
        {
          estimatedTotal: this.state.estimatedTotal * 0.9
        },
        function() {
          this.setState({
            disablePromoButton: true
          })
        }
      )
    }
  }

  render() {
    return (
      <div className="container">
        <Grid className="purchase-card">
          <SubTotal price={this.state.total.toFixed(2)} />
          <PickUpSavings price={this.state.PickupSavings} />
          <TaxesFees taxes={this.state.taxes.toFixed(2)} />
          <hr />
          <EstimatedTotal price={this.state.estimatedTotal.toFixed(2)} />
          <ItemDetails price={this.state.estimatedTotal.toFixed(2)} />
          <hr />
          <PromoCode
            giveDiscount={() => this.giveDiscountHandler()}
            isDisabled={this.state.disabledPromoButton}
          />
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  promoCode: state.promoCode.value
})

export default connect(mapStateToProps, { handleChange })(App)
