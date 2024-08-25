import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './sell.css';
import { IoLogoGameControllerB } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { IoMdPricetags } from "react-icons/io";
import { FaShareAltSquare } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { BsTropicalStorm } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";
import { SiSteam } from "react-icons/si";
import { AiFillExperiment } from "react-icons/ai";
import { IoHammer } from "react-icons/io5";
import { IoIosColorPalette } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from 'react-router-dom';


function Sell() {
  return (
    <>
        <Container>
          <Row>
            <Col style={{ backgroundColor: '#FFFFFF' }}>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="col d-flex align-items-center justify-content-center">
                <div className="">
                  <h2 style={{ textAlign: 'center', fontFamily: 'Changa, sans-serif', marginTop: '1.5rem' }}>ماذا ترغب في البيع اليوم؟</h2>
                  <div className="sign">
                    <div className="sign__content">
                      <Form className='sign__form'>
                        <p>قم بإختيار نوع المنتج لبدأ رحلة البيع من خلال المنصة</p>
                        <Row>
                         <Col>
                         <Link to='/sell/social'>
                            <div>
                                <button
                                type="button"
                                role="radio"
                                aria-checked="false"
                                data-state="unchecked"
                                value="normal"
                                className="button sr-only"
                                id="normal"
                                ></button>
                                <label
                                className="label"
                                htmlFor="normal"
                                >
                              <FaShareAltSquare />
                                تواصل إجتماعي
                                <p className="text-xs mt-1 text-neutral-400 flex">
                                <FaInstagramSquare />
                                <FaTwitter />
                                <FaSnapchat />
                                <AiFillTikTok />
                                </p>
                                </label>
                            </div>
                            </Link>
                         </Col>
                         <Col>
                         <Link to='/sell/gaming'>
                         <div>
                              <button
                                type="button"
                                role="radio"
                                aria-checked="false"
                                data-state="unchecked"
                                value="normal"
                                className="button sr-only"
                                id="normal"
                                ></button>
                                <label
                                className="label"
                                htmlFor="normal"
                                >
                                <IoLogoGameControllerB />
                                لعبة
                                <p className="text-xs mt-1 text-neutral-400 flex">
                                <IoLogoGameControllerA />
                                <BsTropicalStorm />
                                <SiSteam />
                                <SiEpicgames />
                                </p>
                                </label>
                            </div>
                            </Link>
                         </Col>
                         <Col>
                         <Link to='/sell/service'>
                         <div>
                                <button
                                type="button"
                                role="radio"
                                aria-checked="false"
                                data-state="unchecked"
                                value="normal"
                                className="button sr-only"
                                id="normal"
                                ></button>
                                <label
                                className="label"
                                htmlFor="normal"
                                >
                                <IoMdPricetags />
                                خدمة
                                <p className="text-xs mt-1 text-neutral-400 flex">
                                <AiFillExperiment />
                                <IoHammer />
                                <IoIosColorPalette />
                                <TbTruckDelivery />
                                </p>
                                </label>
                            </div>
                            </Link>
                         </Col>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default Sell;
