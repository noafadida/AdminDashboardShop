import axios from 'axios';
import { TextBoxComponent, SelectedEventArgs, UploaderComponent, } from '@syncfusion/ej2-react-inputs';
import { TEmployee } from '../pages/Employees';

type DialogFormTemplateProps = {
    setImagePath: (value: string) => void
} & TEmployee;

const DialogFormTemplateAddEmployee = (props: DialogFormTemplateProps) => {
    const onFileSelect = async (args: SelectedEventArgs) => {
        const file = args.filesData[0].rawFile; // Assuming only one file is selected
        const formData = new FormData();

        formData.append('file', file)
        const fileName = await axios.post("http://localhost:5000/api/files/add-file", formData)
        props.setImagePath(fileName.data)
    };

    return (
        <div className='form' >
            <div className='form-row'>
                <div className='form-group col-md-6 w-80' >
                    <TextBoxComponent type='number' value={props.EmployeeID} id='EmployeeID' placeholder='Employee ID' floatLabelType='Auto' className='noSpinArrows' />
                    <TextBoxComponent id='Name' value={props.Name} placeholder='Name' floatLabelType='Auto' />
                    <TextBoxComponent id='Title' value={props.Title} placeholder='Title' floatLabelType='Auto' />
                    <TextBoxComponent id='HireDate' value={props.HireDate} placeholder='Hire Date' floatLabelType='Auto' />
                    <TextBoxComponent id='ReportsTo' value={props.ReportsTo} placeholder='Reports To' floatLabelType='Auto' />
                    <TextBoxComponent id='Country' value={props.Country} placeholder='Country' floatLabelType='Auto' />
                    <UploaderComponent id="EmployeeImage" allowedExtensions='.jpg,.png' multiple={false} selected={onFileSelect} />
                </div>
            </div>
        </div>
    )
};

export default DialogFormTemplateAddEmployee;