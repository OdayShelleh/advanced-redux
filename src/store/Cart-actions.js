import { cartSliceActions } from "./CartSlice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data!",
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-2c057-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return data;
    };

    try {
      const responseData = await fetchData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "send cart data successfuly!",
        })
      );
      console.log(responseData);
      dispatch(
        cartSliceActions.replaceCart({
          items: responseData.items || [],
          totalQuantity: responseData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "send cart data faild!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data!",
      })
    );
    const sendingData = async () => {
      const response = await fetch(
        "https://react-http-2c057-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something wrong");
      }
    };

    try {
      await sendingData();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "send cart data successfuly!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "send cart data faild!",
        })
      );
    }
  };
};
