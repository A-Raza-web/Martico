import { useNavigate, useParams } from 'react-router-dom'
import AddProductCard from '../component/productCard/AddProductCard'

const ProductForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    const handleCancel = () => {
        navigate('/products')
    }

    const handleSubmit = () => {
        // In a real app, logic to save/update would go here
        console.log('Product saved')
        navigate('/products')
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <AddProductCard
                onCancel={handleCancel}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default ProductForm
