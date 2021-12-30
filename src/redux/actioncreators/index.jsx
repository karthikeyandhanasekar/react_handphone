


export const countcartaction  = () =>
{
    return (dispatch) =>
    {
        dispatch(
            {
                type:"cartcount",
            }
        )
    }
}