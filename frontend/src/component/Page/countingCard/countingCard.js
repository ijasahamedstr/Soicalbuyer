import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './countingCard';
import Card from 'react-bootstrap/Card';

function Counting() {
  const marginTopValue = '50px',marginBottomValue = '10px';
  return (
    <div className="container">
    <div className="row">
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>🥳كن جزءاً من</h2></div>
      {/* Column for small and larger screens (col-sm-6) */}
      <div className="col-12 col-lg-3">
        <div className="p-3" style={{borderRadius:'30px'}}>
        <Card style={{ border:'none'}}>
              <div className="counteru">
              <h2 className="timer count-title count-number" data-speed="1500" style={{color:'#eb5757'}}>109,366</h2>
              <p className="count-text" style={{color:'#fff',fontFamily:'Noto Kufi Arabic',fontSize:'15px'}}>الأعضاء</p>
              </div>
        </Card>
        </div>
      </div>
      {/* Column for small and larger screens (col-sm-6) */}
      <div className="col-12 col-lg-3">
        <div className="p-3" style={{borderRadius:'30px'}}>
        <Card style={{ border:'none'}}>
              <div className="counteru">
              <h2 className="timer count-title count-number" data-speed="1500" style={{color:'#8051d4'}}>147,639</h2>
        <p className="count-text" style={{color:'#fff',fontFamily:'Noto Kufi Arabic',fontSize:'15px'}}>الطلبات</p>
              </div>
        </Card>
        </div>
      </div>
      {/* Column for medium and larger screens (col-md-4) */}
      <div className="col-12 col-lg-3">
        <div className="p-3" style={{borderRadius:'30px'}}>
        <Card style={{ border:'none'}}>
              <div className="counteru">
              <h2 className="timer count-title count-number" data-speed="1500" style={{color:'#25a56a'}}>7,766,475</h2>
              <p className="count-text" style={{color:'#fff',fontFamily:'Noto Kufi Arabic',fontSize:'15px'}}>المبيعات</p>
              </div>
        </Card>
        </div>
      </div>
      {/* Column for large screens (col-lg-3) */}
      <div className="col-12 col-lg-3">
        <div className="p-3" style={{borderRadius:'30px'}}>
        <Card style={{ border:'none'}}>
              <div className="counteru">
              <h2 className="timer count-title count-number" data-speed="1500" style={{color:'#6164ff'}}>24,644</h2>
              <p className="count-text" style={{color:'#fff',fontFamily:'Noto Kufi Arabic',fontSize:'15px'}}>الحسابات المعروضة</p>
              </div>
        </Card>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Counting;



