import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import Auxilary from '../../hoc/Auxilary'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/WithErrorHandler/WIthErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'


const INGREDIENT_PRICES = {
    salad: 15,
    cheese: 20,
    meat: 40,
    bacon: 35
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentWillMount() {
        console.log(this.props);
        axios.get('https://react-my-burger-3d306-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({error:true});
            });
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum, el) => {
            return sum + el;
        });
        this.setState({ purchasable: sum > 0 });
        console.log(this.state.purchasable);
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - priceReduction;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);
    };
    purchasingHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCanceledHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        //alert("you continue!");
        
        const querryParams = []
        for(let i in this.state.ingredients){
            querryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        querryParams.push('price='+ this.state.totalPrice);
        const querryString = querryParams.join("&");
        this.props.history.push({
            pathname: '/checkout',
            search:  '?' + querryString
        }
        );
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = <Spinner />


        let burger = this.state.error? <p>Ingredients can't be loaded</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        ordered={this.purchasingHandler}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice} />
                </Auxilary>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCanceledHandler}
                purchaseContinued={this.purchaseContinueHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);