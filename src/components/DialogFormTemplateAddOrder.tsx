import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Dialog } from '@syncfusion/ej2-react-popups';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { TOrder } from '../pages/Orders';
import Iphone15pink from '../data/products/Iphone15pink.jpg'
import Iphone15blue from '../data/products/Iphone15blue.jpg'
import Iphone15black from '../data/products/Iphone15black.jpg'
import IpadPro from '../data/products/IpadPro.jpg'
import Airpods from '../data/products/Airpods.jpg'
import AirpodsMaxsilver from '../data/products/AirpodsMaxsilver.jpg'
import AppleWatchblack from '../data/products/AppleWatchblack.jpg'
import AppleWatchwhite from '../data/products/AppleWatchwhite.jpg'
import AppleWatchbeigh from '../data/products/AppleWatchbeigh.jpg'


type DialogFormTemplateProps = {
    setColorStatus: (value: string) => void
    setProductPath: (value: string) => void
    setProductName: (value: string) => void
    setTotalAmount: (value: string) => void
} & TOrder;

export const productsData: { [key: string]: Object }[] = [
    { id: 'Iphone15pink', name: 'Iphone 15 Pro Pink', img: Iphone15pink, totalAmount: '$1313' },
    { id: 'Iphone15blue', name: 'Iphone 15 Pro Blue', img: Iphone15blue, totalAmount: '$1313' },
    { id: 'Iphone15black', name: 'Iphone 15 Pro Black', img: Iphone15black, totalAmount: '$1313' },
    { id: 'IpadPro', name: 'Ipad Pro', img: IpadPro, totalAmount: '$1272' },
    { id: 'Airpods', name: 'Airpods', img: Airpods, totalAmount: '$189' },
    { id: 'AirpodsMaxsilver', name: 'Airpods Max Silver', img: AirpodsMaxsilver, totalAmount: '$616' },
    { id: 'AppleWatchblack', name: 'Apple Watch Black', img: AppleWatchblack, totalAmount: '$299' },
    { id: 'AppleWatchwhite', name: 'Apple Watch White', img: AppleWatchwhite, totalAmount: '$299' },
    { id: 'AppleWatchbeigh', name: 'Apple Watch Beighe', img: AppleWatchbeigh, totalAmount: '$299' },

]

const DialogFormTemplateAddOrder = (props: DialogFormTemplateProps) => {
    const statusData: { [key: string]: Object }[] = [
        { status: 'Pending', color: "#FFBB70" },
        { status: 'Active', color: "#8BE78B" },
        { status: 'Completed', color: "#A3D8FF" },
        { status: 'Canceled', color: "#FA7070" }]

    const fields: object = { text: 'status', value: 'status', };
    const products: object = { text: 'name', value: 'img' }

    const onStatusSelect = async (args: any) => {
        props.setColorStatus(args?.itemData?.color)
    }

    const onProductSelect = async (args: any) => {
        const path = `http://localhost:5000/products/${args.itemData.id}.jpg`

        console.log(args.itemData)
        props.setProductPath(path)
        props.setProductName(args.itemData.name)
        props.setTotalAmount(args.itemData.totalAmount)
    }

    function itemStatusTemplate(data: any) {
        return (<span>
            <button className='statusbg h-3 w-3 rounded-full' style={{ backgroundColor: data.color }}>
            </button>
            <span className='status m-4'>{data.status}</span>
        </span>);
    }

    function itemProductTemplate(data: any) {
        return (<span className='product m-1 flex items-center size-10 '>
            <img className='productImg h-7 w-7 rounded-full m-3' src={data.img} alt={data.name} />
            {data.name}

        </span>);
    }

    return (
        <div className='form' >
            <div className='form-row'>
                <div className='form-group col-md-6 w-80'  >
                    <TextBoxComponent type='number' id='OrderID' placeholder='Order ID' floatLabelType='Auto' className='noSpinArrows' />
                    <TextBoxComponent id='CustomerName' placeholder='Customer Name' floatLabelType='Auto' />
                    {/* <TextBoxComponent type='number' id='TotalAmount' placeholder='Total Amount' floatLabelType='Auto' className='noSpinArrows' /> */}
                    <ComboBoxComponent id='Status' dataSource={statusData} fields={fields} placeholder='Status' itemTemplate={itemStatusTemplate.bind(this)} select={onStatusSelect} />
                    <TextBoxComponent id='Location' placeholder='Location' floatLabelType='Auto' />
                    <ComboBoxComponent id="ProductImage" placeholder='Product' dataSource={productsData} itemTemplate={itemProductTemplate.bind(this)} fields={products} select={onProductSelect} />
                </div>
            </div>
        </div>
    )
};

export default DialogFormTemplateAddOrder;