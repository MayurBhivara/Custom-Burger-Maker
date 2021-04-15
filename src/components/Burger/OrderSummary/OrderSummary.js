import React, { Component } from 'react';
import Auxilary from '../../../hoc/Auxilary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentDidUpdate(){
        console.log("order summary will update");
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey} </span>: {this.props.ingredients[igKey]}
                </li>
            );
        });
        return (
            <Auxilary>
                <h3>Your Order</h3>
                <p>Delicious Burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to check out?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button >
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Auxilary>
        );
    }

} 

export default OrderSummary;