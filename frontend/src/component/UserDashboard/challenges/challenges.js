import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './challenges.css';
import Card from 'react-bootstrap/Card';

function Challenges() {
    const gridContainerStyle = {
        gridTemplateColumns: 'repeat(2.8rem 2fr 0.5fr)', // Example grid columns definition
        // You can adjust the number and size of columns as needed
        // gridTemplateColumns: '1fr 2fr 1fr' would define columns with different widths
      };

    return (
      <>
        <Container>

<div className="row justify-content-center mt-4" style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginBottom:'30px'}}>
<h1 style={{fontSize:'35px'}}>التحديات</h1>
<h5 style={{marginTop:'30px'}}>المتصدرين</h5>
</div>
<Row>
<Col sm={4} style={{marginTop:'-15px'}}>
<div className="p-3">
        <div className='feature'>
        <Card style={{border:'none',backgroundColor: `rgba(var(--bs-success-rgb), 0.1)`,height:'115px'}}>
          <Card.Body>
          <div className="c-card u-bg--light-gradient u-text--dark">
            <div className="c-card__body">
            <div className="u-display--flex u-justify--space-between">
            <div className="u-text--left">
            <div className="u-text--small" style={{fontSize:'20px',marginBottom:'20px'}}>تصنيفي</div>
            <h2 style={{fontSize:'15px'}}>غير مصنف</h2>
            </div>
            <div className="u-text--right">
            <div className="u-text--small" style={{fontSize:'20px',marginBottom:'20px'}}> نقاطي</div>
            <h2 style={{fontSize:'15px'}}>0</h2>
            </div>
            </div>
            </div>
            </div>
          </Card.Body>
        </Card>
        </div>
    </div>
    <div className="p-3" style={{marginTop:'-35px'}}>
        <div className='feature'>
        <Card style={{border:'none',backgroundColor: `rgba(var(--bs-success-rgb), 0.1)`,height:'265px'}}>
          <Card.Body>
           <div className="l-grid">
            <div className="l-grid__item l-grid__item--sticky">
            <div className="c-card">
            <div className="c-card__body">
            <div className="u-text--center" id="winner">
            <div className="u-text-small u-text--medium u-mb--16">المتصدر </div>
            <img  className="c-avatar c-avatar--lg" src="https://usr.dokan-cdn.com/public/avatars/01eca3378bf627f157c860ad05c61e41.jpg"/>
            <h3 className="u-mt--16" >K&nbsp;E M O</h3>
            <span className="u-text--teal u-text--small">@x800</span>
            </div>
            </div>
            </div>
            </div>
            </div>
          </Card.Body>
        </Card>
        </div>
    </div>

</Col>
<Col sm={8} >
        <Card style={{border:'none',backgroundColor: `rgba(var(--bs-success-rgb), 0.1)`}}>
          <Card.Body>
          <div className="l-grid__item">
            <div className="c-card">
            <div className="c-card__header">
            <h3 style={{fontSize:'18px'}}>المتصدرين</h3>
            </div>
            <div className="c-card__body">
            <ul className="c-list" id="list">
            <li className="c-list__item">
            <div className="c-list__grid" style={{gridContainerStyle, gridColumnGap: '2rem'}}>
            <div className="u-text--left u-text--small u-text--medium" style={{fontSize:'18px'}}>التصنيف</div>
            <div className="u-text--left u-text--small u-text--medium" style={{fontSize:'18px'}}>المستخدم</div>
            <div claclassNamess="u-text--right u-text--small u-text--medium" style={{textAlign:'end',fontSize:'18px'}}>النقاط</div>
            </div>
            </li>
            <li className="c-list__item">
            <div className="c-list__grid">
                <div className="c-flag c-place u-bg--transparent u-text--dark u-bg--yellow">1</div>
                <div className="c-media">
                <img className="c-avatar c-media__img" src="https://usr.dokan-cdn.com/public/avatars/01eca3378bf627f157c860ad05c61e41.jpg"/>
                <div className="c-media__content">
                    <div className="c-media__title">أبو عمره</div>
                    <a className="c-media__link u-text--small"  style={{fontSize:'18px'}}>@abo3mrh</a>
                </div>
                </div>
                <div className="u-text--right c-kudos u-text--yellow">
                <div className="u-mt--8">
                    <strong>1301</strong> 👍
				
                </div>
                </div>
            </div>
            </li>
            <li className="c-list__item">
            <div className="c-list__grid" style={{gridContainerStyle}}>
                <div className="c-flag c-place u-bg--transparent u-text--dark u-bg--yellow">2</div>
                <div className="c-media">
                <img className="c-avatar c-media__img" src="https://usr.dokan-cdn.com/public/avatars/01eca3378bf627f157c860ad05c61e41.jpg"/>
                <div className="c-media__content">
                    <div className="c-media__title">أبو عمره</div>
                    <a className="c-media__link u-text--small" style={{fontSize:'18px'}}>@hfmr</a>
                </div>
                </div>
                <div className="u-text--right c-kudos u-text--yellow" style={{color:'#28a745'}}>
                <div className="u-mt--8">
                    <strong>557</strong> 🔥
                </div>
                </div>
            </div>
            </li>
            <li className="c-list__item">
            <div className="c-list__grid" style={{gridContainerStyle}}>
                <div className="c-flag c-place u-bg--transparent u-text--dark u-bg--yellow">3</div>
                <div className="c-media">
                <img className="c-avatar c-media__img" src="https://usr.dokan-cdn.com/public/avatars/01eca3378bf627f157c860ad05c61e41.jpg"/>
                <div className="c-media__content">
                    <div className="c-media__title">أبو عمره</div>
                    <a className="c-media__link u-text--small"  style={{fontSize:'18px'}}>@peeu</a>
                </div>
                </div>
                <div className="u-text--right c-kudos u-text--yellow" style={{color:'#fd7e14'}}>
                <div className="u-mt--8">
                    <strong>309</strong>  🙌
				
                </div>
                </div>
            </div>
            </li>
            </ul>
            </div>
            </div>
            </div>
          </Card.Body>
        </Card>
</Col>
</Row>
</Container>
      </>
    );
  }
  
  export default Challenges;