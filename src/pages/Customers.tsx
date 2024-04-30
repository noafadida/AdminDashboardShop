import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  DeleteEventArgs,
  EditSettingsModel,
  ToolbarItems,
  SaveEventArgs
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import axios from 'axios';
import DialogFormTemplate from '../components/DialogFormTemplateAddCustomer';

export type TCustomer = {
  CustomerID: {
    type: Number
  },
  CustomerName: {
    type: string,
  },
  CustomerEmail: {
    type: String,
  },
  ProjectName: {
    type: String,
  },
  Status: {
    type: String,
  },
  StatusBg: {
    type: String,
  },
  Weeks: {
    type: String,
  },
  Budget: {
    type: String,
  },
  Location: {
    type: String
  },
  CustomerImage: {
    type: String,
  },
}

const Customers = () => {
  let [customers, setCustomers] = useState<TCustomer[]>([]);
  const [imagePath, setImagePath] = useState<string>('');
  const [colorStatus, setColorStatus] = useState<string>('');

  const editOptions: EditSettingsModel = { allowAdding: true, mode: 'Dialog', template: dialogTemplate, allowDeleting: true, allowEditing: true };
  const toolbarOptions: ToolbarItems[] = ['Add', 'Search', 'Delete',]

  function dialogTemplate(props: TCustomer,) {
    return (<DialogFormTemplate setImagePath={(value: string) => setImagePath(value)} setColorStatus={(value: string) => setColorStatus(value)}  {...props} />)
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!customers || customers.length === 0 || imagePath || colorStatus) {
        const { data } = await axios.get(
          "http://localhost:5000/api/customers/all-customers"
        );
        // console.log(data)
        setCustomers(data)
      }
    };
    fetchCustomers();
  }, [customers, imagePath, colorStatus]);

  async function actionComplete(args: SaveEventArgs | DeleteEventArgs): Promise<void> {
    console.log(colorStatus)
    try {
      const data = {
        ...args.data,
        CustomerImage: imagePath,
        StatusBg:colorStatus
      }
      if (args.requestType === 'save') {
        const resData: any = await axios.post("http://localhost:5000/api/customers/add-customer", data)
        // console.log(resData);
      }
      if (args.requestType === 'delete') {
        const customersToDelete: any = args.data
        customersToDelete.map(async (customer: any) => {
          const customerDelete = await axios.delete(`http://localhost:5000/api/customers/${customer?._id}`)
          // console.log("customerDelete" + JSON.stringify(customerDelete))
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
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customers}
        allowPaging
        allowSorting
        toolbar={toolbarOptions}
        editSettings={editOptions}
        width="auto"
        actionComplete={actionComplete}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
