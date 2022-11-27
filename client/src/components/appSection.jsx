import React from 'react'

const AppSection = () => {
  return (
    <div className="flex flex-col w-full min-h-screen p-10 gradient-bg-services ">

        <div className=" mt-10 px-15 w-full flex  justify-between">
            <div className=""></div>
            <button className='bg-[#7b3fe4] py-2 px-7 mx-4 rounded-full cursor-pointer hover:[#6433b9] hover:cursor-pointer text-white'>Create New Contract</button>
        </div>
        <div className=" w-full mt-10 flex items-center justify-center ">
            <div className=" bg-white rounded-lg w-fit p-4">

                <table className=" w-full">
                    <thead>
                        <tr className='border-b'>
                            <th className=' text-gray-600 px-3 py-4'>Contract id</th>
                            <th className=' text-gray-600 px-3 py-4'>Amount</th>
                            <th className=' text-gray-600 px-3 py-4'>Date Created</th>
                            <th className=' text-gray-600 px-3 py-4'>Status</th>
                            <th className=' text-gray-600 px-3 py-4'>Confirmation Status</th>
                            <th className=' text-gray-600 px-3 py-4'>Is Signed</th>
                            <th className=' text-gray-600 px-3 py-4'>Url</th>
                            <th className=' text-gray-600 px-3 py-4'>Confirmation Code</th>
                            <th className=' text-gray-600 px-3 py-4'></th>

                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AppSection