


export const addcart  = (data) =>
{
    return (dispatch) =>
    {
        dispatch(
            {
                type:"addcart",
                data:data
            }
        )
    }
}