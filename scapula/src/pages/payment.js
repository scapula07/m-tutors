import React from 'react'
import MainLayout from "../layouts/mainlayout"
import profileImage from "../images/profile.png"
import Card from '../components/card'
import paystackImage from "../images/paystack.png"
import cryptoImage from "../images/crypto.png"
import {Outlet,Link} from "react-router-dom"
function Payment({tutor}) {
  return (
     <MainLayout>
         <h1 className="text-3xl font-bold ml-5">Payment</h1>
           <Card cname="flex flex-row items-center">
              
               <main className="mt-5">
             
              {/*!tutor.imgUrl&&**/<img src={profileImage} className="h-10 w-10 rounded-full inline"/>} 
             
                </main>
                <div className="ml-5">
                    <h2 className="mt-5 text-xs font-bold">{/*tutor.firstname +" " +tutor.lastname*/} Name</h2>
                    
                </div>
            </Card>
        <div className="flex flex-row">
           
           <div className='w-1/4 flex flex-col mt-5 py-3 space-y-3 '>
              
              <Card cname="rounded-md shadow h-16 hover:border-blue-500 hover:border-2">
              <Link to="paystack"> <img src={paystackImage} className="w-full h-full rounded-md "/></Link>
              </Card>
              <Card cname="rounded-md shadow h-16 hover:border-blue-400 hover:border-2">
              <Link to="crytopaymentgateway"><img src={cryptoImage} className="w-full h-full rounded-md "/> </Link>
              </Card>
            
           </div>
           <div className="w-3/4 px-6">
                <Outlet />
           </div>

        </div>
        
     </MainLayout>
  )
}

export default Payment
