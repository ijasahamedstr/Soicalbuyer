// Filters.js
import React from 'react';
import { Form } from 'react-bootstrap';

const Filters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange(name, value);
    
  };
  const marginTopValue = '10px',marginBottomValue = '20px';
  return (
    <>
      <Form className='centered-form'>
        <h4 style={{marginTop:marginTopValue,marginBottom:marginBottomValue,color:'rgb(97, 100, 255)',textAlign:'center'}}>البحث المخصص</h4>
        <div class="col-12" style={{marginBottom:'30px'}}>
        <div class="main__filter" style={{justifyContent:'center'}}>
        <form method="get" class="main__filter-search">
        <input type="text" placeholder="Keyword"  name="location" value={filters.location} onChange={handleFilterChange}/>

        </form>
        </div>
        </div>
      </Form>
    </>
  );
};

export default Filters;