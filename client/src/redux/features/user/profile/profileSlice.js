import { createSlice } from "@reduxjs/toolkit";
import { getProfile,getCoupon,addAddress,getAddress,deleteAddress } from "./profileAction";

const initialState={
    profileUser:null,
    coupons:[],
    addresses:[],
    loading:false,
    error:null,
    success:false
}

const profileSlice=createSlice({
    name:'profile',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getProfile.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(getProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.profileUser=action.payload
            state.error=null
        })
        .addCase(getProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })


        .addCase(getCoupon.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getCoupon.fulfilled,(state,action)=>{
            state.loading=false;
            state.coupons=action.payload;
            state.error=null
        })
        .addCase(getCoupon.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        .addCase(addAddress.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(addAddress.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null
        })
        .addCase(addAddress.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })


        .addCase(getAddress.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(getAddress.fulfilled,(state,action)=>{
            state.loading=false;
          
            
            state.addresses=action.payload.addresses || [];
            state.error=null
        })
        .addCase(getAddress.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

        .addCase(deleteAddress.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(deleteAddress.fulfilled,(state,action)=>{
            state.loading=false;
            state.addresses=state.addresses.filter(address=>address._id!==action.payload)
        })
        .addCase(deleteAddress.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })

    }
})

export default profileSlice.reducer