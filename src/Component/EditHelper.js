import React from 'react';

const EditHelper = (props) => {
    return props.activity.map((val) => {
        return (
          <div>
              {props.task = val.taskName}
              {props.date = val.date}
              {props.id = val.id}
          </div>
        )
    })

}

export default EditHelper