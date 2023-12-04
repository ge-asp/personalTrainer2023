import { AppBar, Typography } from "@mui/material"
import { useState, useEffect } from "react"
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { AgGridReact } from "ag-grid-react"
import AddCustomer from "./AddCustomer"

export default function Customer() {

    const [customers, setCustomers] = useState([])


    // columns for ag grid
    const columns = [
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: 'agSetColumnFilter'},
        {field: 'postcode', sortable: true, width: 120, filter: 'agNumberColumnFilter'},
        {field: 'city', sortable: true, filter: 'agSetColumnFilter'},
        {field: 'email', sortable: true, filter: 'agSetColumnFilter'},
        {field: 'phone', sortable: true, filter: 'agSetColumnFilter'}
    ]
    // fetching customers once component has loaded
    useEffect(() => getCustomers(), [])
    
    // setting a variable for cusomers REST url
    const CUSTOMER_REST_URL = 'https://traineeapp.azurewebsites.net/api/customers'


    const getCustomers = () => {
        fetch(CUSTOMER_REST_URL)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(error => console.error(error))
    }

    const addCustomer = (customer) => {
        fetch(CUSTOMER_REST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers()
                else
                    alert('Something went wrong while adding a new customer')
            })
        .catch(err => console.error(err))
    }



    return (
        <>
            
            <div className="ag-theme-material"
                style={{ height: '700px', width: '100%', margin: '5px auto' }}>
                <AddCustomer addCustomer={addCustomer}/>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={6}>
                </AgGridReact>
                    
            </div>
        </>
    )
}