import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Services.css';
import Card from 'react-bootstrap/Card';

function AutoLayoutExample() {
  const  marginTopValue = '50px',marginBottomValue = '10px';
  return (
    <div className="container">
    <div className="row">
    <div style={{ marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>🤔لماذا منصة يوزر</h2></div>
      {/* Column for small and larger screens (col-sm-6) */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{border:'none',backgroundColor: `rgba(var(--bs-primary-rgb), 0.1)`,height:'265px'}}>
          <Card.Body>
            <Card.Title className='feature' style={{ display: 'flex'}}><span className='feature__icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,7H18V6a3,3,0,0,0-3-3H5A3,3,0,0,0,2,6H2V18a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V10A3,3,0,0,0,19,7ZM5,5H15a1,1,0,0,1,1,1V7H5A1,1,0,0,1,5,5ZM20,15H19a1,1,0,0,1,0-2h1Zm0-4H19a3,3,0,0,0,0,6h1v1a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V8.83A3,3,0,0,0,5,9H19a1,1,0,0,1,1,1Z"></path></svg></span><div className='eature__title'>المحفظة</div></Card.Title><br></br>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            <Card.Text>
            يمكنك سحب مبالغ المبيعات الخاصة بك من خلال طريقة الدفع المفضلة لديك كالتحويل البنكي والعملات الرقمية وبايبال
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        </div>
      </div>
      {/* Column for small and larger screens (col-sm-6) */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{border:'none',backgroundColor: `rgba(var(--bs-success-rgb), 0.1)`,height:'265px'}}>
          <Card.Body>
            <Card.Title className='feature' style={{ display: 'flex'}}><span className='feature__icon feature__icon--green'><svg style={{ fill: '#25a56a'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z"></path></svg></span><div className='eature__title'>تعدد الحسابات</div></Card.Title><br></br>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            <Card.Text>
            في منصة يوزر ستجد مختلف أنواع الحسابات أنستقرام , تويتر , تيك توك , سناب شات , ألخ
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        </div>
      </div>
      {/* Column for medium and larger screens (col-md-4) */}
      <div className="col-12 col-md-4 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{border:'none',backgroundColor: `rgba(var(--bs-info-rgb), 0.1)`,height:'265px'}}>
          <Card.Body>
            <Card.Title className='feature' style={{ display: 'flex'}}><span className='feature__icon feature__icon--purple'><svg style={{ fill: '#8051d4'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.71,6.29a1,1,0,0,0-1.42,0L20,7.59V2a1,1,0,0,0-2,0V7.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3A1,1,0,0,0,22.71,6.29ZM19,13a1,1,0,0,0-1,1v.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.7L9.41,11.12a2.85,2.85,0,0,0-3.93,0L4,12.6V7A1,1,0,0,1,5,6h8a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V14A1,1,0,0,0,19,13ZM5,20a1,1,0,0,1-1-1V15.43l2.9-2.9a.79.79,0,0,1,1.09,0l3.17,3.17,0,0L15.46,20Zm13-1a.89.89,0,0,1-.18.53L13.31,15l.7-.7a.77.77,0,0,1,1.1,0L18,17.21Z"></path></svg></span><div className='eature__title'>سهولة البيع</div></Card.Title><br></br>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            <Card.Text>
            عب,أكد,إحفظ بثلاث خطوات فقط وبأقل من 20 ثانية يمكنك عرض حسابك للبيع
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        </div>
      </div>
      {/* Column for large screens (col-lg-3) */}
      <div className="col-12 col-lg-3">
        <div className="p-3">
        <div className='feature'>
        <Card style={{ border:'none',backgroundColor: `rgba(var(--bs-danger-rgb), 0.1)`,height:'265px'}}>
          <Card.Body>
            <Card.Title className='feature' style={{ display: 'flex'}}><span className='feature__icon feature__icon--red'><svg style={{ fill: '#eb5757'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15,12a1,1,0,1,0,1-1A1,1,0,0,0,15,12Zm6.71-.71-5-5A1,1,0,0,0,16,6H5A3,3,0,0,0,2,9v6a3,3,0,0,0,3,3H16a1,1,0,0,0,.71-.29l5-5A1,1,0,0,0,21.71,11.29ZM15.59,16H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H15.59l4,4Z"></path></svg></span><div className='eature__title'>شراء الحسابات</div></Card.Title><br></br>
            <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
            <Card.Text>
            يمكنك شراء حسابات بأمان وراحة تامة, حقك محفوظ تماماً حيث المنصة تعمل دور الوسيط.
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AutoLayoutExample;