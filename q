[1mdiff --git a/yoello-react/src/components/Cart.js b/yoello-react/src/components/Cart.js[m
[1mindex 4f60a3a..c24a701 100644[m
[1m--- a/yoello-react/src/components/Cart.js[m
[1m+++ b/yoello-react/src/components/Cart.js[m
[36m@@ -9,19 +9,17 @@[m [mimport { formatAsCurrency } from '../utils/text';[m
     constructor(props)[m
     {[m
         super(props);[m
[31m-        this.windowStates = { CLOSED: "CLOSED", PREVIEW: "PREVIEW", OPEN: "OPEN" }[m
         this.tipStyles =[m
         {[m
             ZERO: (sub) => 0,[m
[31m-            ROUND_UP: (sub) => 100 - (sub % 100),[m
[32m+[m[32m            ROUND_UP: (sub) => (100 * (Math.ceil(sub / 100))) - sub,[m
             TEN_PERCENT: (sub) => sub * 0.1,[m
             CUSTOM: (sub) => sub[m
         }[m
[31m-        this._internalState = this.windowStates.CLOSED;[m
         this.state =[m
         {[m
[31m-            windowState: this.windowStates.CLOSED,[m
[31m-            tipStyle: this.tipStyles.ROUND_UP[m
[32m+[m[32m            tipStyle: this.tipStyles.ROUND_UP,[m
[32m+[m[32m            freshCartItem: null[m
         }[m
     }[m
 [m
[36m@@ -35,40 +33,18 @@[m [mimport { formatAsCurrency } from '../utils/text';[m
         this.setState({ tipStyle: style });[m
     }[m
 [m
[31m-    /**[m
[31m-     * Sets the tip style if the input is a valid tip style[m
[31m-     * @param {string} state [m
[31m-     */[m
[31m-    handleStateChange(state)[m
[31m-    {[m
[31m-        // TODO: Revisit this function, state duplication[m
[31m-        if (!this.windowStates[state]) { throw Error(`Invalid cart state ${state} was set.`)}[m
[31m-        let newState = state;[m
[31m-        [m
[31m-        // if (this.state.windowState === this.windowStates.CLOSED && this.props.item)[m
[31m-        // {[m
[31m-        //     newState = this.windowStates.PREVIEW;[m
[31m-        // }[m
[31m-        // else if (this.state.windowState === this.windowStates.PREVIEW && !this.props.item)[m
[31m-        // {[m
[31m-        //     newState = this.windowStates.CLOSED;[m
[31m-        // }[m
[31m-        this._internalState = newState;[m
[31m-        this.setState({...this.state, windowState: state});[m
[31m-    }[m
[31m-[m
     /**[m
      * Toggles the window state between OPEN and CLOSED[m
      */[m
     toggleOpen()[m
     {[m
[31m-        if (this.state.windowState === this.windowStates.OPEN)[m
[32m+[m[32m        if (this.props.userFlowState === this.props.userStates.CART)[m
         {[m
[31m-            this.handleStateChange(this.windowStates.CLOSED);[m
[32m+[m[32m            this.props.setUserFlowState(this.props.userStates.STORE);[m
         }[m
         else[m
         {[m
[31m-            this.handleStateChange(this.windowStates.OPEN);[m
[32m+[m[32m            this.props.setUserFlowState(this.props.userStates.CART);[m
         }[m
     }[m
 [m
[36m@@ -88,6 +64,7 @@[m [mimport { formatAsCurrency } from '../utils/text';[m
 [m
     renderCartItems()[m
     {[m
[32m+[m[32m        // TODO: Sort by order added to cart[m
         const itemEntryKeys = Object.keys(this.props.items);[m
         if (itemEntryKeys.length > 0)[m
         {[m
[36m@@ -113,14 +90,15 @@[m [mimport { formatAsCurrency } from '../utils/text';[m
     {[m
         // Calculate how far up to slide the window[m
         let offset;[m
[31m-        switch (this._internalState)[m
[32m+[m[32m        switch (this.props.userFlowState)[m
         {[m
[31m-            case this.windowStates.OPEN:[m
[32m+[m[32m            case this.props.userStates.CART:[m
                 offset = 0;[m
                 break;[m
[31m-            case this.windowStates.PREVIEW:[m
[31m-                offset = -475;[m
[32m+[m[32m            case this.props.userStates.NEW_ITEM:[m
[32m+[m[32m                offset = -455;[m
                 break;[m
[32m+[m[32m            case this.props.userStates.STORE:[m
             default:[m
                 offset = -550;[m
         }[m
[1mdiff --git a/yoello-react/src/components/CartItem.js b/yoello-react/src/components/CartItem.js[m
[1mindex 8f84b71..d4af28f 100644[m
[1m--- a/yoello-react/src/components/CartItem.js[m
[1m+++ b/yoello-react/src/components/CartItem.js[m
[36m@@ -8,7 +8,10 @@[m [mexport default class CartItem extends React.Component[m
     renderAmountButton(func, limit, text)[m
     {[m
         return <button className="amount-button"[m
[31m-        onClick={() => this.props.setAmount(this.props.item, func(this.props.amount))}disabled={this.props.amount === limit}>{text}</button>[m
[32m+[m[32m            onClick={() =>this.props.setAmount(this.props.item, func(this.props.amount))}[m
[32m+[m[32m            disabled={this.props.amount === limit}>[m
[32m+[m[32m            {text}[m
[32m+[m[32m        </button>[m
     }[m
 [m
     render()[m
[1mdiff --git a/yoello-react/src/components/CatagoryNavBar.js b/yoello-react/src/components/CatagoryNavBar.js[m
[1mindex bb1b53f..2cea23a 100644[m
[1m--- a/yoello-react/src/components/CatagoryNavBar.js[m
[1m+++ b/yoello-react/src/components/CatagoryNavBar.js[m
[36m@@ -20,7 +20,7 @@[m [mexport default class CatagoryNavBar extends React.Component[m
           style =[m
           {[m
               {[m
[31m-                  color: this.props.catagory === catagory ? "white" : "lightgrey"[m
[32m+[m[32m                  color: this.props.catagory === catagory ? "white" : "var(--ui-light-grey)"[m
               }[m
           }>{catagory}</button>[m
       );[m
[1mdiff --git a/yoello-react/src/components/ItemPreview.js b/yoello-react/src/components/ItemPreview.js[m
[1mindex 1310286..3280890 100644[m
[1m--- a/yoello-react/src/components/ItemPreview.js[m
[1m+++ b/yoello-react/src/components/ItemPreview.js[m
[36m@@ -7,7 +7,8 @@[m [mimport truncate from '../utils/text'[m
   {[m
     render()[m
     {[m
[31m-        const item = this.props.item;[m
[32m+[m[32m        const item = this.props.itemDetails.item;[m
[32m+[m[32m        const isNew = this.props.itemDetails.isNew;[m
         if (!item) { return null; } // TODO: Change to allow anim[m
         return ([m
             <div className="float-window">[m
[36m@@ -37,7 +38,9 @@[m [mimport truncate from '../utils/text'[m
                 </div>[m
                 <div className="button-group">[m
                     <button[m
[31m-                    onClick={() => this.props.onClick(item, 1)}>ADD TO CART</button>[m
[32m+[m[32m                    onClick={() => this.props.onClick(item)}>[m
[32m+[m[32m                        { isNew ? "ADD TO CART" : "ADD ANOTHER" }[m
[32m+[m[32m                        </button>[m
                 </div>[m
             </div>[m
         );[m
[1mdiff --git a/yoello-react/src/components/Store.js b/yoello-react/src/components/Store.js[m
[1mindex f9536f7..2b6be2e 100644[m
[1m--- a/yoello-react/src/components/Store.js[m
[1m+++ b/yoello-react/src/components/Store.js[m
[36m@@ -27,15 +27,26 @@[m [mimport '../utils/swipe'[m
             "PIZZA": (entry) => entry.id % 2 === 0,[m
             "STEAK": (entry) => entry.id <= 4[m
         };[m
[32m+[m[32m        this.userStates =[m
[32m+[m[32m        {[m
[32m+[m[32m            STORE: "STORE",[m
[32m+[m[32m            NEW_ITEM: "NEW_ITEM",[m
[32m+[m[32m            CART: "CART"[m
[32m+[m[32m        }[m
         this.state =[m
         {[m
             storeEntries: Array(9).fill(null),[m
             navFilter: this.filters[0],[m
             catagory: "",[m
[31m-            previewItem: null,[m
[32m+[m[32m            previewItem:[m
[32m+[m[32m            {[m
[32m+[m[32m                item: null,[m
[32m+[m[32m                isNew: false[m
[32m+[m[32m            },[m
             cart: {},[m
             itemsPerPage: 9,[m
[31m-            page: 1[m
[32m+[m[32m            page: 1,[m
[32m+[m[32m            userFlowState: this.userStates.STORE[m
         };[m
         document.addEventListener('swipe', (evt) => this.handleSwipeEvent(evt));[m
         punkApiRequest({ page: this.state.page, perPage: this.state.itemsPerPage}, (data) =>[m
[36m@@ -59,7 +70,9 @@[m [mimport '../utils/swipe'[m
      */[m
     handleItemSelected(itemIndex)[m
     {[m
[31m-        this.setState({...this.state, previewItem: this.catalogData[itemIndex]});[m
[32m+[m[32m        const item = this.catalogData[itemIndex];[m
[32m+[m[32m        const isNew = (!this.state.cart[item.name]);[m
[32m+[m[32m        this.setState({...this.state, previewItem: { item, isNew } });[m
     }[m
 [m
     handleSwipeEvent(evt)[m
[36m@@ -96,23 +109,51 @@[m [mimport '../utils/swipe'[m
         this.setState({ ...this.state, storeEntries: entries, catagory})[m
     }[m
 [m
[32m+[m[32m    addItemToCart(item)[m
[32m+[m[32m    {[m
[32m+[m[32m        const cartEntry = this.state.cart[item.name];[m
[32m+[m[32m        const amount = cartEntry ? cartEntry.amount + 1 : 1;[m
[32m+[m[32m        this.updateCartEntry(item, clamp(amount, 0, this.storeConfig.maxUnits));[m
[32m+[m[32m    }[m
[32m+[m
     /**[m
      * Event callback handler when an item is added to pre-cart (Amount selection)[m
      * @param {Item} item [m
      */[m
     updateCartEntry(item, amount)[m
     {[m
[31m-        const itemEntry = this.state.cart[item.name] || { amount: 0, item };[m
[32m+[m[32m        let itemEntry;[m
[32m+[m[32m        let userFlowState = this.state.userFlowState;[m
[32m+[m[32m        if (this.state.cart[item.name])[m
[32m+[m[32m        {[m
[32m+[m[32m            // TODO: If we have it in cart, change the button text[m
[32m+[m[32m            itemEntry = this.state.cart[item.name][m
[32m+[m[32m            userFlowState = this.userStates.CART;[m
[32m+[m[32m        }[m
[32m+[m[32m        else[m
[32m+[m[32m        {[m
[32m+[m[32m            userFlowState = this.userStates.NEW_ITEM;[m
[32m+[m[32m            itemEntry = { amount: 0, item };[m
[32m+[m[32m        }[m
         itemEntry.amount = clamp(amount, 0, this.storeConfig.cart.maxUnits);[m
[31m-        const newCart = this.state.cart;[m
[32m+[m[32m        const newCart = {...this.state.cart};[m
         newCart[item.name] = itemEntry;[m
         // console.log(`Added entry to cart ${JSON.stringify(itemEntry)}`)[m
[31m-        this.setState({...this.state, previewItem: null, cart: newCart})[m
[32m+[m[32m        this.setState({...this.state, previewItem: { item: null, isNew: false }, cart: newCart, userFlowState})[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    setUserFlowState(state)[m
[32m+[m[32m    {[m
[32m+[m[32m        if (!this.userStates[state])[m
[32m+[m[32m        {[m
[32m+[m[32m            throw Error(`Invalid user flow state '${state}' set! Valid options are: ${Object.keys(this.userStates).join(", ")}.`);[m
[32m+[m[32m        }[m
[32m+[m[32m        this.setState({...this.state, userFlowState: state});[m
     }[m
 [m
     render()[m
     {[m
[31m-        const blurInterface = this.state.previewItem !== null;[m
[32m+[m[32m        const blurInterface = this.state.previewItem.item !== null;[m
         return ([m
         <div className="store">[m
             <div className="store-title">Demo App</div>[m
[36m@@ -137,10 +178,14 @@[m [mimport '../utils/swipe'[m
             items={this.state.cart}[m
             updateCartEntry={(item, amount) => this.updateCartEntry(item, amount)}[m
             clearItem={() => null}//this.itemAddedToPreCart(null)}[m
[31m-            storeConfig={this.storeConfig}/>[m
[32m+[m[32m            storeConfig={this.storeConfig}[m
[32m+[m[32m            userFlowState={this.state.userFlowState}[m
[32m+[m[32m            setUserFlowState={(state) => this.setUserFlowState(state)}[m
[32m+[m[32m            userStates={this.userStates}/>[m
[32m+[m
             <ItemPreview[m
[31m-            item={this.state.previewItem}[m
[31m-            onClick={(item, amount) => this.updateCartEntry(item, amount)}/>[m
[32m+[m[32m            itemDetails={this.state.previewItem}[m
[32m+[m[32m            onClick={(item) => this.addItemToCart(item)}/>[m
         </div>[m
         );[m
     }[m
[1mdiff --git a/yoello-react/src/css/index.css b/yoello-react/src/css/index.css[m
[1mindex 957a7d5..852d601 100644[m
[1m--- a/yoello-react/src/css/index.css[m
[1m+++ b/yoello-react/src/css/index.css[m
[36m@@ -7,6 +7,7 @@[m
 {[m
     --dark-navy: rgb(33, 33, 41);[m
     --ui-grey: rgb(51, 51, 56);[m
[32m+[m[32m    --ui-light-grey: rgb(118, 118, 128);[m
     --yoello-yellow: rgb(255, 174, 0);[m
 }[m
 [m
