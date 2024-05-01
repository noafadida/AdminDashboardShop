import axios from 'axios';
import { TextBoxComponent, SelectedEventArgs, UploaderComponent, } from '@syncfusion/ej2-react-inputs';
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { TCustomer } from '../pages/Customers';

type DialogFormTemplateProps = {
    setImagePath: (value: string) => void
    setColorStatus: (value: string) => void
} & TCustomer;

const DialogFormTemplateAddCustomer = (props: DialogFormTemplateProps) => {
    const statusData: { [key: string]: Object }[] = [
        { status: 'Pending', color: "#FFBB70" },
        { status: 'Active', color: "#8BE78B" },
        { status: 'Completed', color: "#A3D8FF" },
        { status: 'Canceled', color: "#FA7070" }]

    const fields: object = { text: 'status', value: 'status', };

    const onFileSelect = async (args: SelectedEventArgs) => {
        const file = args.filesData[0].rawFile; // Assuming only one file is selected
        const formData = new FormData();

        formData.append('file', file)
        const fileName = await axios.post("http://localhost:5000/api/files/add-file", formData)
        props.setImagePath(fileName.data)
    };

    const onStatusSelect = async (args: any) => {     
        props.setColorStatus(args?.itemData?.color)
    }

    function itemTemplate(data: any) {
        return (<span>
             <button className='statusbg h-3 w-3 rounded-full' style={{ backgroundColor: data.color }}>
            </button>
            <span className='status m-4'>{data.status}</span>
           </span>);
    }

    return (
        <div className='form' >
            <div className='form-row'>
                <div className='form-group col-md-6 w-80' >
                    <TextBoxComponent type='Number' id='CustomerID' placeholder='Customer ID' floatLabelType='Auto' />
                    <TextBoxComponent id='CustomerName' placeholder='Name' floatLabelType='Auto' />
                    <TextBoxComponent id='CustomerEmail' placeholder='Email' floatLabelType='Auto' />
                    <TextBoxComponent id='ProjectName' placeholder='Project Name' floatLabelType='Auto' />
                    {/* <TextBoxComponent id='Status' placeholder='Status' floatLabelType='Auto' /> */}
                    <ComboBoxComponent id='Status' dataSource={statusData} fields={fields} placeholder='Status' itemTemplate={itemTemplate.bind(this)} select={onStatusSelect} />
                    {/* <TextBoxComponent id='StatusBg' placeholder='StatusBg' floatLabelType='Auto' /> */}
                    <TextBoxComponent id='Weeks' placeholder='Weeks' floatLabelType='Auto' />
                    <TextBoxComponent id='Budget' placeholder='Budget' floatLabelType='Auto' />
                    <TextBoxComponent id='Location' placeholder='Location' floatLabelType='Auto' />
                    <UploaderComponent id="CustomerImage" allowedExtensions='.jpg,.png' multiple={false} selected={onFileSelect} />
                </div>
            </div>
        </div>
    )

};

export default DialogFormTemplateAddCustomer;