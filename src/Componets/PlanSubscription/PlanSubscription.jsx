import React from 'react'
import axiosAuth from '../../services/api/axios_config'
import { store } from '../../Redux/store'
import { setUser } from '../../Redux/userSlice'
import { useNavigate } from 'react-router-dom'



function PlanSubscription() {
  const user = JSON.parse(localStorage.getItem('user'))
  const amount = 199
  const navigate = useNavigate()

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axiosAuth.post('payment/success/',bodyData)
        .then((res) => {
          console.log(res)
          store.dispatch(setUser(res.data.user))
          localStorage.setItem('user', JSON.stringify(res.data.user))
          navigate('/')
          
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };


  const loadScript = async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {

    const res = await loadScript();

    const data = await axiosAuth.post('payment/',{amount}).then((res)=> res.data)

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key: data.KEY, 
      amount: data.payment.amount,
      currency: "INR",
      name: "VClass",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.payment.id,
      handler: function (response) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "+918330000760",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className={' h-full w-full  flex justify-center items-center'}>
    <div className={' h-96 w-1/2 mt-28 p-10 bg-slate-800 text-white rounded-lg  justify-center items-center'}>
        <div className='text-center'>
            <h1 className='text-5xl font-mono'>Premium</h1>
            <span className=''>Get started with a Subscription that works for you.</span>
            <ul className='text-left mt-6 ms-36'>
                <li>* Unlinited user can join</li>
                <li>* Unlinited time to use</li>
                <li>* Life time Premium</li>
                <li>* add free</li>
            </ul>
            <h2 className='text-3xl mt-4'>Just 199/-</h2>
            <button onClick={showRazorpay} className='bg-slate-400 rounded-lg h-8 w-32 mt-5'>Get Premium</button>
        </div>
    </div>
    </div>
  )
}

export default PlanSubscription