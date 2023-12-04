import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs'; 

export default function Training() {
    const [trainings, setTrainings] = useState([]);

    // columns for ag-grid
    const columns = [
        {
            field: 'date',
            filter: 'agDateColumnFilter',
            sortable: true,
            valueFormatter: params => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
            filterParams: {
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                    // Convert the cell value to local date
                    const cellDate = dayjs(cellValue);
    
                    // Check if the cell date is the same as the filter date
                    if (cellDate.isSame(filterLocalDateAtMidnight, 'day')) {
                        return 0; // Dates are equal
                    }
    
                    // Check if the cell date is before the filter date
                    if (cellDate.isBefore(filterLocalDateAtMidnight, 'day')) {
                        return -1; // Cell date is before filter date
                    }
    
                    // Cell date is after filter date
                    return 1;
                },
                browserDatePicker: true, // Enable browser's native date picker
                dateFormat: 'DD.MM.YYYY HH:mm', // Specify the date format to match the API response
            },
        },
        { field: 'duration', filter: true, sortable: true },
        { field: 'activity', filter: true, sortable: true },
        { field: 'customer.firstname', headerName: 'First Name', filter: true, sortable: true },
        { field: 'customer.lastname', headerName: 'Last Name', filter: true, sortable: true },
    ];
    
    

    // fetch trainings once component has loaded
    useEffect(() => {
        getTrainings();
    }, []);

    // setting a variable for trainings REST url
    const TRAININGS_REST_URL = 'https://traineeapp.azurewebsites.net/api/trainings';

    const getTrainings = async () => {
        try {
            const response = await fetch(TRAININGS_REST_URL);
            const trainingData = await response.json();
    
            // Fetch customer data for each training
            const fetchCustomerPromises = trainingData.content.map(async (training) => {
                const customerResponse = await fetch(training.links.find(link => link.rel === 'customer').href);
                const customerData = await customerResponse.json();

                return {
                    ...training,
                    customer: customerData
                };
            });
    
            // Resolve all promises and set the enhanced training data
            const enhancedTrainingData = await Promise.all(fetchCustomerPromises);
            setTrainings(enhancedTrainingData);
        } catch (error) {
            console.error(error);
        }
    };
    
    

    return (
        <>
            <div className="ag-theme-material" style={{ height: '700px', width: '100%', margin: '5px auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={6}
                />
            </div>
        </>
    );
}
