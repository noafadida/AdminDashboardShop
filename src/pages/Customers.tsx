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
  DeleteEventArgs
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import axios from 'axios';

type Customer = {
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
  let [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      if (!customers || customers.length === 0) {
        const { data } = await axios.get(
          "http://localhost:5000/api/customers/all-customers"
        );
        setCustomers(data)
      }

    };
    fetchCustomers();
  }, [customers]);

  async function actionComplete(args: DeleteEventArgs): Promise<void> {
    if (args.requestType === 'delete') {
      args.data?.map(async (customer: any) => {
        const customerDelete = await axios.delete(`http://localhost:5000/api/customers/${customer?._id}`)
        console.log("customerDelete" + JSON.stringify(customerDelete))
      })
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customers}
        allowPaging
        allowSorting
        toolbar={["Delete"]}
        editSettings={{ allowDeleting: true, allowEditing: true }}
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
