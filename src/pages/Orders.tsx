import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  ContextMenu,
  EditSettingsModel,
  SaveEventArgs,
  DeleteEventArgs,
  ToolbarItems,
  Toolbar
} from "@syncfusion/ej2-react-grids";

import { ordersData, ordersGrid } from "../data/dummy";
import { Header } from "../components";
import axios from 'axios';
import DialogFormTemplate from '../components/DialogFormTemplateAddOrder';

export type TOrder = {
  OrderID: {
    type: Number
  },
  CustomerName: {
    type: string,
  },
  Price: {
    type: string,
  },
  OrderItems: {
    type: String,
  },
  Status: {
    type: String,
  },
  StatusBg: {
    type: String,
  },
  Location: {
    type: String
  },
  ProductImage: {
    type: String,
  },
}

const Orders = () => {
  let [orders, setOrders] = useState<TOrder[]>([]);
  const [imagePath, setImagePath] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [colorStatus, setColorStatus] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const editOptions: EditSettingsModel = {
    allowAdding: true, mode: 'Dialog', template: dialogTemplate, allowDeleting: true, headerTemplate: 'Add New Order' // Change this to the desired title
  };
  const toolbarOptions: ToolbarItems[] = ['Add', 'Search', 'Delete',]

  function dialogTemplate(props: TOrder,) {
    return (
      <DialogFormTemplate
        setProductPath={(value: string) => setImagePath(value)}
        setProductName={(value: string) => setImageName
          (value)}
        setColorStatus={(value: string) => setColorStatus(value)}
        setPrice={(value: string) => setPrice(value)}
        {...props} />)
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!orders || orders.length === 0) {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/all-orders"
        );
        // console.log(data.ProductImage)
        setOrders(data)
      }
    };
    fetchOrders();
  }, [orders, imagePath, colorStatus, imageName, price]);

  async function actionComplete(args: SaveEventArgs | DeleteEventArgs): Promise<void> {
    try {
      const data = {
        ...args.data,
        OrderItems: imageName,
        ProductImage: imagePath,
        StatusBg: colorStatus,
        Price: price
      }
      if (args.requestType === 'save') {
        const resData: any = await axios.post("http://localhost:5000/api/orders/add-order", data)
        // console.log(resData);
      }
      if (args.requestType === 'delete') {
        const ordersToDelete: any = args.data
        ordersToDelete.map(async (order: any) => {
          const orderDelete = await axios.delete(`http://localhost:5000/api/orders/${order?._id}`)
          // console.log("customerDelete" + JSON.stringify(customerDelete))
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setImagePath('')
      setColorStatus('')
      setImageName('')
    }
  };
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent id="gridcomp" dataSource={orders} allowPaging allowSorting toolbar={toolbarOptions} actionComplete={actionComplete} editSettings={editOptions}>
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            ExcelExport,
            PdfExport,
            Edit,
            Page,
            Toolbar
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
