import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './blocks.css';


function Blocks({isblock = true}) {
  const  marginTopValue = '50px',marginBottomValue = '10px';
  const user = {
    avatar: 'https://usr.dokan-cdn.com/public/avatars/67c2b75f33ec7fa313ff9eb0bb72adda.gif', // Replace with actual avatar URL
  };
  return (

   
    <Container>
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>الطلبات</h2></div>
      <Col style={{backgroundColor:'#FFFFFF'}}>
      </Col>
    </Row>
    {isblock ?
    
    <Row>
    <Col>
      <div className='col d-flex align-items-center justify-content-center'>
      <div className='col-12 col-md-6 col-lg-9'>
      <div class='col-12'>
      <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>قائمة الحظر</h2>
      <p class='text-center'>ستجد أدناه المستخدمين الذين قمت بحظرهم حيث لن تتمكن من الشراء منهم ولن يتمكنوا من الشراء منك</p>
      <div className='col-12'>
                	<div className='justify-content-center'>
                            <div className='col-12 col-md-8 mx-auto'>
                            <div className='card1'>
                                <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
                                <div className='text-white' style={{display:'flex',}}>
                                <img  src={user.avatar} style={{width:'50px',fontSize:'15px',height:'50px'}} alt="User Avatar" />
                                <div className='ml-2'>
                                  <div style={{color:'black'}}>@onon</div>
                                  <div className='text-muted' style={{fontFamily:'Noto Kufi Arabic'}}>منذ 4 دقائق</div>
                                </div>
                                </div>
                                <div class='btn btn-success'>إلغاء</div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
      </div>
      </div>
      </div>
    </Col>
  </Row> 
    :    
    <Row>
    <Col>
      <div className="col d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-6 col-lg-9">
      <div class="col-12">
      <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>قائمة الحظر</h2>
      <p class="text-center">ستجد أدناه المستخدمين الذين قمت بحظرهم حيث لن تتمكن من الشراء منهم ولن يتمكنوا من الشراء منك</p>
      <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'2rem'}}>لايوجد حظر 🤲🏻</h2>
      <p class="text-center">أمورك كلها طيبة ماعندك عداوات مع أي احد. الله يديم الهدوء</p>
      </div>
      </div>
      </div>
    </Col>
  </Row>
    
    }
   
  </Container>
  );
}

export default Blocks;