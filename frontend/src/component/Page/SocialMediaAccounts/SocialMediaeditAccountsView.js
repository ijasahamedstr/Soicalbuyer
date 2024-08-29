import Button from 'react-bootstrap/Button';
import { Card, Nav } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function Editsocial() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8000/soical/${id}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setItem(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/soical/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            Swal.fire({
                icon: 'success',
                title: 'تم تحديث الحساب!',
                text: 'تم حفظ التعديلات بنجاح.',
                confirmButtonColor: '#6164ff'
            });
            navigate("/التواصل الإجتماعي");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ!',
                text: error.message,
                confirmButtonColor: '#6164ff'
            });
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/soical/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');

            Swal.fire('تم الحذف!', 'تم حذف الحساب بنجاح.', 'success');
            navigate("/التواصل الإجتماعي");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'حدث خطأ!',
                text: error.message,
                confirmButtonColor: '#6164ff'
            });
        }
    };

    const handleSocialTypeChange = (selectedValue) => {
        setItem(prevItem => ({ ...prevItem, social_type: selectedValue }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    };

    const socialTypes = [
        { value: 'instagram', label: 'انستقرام' },
        { value: 'tiktok', label: 'تيك توك' },
        { value: 'twitter', label: 'تويتر' },
        { value: 'steam', label: 'ستيم' },
        { value: 'snapchat', label: 'سناب شات - تتطلب إشتراك باقة لايت أو برو من متجر المنصة', disabled: true },
        { value: 'sony', label: 'سوني - تتطلب إشتراك باقة لايت أو برو من متجر المنصة', disabled: true },
        { value: 'xbox', label: 'إكس بوكس - تتطلب إشتراك باقة لايت أو برو من متجر المنصة', disabled: true },
        { value: 'tellonym', label: 'تيلونيوم - تتطلب إشتراك باقة لايت أو برو من متجر المنصة', disabled: true },
    ];

    const getImageForPlatform = (social_type) => {
        switch (social_type) {
            case 'instagram':
                return 'https://usr.dokan-cdn.com/instagram.png';
            case 'tiktok':
                return 'https://usr.dokan-cdn.com/tiktok.png';
            case 'twitter':
                return 'https://usr.dokan-cdn.com/twitter.png';
            case 'steam':
                return 'https://usr.dokan-cdn.com/steam.png';
            default:
                return 'https://usr.dokan-cdn.com/default.png';
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h2 className="text-center text-white bg-danger p-3" style={{ fontSize: '20px' }}>
                        منصة يوزر لن تطلب منك بيانات الحساب خارج هذه الصفحة بشكل نهائي | ولن تطلب منك تسليم أي بيانات عبر الواتس اب او منصات أخرى
                    </h2>
                </Col>
                <Col xs={12} md={8} className="bg-white">
                    <h4>تعديل الحساب {item?.social_username || ''}</h4>
                    <Container>
                        <Row className="bg-light p-4">
                            <Col>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicUsername" style={{ width: '100%' }}>
                                        <Form.Label>اسم المستخدم</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={item?.social_username || ''}
                                            readOnly
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" style={{ width: '100%' }}>
                                        <Form.Label>المنصة</Form.Label>
                                        <Form.Select 
                                            value={item?.social_type || ''} 
                                            onChange={(e) => handleSocialTypeChange(e.target.value)}
                                        >
                                            {socialTypes.map(type => (
                                                <option 
                                                    key={type.value} 
                                                    value={type.value} 
                                                    disabled={type.disabled}
                                                >
                                                    {type.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="descriptionTextarea" style={{ width: '100%' }}>
                                        <Form.Label>وصف الحساب</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            name="social_dec"
                                            value={item?.social_dec || ''}
                                            onChange={handleInputChange}
                                        />
                                        <p>لا تقم بوضع أي طريقة تواصل خارج المنصة في الوصف بشكل نهائي لأنها تعرض حسابك للحظر!</p>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="promoTitle" style={{ width: '100%' }}>
                                        <Form.Label>العنوان الترويجي (٢٥ حرف كحد أقصى) (غير إلزامي)</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="Promotional_Title"
                                            value={item?.Promotional_Title || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="price" style={{ width: '100%' }}>
                                        <Form.Label>السعر (بالدولار)</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            name="social_amount"
                                            value={item?.social_amount || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="priceBeforeDiscount" style={{ width: '100%' }}>
                                        <Form.Label>السعر قبل التخفيض (غير إلزامي) (بالدولار) (فقط شكل, لن يتم بيع الحساب بهذا السعر)</Form.Label>
                                        <Form.Control 
                                              type="number" 
                                            name="discount"
                                            value={item?.discount || ''}
                                            onChange={handleInputChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" style={{ color: '#00fff7', width: '100%' }}>
                                        <Form.Check 
                                            type="checkbox" 
                                            label="إستقبال عروض" 
                                            checked={item?.receiveOffers || false}
                                            onChange={(e) => setItem(prevItem => ({ ...prevItem, receiveOffers: e.target.checked }))}
                                        />
                                    </Form.Group>

                                    <p>ستتمكن من استقبال عروض مالية على الحساب من المستخدمين الآخرين (سومات) وبإمكانك قبول عرض بسهولة تامة*</p>

                                    <Form.Group className="mb-3" style={{ color: 'red', width: '100%' }}>
                                        <Form.Check 
                                            type="checkbox" 
                                            label="اتعهد بتحمل كامل المسؤوليه القانونية بما مضى او صدر من الحساب المعروض من تاريخ انشاءه او شراءه الى تاريخ بيعه بمنصة يوزر واتعهد بخلوه من اي جرائم إلكترونيه" 
                                            checked={item?.legalCommitment || false}
                                            onChange={(e) => setItem(prevItem => ({ ...prevItem, legalCommitment: e.target.checked }))}
                                        />
                                    </Form.Group>

                                    <p style={{ color: 'red' }}>يمكنك عرض الحساب مرة واحدة كل 3 أيام الرجاء الإنتباه أثناء الحذف</p>      

                                    <Row>
                                        <Col>
                                            <Button 
                                                variant="primary" 
                                                style={{ fontSize: '13px', background: '#6164ff', border: 'none' }}
                                                type="submit"
                                            >
                                                تحديث الحساب
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button 
                                                variant="primary" 
                                                style={{ fontSize: '13px', background: '#4a4a4a', border: 'none' }}
                                                onClick={handleSubmit}
                                            >
                                                بيانات الحساب
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button 
                                                variant="primary" 
                                                style={{ fontSize: '13px', background: '#e83232', border: 'none' }}
                                                onClick={handleDelete}
                                            >
                                                حذف الحساب
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={6} md={4}>
                    <h4>معاينة</h4>
                    <div>
                        <Card style={{ backgroundColor: '#F2F3F4' }}>
                            <Nav.Link href='/social-media-accounts-view' style={{ width: '100%' }}>
                                <Card.Img 
                                    variant="top" 
                                    src={getImageForPlatform(item?.social_type)}  
                                    style={{ width: '100%' }} 
                                />
                            </Nav.Link>
                            <Card.Body>
                                <Card.Title></Card.Title>
                                <Card.Text>
                                    <div className="card__author card__author--verified">
                                        <img
                                            src={`http://localhost:8000/uploads/${item?.social_avatar || "default.jpg"}`}
                                            alt="User Avatar"
                                        />
                                        <a href={`https://usr.gg`}>
                                            @{item?.social_username || 'اسم المستخدم غير متوفر'}
                                        </a>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                            <Card.Body>
                                <Card.Link href="#">
                                    <div className='card__likes'>
                                        <span className='card__likes1'>🚀بوست</span>
                                    </div>
                                </Card.Link>
                                <Card.Link href="#">
                                    <div className="card__price">
                                        <span>السعر</span>
                                        <span dir="rtl">
                                            <span className="account_price_previe">{item?.social_amount || ''}</span>
                                        </span>
                                    </div>
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Editsocial;
