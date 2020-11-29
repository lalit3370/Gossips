import React from 'react';  

function MsgComponent(props) {
  let curDate=props.date;
  // console.log(curDate);
  const testdate=new Date()
  // console.log(testdate)
  let [year, month, date]    = curDate.slice(0,10).split("-")
  let [hour, minute, second] = curDate.slice(11,19).split(":")
  let hourAdjusted=12-hour;
  hour=Math.abs(hourAdjusted);
  let cycle=(hourAdjusted<0)? "pm":"am" ;
  console.log(curDate)
  console.log(month,date,year);
  console.log(hour, minute, second);
  return (
    <div>
        <div>

             {date}-{month}-{year} {hour}:{minute} {cycle}
        </div>
        <br>
        </br>
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