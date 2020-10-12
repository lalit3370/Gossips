import React from 'react';  

function MsgComponent(props) {
  // let [month, date, year]    = ( new Date() ).toLocaleDateString().split("/")
  // let [hour, minute, second] = ( new Date() ).toLocaleTimeString().slice(0,7).split(":")
  return (
    <div>
        <div>
             {/* {date}-{month}-{year} {hour}:{minute}:{second} */}
            {props.date}
        </div>
        <div>
            <div>
                  {props.content}
            </div>
            <div>

            </div>
        </div>
    </div>
  );
}

export default MsgComponent;