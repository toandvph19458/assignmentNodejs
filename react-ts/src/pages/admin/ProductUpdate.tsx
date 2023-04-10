import React, { useEffect ,useState} from 'react'
import { Icate, Iproduct } from '../../interfaces/product'
import{useForm,SubmitHandler} from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  message
} from 'antd';
import { uploadImage } from '../../api/upload';
interface Iprops  {
    onUpdate:(product:Iproduct)=>void,
    products:Iproduct[]
    cates:Icate[]
}
interface IfromInput {
    _id:number|string,
    name:string,
    price:number,
    img:string,
  cateId:string
}
const ProductUpdate = (props: Iprops) => {
    const {register,handleSubmit,reset}=useForm<Iproduct>();
    const [product,setProduct] = useState<any>({})
    const[cate,setcate]= useState<Icate[]>([])
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    const [fileList, setFileList] = useState<any>([]);
    const {id}= useParams()

    useEffect(()=>{
        const currenproduct = props.products.find(item=>item._id==String(id));
        setcate(props.cates)
        setProduct(currenproduct)
    },[props]);
    const [form]= Form.useForm();
    useEffect(()=>{
       setFidle()
    },[product]);
    const setFidle = ()=>{
        form.setFieldsValue({
            _id:product?._id,
            name: product?.name,
            price: product?.price,
            img: product?.img,
            cateId: product?.cateId
        })
    }
    const navigate = useNavigate()
    const onHandleSubmit:SubmitHandler<IfromInput>= async(data:IfromInput)=>{
      console.log(data)
      console.log(fileList);
      
      if(fileList==0){
        const newData ={
          ...data,
          _id:product._id,
          img:product.img
        }
        message.success("Cập nhật thành công!")
        props.onUpdate(newData)
       return  navigate("/admin/productManager")
      }
      const imgs= await uploadImage(fileList[0]?.originFileObj);
      const newData ={
        ...data,
        img:imgs[0],
        _id:product._id
      }
        message.success("Cập nhật thành công!")
        props.onUpdate(newData)
        navigate("/admin/productManager")
        
    }
  return (
    <>
    <Checkbox
      checked={componentDisabled}
      onChange={(e) => setComponentDisabled(e.target.checked)}
    >
      Form disabled
    </Checkbox>
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={componentDisabled}
      style={{ maxWidth: 600 }}
      onFinish={onHandleSubmit}
      
      
    >

      <Form.Item label="Tên sản phẩm" name='name' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Giá" name='price' rules={[{ required: true }]}>
        <Input type='number' />
      </Form.Item>
      <Form.Item label="danh mục" name='cateId'>
        <Select>
          {cate.map((item)=>{
            
            return(<Select.Option value={item._id}>{item.name}</Select.Option>)
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList" id='img' rules={[{ required: true }]}>
        <Upload beforeUpload={(files)=>{console.log(files);
                    return false}} listType="picture-card" onChange={({ fileList: newFileList }) => setFileList(newFileList)}>
                      <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
          </Upload>
      </Form.Item>
      <Form.Item label="Xác nhận">
        <Button type="primary" htmlType="submit">Xác nhận</Button>
      </Form.Item>
    </Form>
  </>
  )
}

export default ProductUpdate