import React from 'react'

export default function Alert(props) {
  return (
        props.alert && <div className="alert alert-warning alert-dismissible fade show fs-5 px-3" role="alert">
            <strong>Error!!</strong> Invalid User Credentials. Enter again.
        </div>
  )
}
