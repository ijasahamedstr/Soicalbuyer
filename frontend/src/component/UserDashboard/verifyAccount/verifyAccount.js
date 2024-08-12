import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './verifyAccount.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Verifyaccount({isOTPLoggedIn, OTPLoggedUserData}) {
  const [userdata, setUserdata] = useState(null);
  const [userid, setuserid] = useState("");
  const [fname, setFname] = useState("");
  const [midname, setMidname] = useState("");
  const [lname, setLname] = useState("");
  const [documentcountry, setDocumentcountry] = useState("");
  const [documenttype, setDocumenttype] = useState("");
  const [documentnumber, setDocumentnumber] = useState("");
  const [file, setFile] = useState(null); // Ensure this is null initially
  const navigate = useNavigate();

  useEffect(() => {
    if (isOTPLoggedIn) {
      setUserdata(OTPLoggedUserData?.preuser || {});
    }
  }, [isOTPLoggedIn, OTPLoggedUserData]);

  useEffect(() => {
    const fetchUserData = () => {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      setUserdata(userDetails);
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 300000);

    return () => clearInterval(intervalId);
  }, []);

  // Handle changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'userid':
        setuserid(String(userdata?._id));
        break;
        case 'fname':
          setFname(value);
          break;
      case 'midname':
        setMidname(value);
        break;
      case 'lname':
        setLname(value);
        break;
      case 'documentcountry':
        setDocumentcountry(value);
        break;
      case 'documenttype':
        setDocumenttype(value);
        break;
      case 'documentnumber':
        setDocumentnumber(value);
        break;
      default:
        break;
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("userid", String(userdata?._id)); // Convert _id to string if necessary
    formData.append("fname", fname);
    formData.append("midname", midname);
    formData.append("lname", lname);
    formData.append("documentcountry", documentcountry);
    formData.append("documenttype", documenttype);
    formData.append("documentnumber", documentnumber);
    
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    try {
      const res = await axios.post("http://localhost:8000/Accountactive", formData, config);
      
      if (res.data.status === 401 || !res.data) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error occurred while uploading data!',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User data uploaded successfully.',
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error occurred while uploading data!',
      });
    }
  };

  const  marginTopValue = '50px',marginBottomValue = '10px';
  return (
    <Container>
    {/* Stack the columns on mobile by making one full-width and the other half-width */}
    <Row>
    <div style={{marginTop:marginTopValue,marginBottom:marginBottomValue}}><h2 className='entry-title'>الطلبات</h2></div>
      <Col style={{backgroundColor:'#FFFFFF'}}>
      </Col>
    </Row>
    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <h2 style={{textAlign:'center',fontFamily:'Noto Kufi Arabic',marginTop:'1.5rem'}}>تفعيل الحساب</h2>
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form' onSubmit={handleSubmit}>
        <h3 style={{marginBottom:'30px',color:'rgb(97, 100, 255)',fontSize:'23px',textAlign:'center'}}>تفعيل الحساب بالهوية يمكنك من التالي</h3>
        <div>
        <p style={{textAlign:'center',fontSize:'14px',color:'red',marginBottom:'1px'}}>فتح حد السحب</p>
        <p style={{textAlign:'center',fontSize:'14px',color:'red',marginBottom:'1px'}}>فتح حد التحويل الداخلي</p>
        <p style={{textAlign:'center',fontSize:'14px',color:'red',marginBottom:'1px'}}>عرض حسابات بقيمة 250$ وما فوق</p><br/>
        </div>
        <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Control placeholder="الإسم الاول" className="hidden" name="userid" value={userid} onChange={handleChange}  />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الإسم الاول{userdata?.displayName}</Form.Label>
            <Form.Control placeholder="الإسم الاول" className='sign__input' name="fname" value={fname} onChange={handleChange}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الإسم الوسط</Form.Label>
            <Form.Control placeholder="الإسم الوسط" className='sign__input'  name="midname" value={midname} onChange={handleChange}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>الإسم الأخير</Form.Label>
            <Form.Control placeholder="الإسم الأخير" className='sign__input' name="lname"  value={lname} onChange={handleChange}  />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>دولة إصدار الوثيقة</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input'  name="documentcountry" value={documentcountry} onChange={handleChange}>
        <option value="BH">مملكة البحرين</option>
        <option value="SA">المملكة العربية السعودية</option>
        <option value="AE">الإمارات العربية المتحدة</option>
        <option value="QA">قطر</option>
        <option value="OM">عمان</option>
        <option value="KW">الكويت</option>
        <option value="EG">مصر</option>
        <option value="JO">الأردن</option>
        <option value="IQ">العراق</option>
        <option value="SY">سوريا</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>نوع الوثيقة</Form.Label>
        <Form.Select aria-label="Default select example" className='sign__input' name="documenttype" value={documenttype} onChange={handleChange}>
        <option value="passport">جواز السفر</option>
        <option value="id">بطاقة الهوية</option>
        <option value="driving_license">رخصة القيادة</option>
        </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>رقم الوثيقة</Form.Label>
            <Form.Control placeholder="رقم وثيقة الإثبات" className='sign__input' name="documentnumber" value={documentnumber} onChange={handleChange}  />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>وثيقة الإثبات</Form.Label>
            <Form.Control  placeholder="رقم وثيقة الإثبات" className='sign__input' type="file" onChange={handleFileChange} name='photo' />
        </Form.Group>

        <h4 >لضمان قبول طلبك الرجاء مراجعة</h4>
        <h5 style={{color:'red'}}>إرشادات الوثيقة</h5>
        <div>
        <Form.Group className="mb-3" style={{marginTop:'15px',fontFamily:'Noto Kufi Arabic',fontSize:'13px'}}>
        <Form.Check
          required
          label="أوافق على الشروط والأحكام "
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
 
      <Form.Group className="mb-3" style={{fontFamily:'Noto Kufi Arabic',fontSize:'13px',textAlign:'left'}}>
        <Form.Check
          required
          label="انا مسؤول عن أي بيانات مدخله وأتحمل أي إجراء قانوني "
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      </div>
     
        <Button variant="primary" type="submit" style={{fontFamily:'Noto Kufi Arabic',fontSize:'13px',background:'red'}}>
        مشاهدة إرشادات الوثيقة لإرسال الطلب 
        </Button>
    
        </Form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </Col>
    </Row>

    <Row>
      <Col>
        <div class="col d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-6 col-lg-9">
        <div class="col-12">
        <div class="col-12">
        <div class="sign">
        <div class="sign__content">
        <Form className='sign__form'>
        <div className="container mt-4">
        <div className="row justify-content-center">
            <img
                src="https://usr.dokan-cdn.com/usr-card-method.jpg"
                className="img-fluid"
                alt="Responsive"
            />
        </div>
        </div>
        <h3 style={{marginBottom:'30px',color:'red',textAlign:'center',marginTop:'15px'}}>إرشادات الوثيقة</h3>
        <p style={{textAlign:'center',fontSize:'14px',color:'red'}}>انت على وشك رفع طلب تفعيل الرجاء التأكد أن</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>هذه هي الوثيقة الخاصة بك الصادرة من الحكومة الخاصة بك وغير منتهية الصلاحية</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>هذه هي الوثيقة الحقيقية وليست صورة أو نسخة</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>التأكد من وضوح الصورة وإمكانية قراءة البيانات الموجودة عليها</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>التأكد من تصوير الوثيقة بالقرب من ورقة مكتوب فيها اسم المستخدم الخاص بك او بالقرب من جهاز يظهر فيه حسابك في المنصة</p>
        <p style={{fontSize:'13px',textAlign:'center'}}>إذا كنت تواجه صعوبة أو مشكلة أو لديك أي إستفسار تواصل مع <a href="https://wa.me/+966505381800">الدعم الفني</a></p>
        
        </Form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
      </Col>
    </Row>
  </Container>
  );
}

export default Verifyaccount;
