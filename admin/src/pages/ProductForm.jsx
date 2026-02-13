import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AddProductCard from '../component/productCard/AddProductCard'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

const ProductForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)
    const [initialData, setInitialData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isEdit) {
            const fetchProduct = async () => {
                setLoading(true)
                try {
                    const res = await axios.get(`http://localhost:4000/api/products/${id}`)
                    if (res.data.success) {
                        setInitialData(res.data.data)
                    }
                } catch (error) {
                    console.error('Error fetching product:', error)
                } finally {
                    setLoading(false)
                }
            }
            fetchProduct()
        }
    }, [id, isEdit])

    const handleCancel = () => {
        navigate('/products')
    }

    const handleSubmit = async (formData, imageFiles) => {
        setLoading(true)
        try {
            const data = new FormData()

            // Append all form fields
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key])
            })

            // Append all selected image files
            if (imageFiles && imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    data.append('image', file)
                })
            }

            const url = isEdit
                ? `http://localhost:4000/api/products/${id}`
                : `http://localhost:4000/api/products/create`

            const method = isEdit ? 'put' : 'post'

            const res = await axios[method](url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success) {
                navigate('/products')
            }
        } catch (error) {
            console.error('Error saving product:', error)
            alert(error.response?.data?.message || 'Error saving product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingBottom: '40px' }}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <AddProductCard
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                initialData={initialData}
            />
        </div>
    )
}

export default ProductForm
