import React, { useEffect, useState } from "react";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Inject,
    Search,
    Toolbar,
    ToolbarItems,
    EditSettingsModel,
    SaveEventArgs,
    DeleteEventArgs,
    Selection,
} from "@syncfusion/ej2-react-grids";

import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";
import axios from 'axios';
import DialogFormTemplate from '../components/DialogFormTemplate';


export type TEmployee = {
    EmployeeID: string,
    Name: string,
    Title: string
    HireDate: string,
    ReportsTo: string,
    Country: string,
    EmployeeImage: any
}

const Employees = () => {
    const [employees, setEmployees] = useState<TEmployee[]>([]);
    const [imagePath, setImagePath] = useState<string>('');

    const editOptions: EditSettingsModel = { allowAdding: true, mode: 'Dialog', template: dialogTemplate, allowDeleting: true, };
    const toolbarOptions: ToolbarItems[] = ['Add', 'Search', 'Delete',]

    function dialogTemplate(props: TEmployee,) {
        return (<DialogFormTemplate setImagePath={(value: string) => setImagePath(value)} {...props} />)
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!employees || employees.length === 0 || imagePath) {
                const { data } = await axios.get(
                    "http://localhost:5000/api/employees/all-employees"
                );
                // console.log(data)
                setEmployees(data)
            }
        };
        fetchEmployees();
    }, [employees, imagePath]);

    async function actionComplete(args: SaveEventArgs | DeleteEventArgs): Promise<void> {
        try {
            const data = {
                ...args.data,
                EmployeeImage: imagePath
            }
            if (args.requestType === 'save') {
                const resData: any = await axios.post("http://localhost:5000/api/employees/add-employee", data)
                // console.log(resData);
            }
            if (args.requestType === 'delete') {
                const employeesToDelete: any = args.data
                employeesToDelete.map(async (employee: any) => {
                    const employeeeDelete = await axios.delete(`http://localhost:5000/api/employees/${employee?._id}`)
                    // console.log("employeeDelete" + JSON.stringify(employeeeDelete))
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setImagePath('')
        }
    };


    return (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Employees" />
            <GridComponent
                dataSource={employees}
                allowPaging
                allowSorting
                editSettings={editOptions}
                toolbar={toolbarOptions}
                actionComplete={actionComplete}
                width="auto"
            >
                <ColumnsDirective>
                    {employeesGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Search, Toolbar, Selection,]} />
            </GridComponent>
        </div>
    );
};

export default Employees;
