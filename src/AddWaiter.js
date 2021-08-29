import React from 'react'
import PropTypes from 'prop-types'
import { gql  , useMutation} from '@apollo/client';


const ADD_WAITER = gql`
  mutation AddWaiter($newWaiter: waiterInput!){
    addWaiter(input: $newWaiter){
      name
      id
    }
  }
`
const AddWaiter = props => {

  const [addWaiter, {error, loading, data}] = useMutation(ADD_WAITER, {
    refetchQueries:[
      "FetchAllTheWaiters"
    ],
    variables:{
      newWaiter:{
        name:"Marions",
        id:"123474837"
      }
    }
  })

  if(error){
    return <p>{error.message}</p>
  }

  if(loading){
    return <p>Loading</p>
  }

  return (
    <div>
      <button onClick={()=>addWaiter()}>
        Add New One
      </button>
    </div>
  )
}

AddWaiter.propTypes = {

}

export default AddWaiter
